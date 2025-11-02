import { PropsWithChildren } from 'react';

import { Header, TabsList } from '@/components/ui';

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />

      <TabsList />

      {children}
    </div>
  );
};

export default HomeLayout;
