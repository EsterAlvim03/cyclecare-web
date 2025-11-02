'use client';

import { useForm } from 'react-hook-form';

import { Button, Icon, Input } from '@/components/ui';

const Profile = () => {
  const { control } = useForm<{
    email: string;
    name: string;
    birthdate: string;
  }>();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 space-y-6">
      <div className="flex flex-1 flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <Icon name="UserIcon" size={32} />

          <h1 className="text-3xl font-bold">Meu perfil</h1>
        </div>

        <span className="text-neutral-600">
          Gerencie suas informações pessoais
        </span>
      </div>

      <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">Informações Pessoais</h2>

          <span className="text-sm text-neutral-600">Atualize seus dados</span>
        </div>

        <div className="flex flex-col gap-2">
          <Input control={control} label="E-mail" name="email" />

          <span className="text-xs text-neutral-600">
            O email não pode ser alterado
          </span>
        </div>

        <Input control={control} label="Nome completo" name="name" />

        <Input
          control={control}
          label="Data de nascimento"
          name="birthdate"
          type="date"
        />

        <Button text="Salvar alterações" width={180} />
      </div>

      <div className="flex w-full flex-col gap-6 rounded-lg border border-red-600 bg-white p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-red-600">
            Zona de perigo
          </h2>

          <span className="text-sm text-neutral-600">
            Ações irreversíveis relacionadas à sua conta
          </span>
        </div>

        <span className="text-sm text-neutral-600">
          Se você deseja excluir sua conta, entre em contato com o suporte.
        </span>
      </div>
    </div>
  );
};

export default Profile;
