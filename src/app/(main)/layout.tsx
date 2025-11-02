import { PropsWithChildren } from 'react';

import TabsList from '@/components/pages/main/TabsList';
import { Header } from '@/components/ui';

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />

      <TabsList />

      <div className="flex flex-col gap-8 px-4 py-8">{children}</div>
    </div>
  );
};

export default HomeLayout;
