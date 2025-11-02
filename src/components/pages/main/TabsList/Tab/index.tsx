'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import Icon, { TIcon } from '@/components/ui/Icon';
import colors from '@/theme/colors';

type Props = {
  icon: TIcon;
  label: string;
  href: string;
};

const Tab = ({ icon, label, href }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isHovered, setIsHovered] = useState(false);

  const isActive = pathname === href;

  const handleBackgroundColor = () => {
    if (isActive) {
      return colors.primary;
    }

    if (isHovered) {
      return colors.secondary;
    }

    return colors.transparent;
  };

  const handleTextColor = () => {
    if (isActive || isHovered) {
      return colors.white;
    }

    return colors.black;
  };

  const handleClick = () => {
    router.replace(href);
  };

  return (
    <button
      className="bg-primary flex items-center gap-2 rounded-md px-4 py-2"
      style={{
        backgroundColor: handleBackgroundColor(),
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon color={handleTextColor()} name={icon} size={20} strokeWidth={1.5} />

      <span
        className="hidden text-sm font-medium md:block"
        style={{ color: handleTextColor() }}
      >
        {label}
      </span>
    </button>
  );
};

export default Tab;
