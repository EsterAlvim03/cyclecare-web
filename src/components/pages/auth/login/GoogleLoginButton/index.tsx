'use client';

import { Icon } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';

const GoogleLoginButton = () => {
  const { googleLogin } = useAuth();

  return (
    <button
      className="flex items-center gap-2 self-center rounded-full border border-neutral-300 px-3 py-2 hover:bg-neutral-100"
      onClick={() => googleLogin()}
    >
      <Icon name="GLogoIcon" />

      <span className="text-sm">Entrar com o Google</span>
    </button>
  );
};

export default GoogleLoginButton;
