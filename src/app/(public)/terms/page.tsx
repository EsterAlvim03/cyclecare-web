'use client';

import { format } from 'date-fns';
import Image from 'next/image';

import { useTerms } from '@/hooks/api/useTermApi';
import { LogoImg } from '@public/images';

const Terms = () => {
  const { data } = useTerms();

  return (
    <div className="flex min-h-screen w-screen grow flex-col">
      <div className="flex items-center justify-center border-b border-neutral-200 bg-white p-4">
        <Image
          alt="Logo"
          className="h-8 w-[150px]"
          src={LogoImg}
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="flex grow flex-col gap-6 px-28 py-10">
        <h1 className="text-primary text-3xl font-bold">Termos de uso</h1>

        {data ? (
          <div className="flex flex-1 flex-col gap-4">
            <p className="font-medium text-neutral-700">
              Última atualização: {format(data?.createdAt, 'PPPP')}
            </p>

            <p className="wrap-break-word w-full whitespace-pre-wrap text-neutral-700">
              {data?.terms}
            </p>
          </div>
        ) : (
          <div className="flex flex-1 animate-pulse items-center justify-center">
            Carregando...
          </div>
        )}
      </div>
    </div>
  );
};

export default Terms;
