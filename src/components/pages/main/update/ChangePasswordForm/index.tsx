'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import { PasswordForm, PasswordSchema } from '@/validation/update.validation';

const ChangePasswordForm = () => {
  const { control } = useForm<PasswordForm>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">Alterar senha</h2>

        <span className="text-sm text-neutral-600">Atualize sua senha</span>
      </div>

      <Input
        password
        control={control}
        label="Senha atual"
        name="currentPassword"
      />

      <Input control={control} label="Nova senha" name="newPassword" />

      <Input
        control={control}
        label="Confirmar nova senha"
        name="confirmPassword"
      />

      <Button text="Salvar senha" width={180} />
    </div>
  );
};

export default ChangePasswordForm;
