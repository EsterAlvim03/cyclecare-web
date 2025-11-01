'use client';

import { useState } from 'react';

import colors from '@/theme/colors';

import Icon from '../../Icon';

const LogOutButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="hover:bg-secondary flex h-10 w-10 items-center justify-center rounded-md"
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
