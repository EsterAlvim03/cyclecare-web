'use client';

import Image from 'next/image';
import { useState } from 'react';

import LoginFields from '@/components/pages/auth/login/LoginFields';
import LoginTab from '@/components/pages/auth/login/LoginTab';
import RegisterFields from '@/components/pages/auth/login/RegisterFields';
import { CycleCareImg, HeartImg } from '@public/images';

const Login = () => {
  const [page, setPage] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 py-10">
      <div className="flex flex-col items-center gap-4">
        <Image
          alt="Coração"
          className="w-14"
          src={HeartImg}
          style={{ objectFit: 'contain' }}
        />

        <Image
          alt="Cycle Care"
          className="h-10"
          src={CycleCareImg}
          style={{ objectFit: 'contain' }}
        />

        <span className="text-neutral-600">
          Seu companheiro de saúde feminina
        </span>
      </div>

      <div className="flex h-auto w-[80%] max-w-[450px] flex-col gap-6 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Bem-vinda!</h2>

          <span className="text-sm text-neutral-400">
            Entre ou crie sua conta para começar
          </span>
        </div>

        <div className="flex rounded-md bg-[#f7f3f5] p-1">
          <LoginTab
            isActive={!page}
            label="Entrar"
            onClick={() => setPage(false)}
          />

          <LoginTab
            isActive={page}
            label="Cadastrar"
            onClick={() => setPage(true)}
          />
        </div>

        {!page ? <LoginFields /> : <RegisterFields />}
      </div>
    </div>
  );
};

export default Login;
