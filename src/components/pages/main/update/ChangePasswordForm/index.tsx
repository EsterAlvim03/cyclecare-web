'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, CheckBox, Input } from '@/components/ui';
import { useUpdateUser } from '@/hooks/api/useUser';
import { useDefaultModal } from '@/store/defaultModalStore';
import { PasswordForm, PasswordSchema } from '@/validation/update.validation';

const ChangePasswordForm = () => {
  const { openModal } = useDefaultModal();
  const { mutateAsync } = useUpdateUser();

  const { control, handleSubmit, reset, watch } = useForm<PasswordForm>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      hasNoPassword: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const hasNoPassword = watch('hasNoPassword');

  const onSubmit = async (data: PasswordForm) => {
    await mutateAsync({
      currentPassword: data.currentPassword ? data.currentPassword : undefined,
      password: data.newPassword,
    });

    openModal({
      title: 'Sucesso',
      message: 'Senha alterada com sucesso!',
      confirmText: 'Ok',
      onConfirm: reset,
    });
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">Alterar senha</h2>

        <span className="text-sm text-neutral-600">Atualize sua senha</span>
      </div>

      <CheckBox control={control} name="hasNoPassword">
        <span className="text-sm">Não possuo senha cadastrada</span>
      </CheckBox>

      {!hasNoPassword && (
        <Input
          password
          control={control}
          label="Senha atual"
          name="currentPassword"
        />
      )}

      <Input password control={control} label="Nova senha" name="newPassword" />

      <Input
        password
        control={control}
        label="Confirmar nova senha"
        name="confirmPassword"
      />

      <Button
        text="Salvar senha"
        width={180}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default ChangePasswordForm;
