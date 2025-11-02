'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';
import {
  LoginForm,
  LoginSchema,
  RegisterForm,
  RegisterSchema,
} from '@/validation/login.validation';
import { CycleCareImg, HeartImg } from '@public/images';

const Login = () => {
  const router = useRouter();
  const { openModal } = useDefaultModal();

  const [page, setPage] = useState(false);

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { control: registerControl, handleSubmit: handleRegisterSubmit } =
    useForm<RegisterForm>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      },
    });

  const redirect = () => {
    router.replace('/home');
  };

  const onLogin = (data: LoginForm) => {
    console.log(data);
    redirect();
  };

  const onRegister = (data: RegisterForm) => {
    console.log(data);
    openModal({
      title: 'Cadastro realizado',
      message: 'Sua conta foi criada com sucesso!',
      confirmText: 'Continuar',
      onConfirm: () => redirect(),
    });
  };

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
          <button
            className="flex flex-1 items-center justify-center rounded-md bg-white px-3 py-1.5 font-medium"
            style={{
              color: !page ? colors.black : colors.neutral[500],
              backgroundColor: !page ? colors.white : colors.transparent,
            }}
            onClick={() => setPage(false)}
          >
            Entrar
          </button>

          <button
            className="flex flex-1 items-center justify-center rounded-md bg-white px-3 py-1.5 font-medium"
            style={{
              color: page ? colors.black : colors.neutral[500],
              backgroundColor: page ? colors.white : colors.transparent,
            }}
            onClick={() => setPage(true)}
          >
            Cadastrar
          </button>
        </div>

        {!page ? (
          <div key="login-form" className="flex flex-col gap-4">
            <Input
              control={control}
              label="E-mail"
              name="email"
              placeholder="seu@email.com"
            />

            <Input
              password
              control={control}
              label="Senha"
              name="password"
              placeholder="********"
            />
          </div>
        ) : (
          <div key="register-form" className="flex flex-col gap-4">
            <Input
              control={registerControl}
              label="Nome completo"
              name="name"
              placeholder="Seu nome"
            />

            <Input
              control={registerControl}
              label="Celular"
              mask="(00) 00000-0000"
              name="phone"
              placeholder="(XX) XXXXX-XXXX"
            />

            <Input
              control={registerControl}
              label="E-mail"
              name="email"
              placeholder="seu@email.com"
            />

            <Input
              password
              control={registerControl}
              label="Senha"
              name="password"
              placeholder="********"
            />

            <Input
              password
              control={registerControl}
              label="Confirmar Senha"
              name="confirmPassword"
              placeholder="********"
            />
          </div>
        )}

        <Button
          fontSize={18}
          text="Entrar"
          width="100%"
          onClick={() =>
            page ? handleRegisterSubmit(onRegister)() : handleSubmit(onLogin)()
          }
        />
      </div>
    </div>
  );
};

export default Login;
