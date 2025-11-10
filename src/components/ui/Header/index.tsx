import Image from 'next/image';

import { LogoImg } from '@public/images';

import LogOutButton from './LogOutButton';

const Header = () => {
  return (
    <div className="flex items-center border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-[1368px] flex-1 justify-between p-4">
        <Image
          alt="Logo"
          className="h-8 w-[150px]"
          src={LogoImg}
          style={{ objectFit: 'contain' }}
        />

        <LogOutButton />
      </div>
    </div>
  );
};

export default Header;
