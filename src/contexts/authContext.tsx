/* eslint-disable no-unused-vars */
'use client';

import {
  OverridableTokenClientConfig,
  useGoogleLogin,
} from '@react-oauth/google';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useLogin, useLoginGoogle } from '@/hooks/api/useAuthApi';
import { useMe } from '@/hooks/api/useUser';
import { http } from '@/services/http';
import { TUser } from '@/types/user';
import { handleError } from '@/utils/handleError';
import { LoginForm } from '@/validation/auth.validation';

type ContextValues = {
  user: TUser | null;
  googleLogin: (overrideConfig?: OverridableTokenClientConfig) => void;
  login: (form: LoginForm) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

const PUBLIC_PATHS = ['/login', '/terms'];

const AuthContext = createContext({} as ContextValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<TUser | null>(null);

  const [isReady, setIsReady] = useState(false);
  const { mutateAsync: loginMutate } = useLogin();
  const { mutateAsync: loginGoogleMutate } = useLoginGoogle();
  const { refetch } = useMe();

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
    queryClient.removeQueries();
    setUser(null);

    router.replace('/login');
  };

  const fetchUser = async () => {
    const { status, data } = await refetch();

    if (status === 'error') {
      throw new Error('Erro ao buscar usuário');
    }

    if (data) {
      setUser(data!);
    }
  };

  const setTokenAndLogin = async (jwt?: string, remember?: boolean) => {
    if (!jwt) {
      return;
    }

    if (remember) {
      localStorage.setItem('accessToken', jwt);
    }

    if (!remember) {
      sessionStorage.setItem('accessToken', jwt);
    }

    await fetchUser();
  };

  const login = async (form: LoginForm) => {
    try {
      const { jwt } = await loginMutate(form);

      await setTokenAndLogin(jwt, form.rememberMe);
      router.replace('/home');
    } catch (err) {
      handleError(err);
      logout();
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      if (tokenResponse.access_token) {
        const { jwt } = await loginGoogleMutate(tokenResponse.access_token);
        await setTokenAndLogin(jwt);
        router.replace('/home');
      }
    },
    scope: 'https://www.googleapis.com/auth/calendar',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken =
        sessionStorage.getItem('accessToken') ||
        localStorage.getItem('accessToken');

      if (accessToken) {
        await setTokenAndLogin(accessToken);
      }

      if (!accessToken && PUBLIC_PATHS.includes(pathname)) {
        router.replace('/login');
      }

      setIsReady(true);
    };
    fetchUser();
  }, []);

  http.interceptors.response.use(
    response => response,
    error => {
      if (error.message === 'Network Error') {
        return Promise.reject(new Error('Sem conexão com a internet!'));
      }

      if (
        error.code === 'ERR_SECURESTORE_ENCRYPT_FAILURE' ||
        error.response?.status === 403
      ) {
        logout();
      }

      return Promise.reject(error);
    },
  );

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, googleLogin, login, logout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
