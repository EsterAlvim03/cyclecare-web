import { PropsWithChildren } from 'react';

type Props = {
  justifyContent?: 'flex-end' | 'center';
};

const DefaultModalBackdrop = ({
  children,
  justifyContent = 'center',
}: PropsWithChildren<Props>) => {
  return (
    <div
      className="fixed inset-0 flex h-screen items-center bg-black/25"
      style={{ justifyContent }}
    >
      {children}
    </div>
  );
};

export default DefaultModalBackdrop;
