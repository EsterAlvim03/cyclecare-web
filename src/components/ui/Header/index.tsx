import Image from 'next/image';

import { LogoImg } from '@public/images';

import Icon from '../Icon';

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-white p-4">
      <Image
        alt="Logo"
        className="h-8 w-[150px]"
        src={LogoImg}
        style={{ objectFit: 'contain' }}
      />

      <Icon name="EyeIcon" />
    </div>
  );
};

export default Header;
