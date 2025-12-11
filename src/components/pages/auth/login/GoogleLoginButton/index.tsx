'use client';

import { useGoogleLogin } from '@react-oauth/google';

import { Icon } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { useLoginGoogle } from '@/hooks/api/useUser';

const GoogleLoginButton = () => {
  const { mutateAsync: loginGoogleMutate } = useLoginGoogle();
  const { fetchUser } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      if (tokenResponse.access_token) {
        await loginGoogleMutate(tokenResponse.access_token);
        await fetchUser();
      }
    },
    scope: 'https://www.googleapis.com/auth/calendar',
  });

  return (
    <button
      className="flex items-center gap-2 self-center rounded-full border border-neutral-300 bg-white px-3 py-2 hover:bg-neutral-100"
      onClick={() => googleLogin()}
    >
      <Icon name="GLogoIcon" />

      <span className="text-sm">Entrar com o Google</span>
    </button>
  );
};

export default GoogleLoginButton;
