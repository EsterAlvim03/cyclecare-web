'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RootPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return <></>;
};

export default RootPage;
