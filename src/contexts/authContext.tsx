'use client';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useLogin } from '@/hooks/api/useAuthApi';
import { useMe } from '@/hooks/api/useUser';
import { http } from '@/services/http';
import { TUser } from '@/types/user';
import { LoginForm } from '@/validation/login.validation';

type ContextValues = {
  user: TUser | null;
  // eslint-disable-next-line no-unused-vars
  login: (form: LoginForm) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext({} as ContextValues);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<TUser | null>(null);

  const [isReady, setIsReady] = useState(false);
  const { mutateAsync } = useLogin();
  const { refetch } = useMe();

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    queryClient.removeQueries();
    setUser(null);

    if (pathname !== '/login') {
      router.replace('/login');
    }
  };

  const fetchUser = async () => {
    try {
      const { status, data } = await refetch();

      if (status === 'error') {
        throw new Error('Erro ao buscar usuário');
      }

      if (data) {
        setUser(data!);
      }
    } catch {
      throw new Error('Erro ao buscar usuário');
    }
  };

  const login = async (form: LoginForm) => {
    try {
      const { jwt } = await mutateAsync(form);

      if (jwt) {
        sessionStorage.setItem('accessToken', jwt);
        await fetchUser();
        router.replace('/home');
      }
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken && pathname !== '/login') {
        router.replace('/login');
      }
    };

    checkToken();
    setIsReady(true);
  }, []);

  http.interceptors.response.use(
    response => response,
    error => {
      if (error.message === 'Network Error') {
        return Promise.reject(new Error('Sem conexão com a internet!'));
      }

      if (
        error.code === 'ERR_SECURESTORE_ENCRYPT_FAILURE' ||
        error.response?.status === 401
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
