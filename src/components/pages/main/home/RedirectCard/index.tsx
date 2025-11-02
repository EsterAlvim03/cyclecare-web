'use client';

import { useRouter } from 'next/navigation';

import { Button, Icon } from '@/components/ui';
import { TIcon } from '@/components/ui/Icon';
import colors from '@/theme/colors';

type Props = {
  icon: TIcon;
  title: string;
  description: string;
  href: string;
};

const RedirectCard = ({ icon, title, description, href }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.replace(href);
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 shadow-sm">
      <Icon name={icon} size={32} />

      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-semibold">{title}</h3>

        <span className="text-sm text-neutral-600">{description}</span>
      </div>

      <Button
        color={colors.secondary}
        text="Acessar"
        width="100%"
        onClick={handleClick}
      />
    </div>
  );
};

export default RedirectCard;
