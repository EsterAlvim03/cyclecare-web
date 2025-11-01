import { PropsWithChildren } from 'react';

import Header from '@/components/ui/Header';

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default HomeLayout;
