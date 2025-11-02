'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import { UpdateForm, UpdateSchema } from '@/validation/update.validation';

const UpdateDataForm = () => {
  const { control } = useForm<UpdateForm>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      email: 'email@email.com',
      name: 'Ester Alvim',
      phone: '(11) 91234-5678',
    },
  });

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">Informações Pessoais</h2>

        <span className="text-sm text-neutral-600">Atualize seus dados</span>
      </div>

      <div className="flex flex-col gap-2">
        <Input disabled control={control} label="E-mail" name="email" />

        <span className="text-xs text-neutral-600">
          O email não pode ser alterado
        </span>
      </div>

      <Input control={control} label="Nome completo" name="name" />

      <Input
        control={control}
        label="Celular"
        mask="(00) 00000-0000"
        name="phone"
      />

      <Button text="Salvar alterações" width={180} />
    </div>
  );
};

export default UpdateDataForm;
