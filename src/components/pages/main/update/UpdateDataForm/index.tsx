'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { useUpdateUser } from '@/hooks/api/useUser';
import { useDefaultModal } from '@/store/defaultModalStore';
import { UpdateForm, UpdateSchema } from '@/validation/update.validation';

const UpdateDataForm = () => {
  const { user, fetchUser } = useAuth();
  const { openModal } = useDefaultModal();
  const { mutateAsync } = useUpdateUser();

  const { control, reset, handleSubmit } = useForm<UpdateForm>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      cpf: '',
    },
  });

  const onSubmit = async (data: UpdateForm) => {
    await mutateAsync(data);
    openModal({
      title: 'Sucesso',
      message: 'Dados atualizados com sucesso!',
      confirmText: 'Ok',
      onConfirm: () => {
        reset();
        fetchUser();
      },
    });
  };

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        phone: user.phone,
        cpf: user.cpf,
      });
    }
  }, [user]);

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">Informações Pessoais</h2>

        <span className="text-sm text-neutral-600">Atualize seus dados</span>
      </div>

      <Input disabled control={control} label="Nome completo" name="name" />

      <Input disabled control={control} label="E-mail" name="email" />

      <Input control={control} disabled={!!user?.cpf} label="CPF" name="cpf" />

      <Input
        control={control}
        label="Celular"
        mask="(00) 00000-0000"
        name="phone"
      />

      <Button
        text="Salvar alterações"
        width={180}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default UpdateDataForm;
