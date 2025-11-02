'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';

import Icon from '../../Icon';

const LogOutButton = () => {
  const router = useRouter();
  const { openModal } = useDefaultModal();

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    openModal({
      title: 'Sair?',
      message: 'Tem certeza que deseja sair da sua conta?',
      confirmText: 'Sair',
      onConfirm: () => router.replace('/login'),
      cancelText: 'Cancelar',
    });
  };

  return (
    <button
      className="hover:bg-secondary flex h-10 w-10 items-center justify-center rounded-md"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        color={isHovered ? colors.white : colors.neutral[600]}
        name="LogOutIcon"
        size={20}
      />
    </button>
  );
};

export default LogOutButton;
