import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui';
import DefaultModalBackdrop from '@/components/ui/DefaultModal/DefaultModalBackdrop';
import DefaultModalFooter from '@/components/ui/DefaultModal/DefaultModalFooter';
import DefaultModalHeader from '@/components/ui/DefaultModal/DefaultModalHeader';
import { useForgotPassword } from '@/hooks/api/useAuthApi';
import { useDefaultModal } from '@/store/defaultModalStore';
import {
  ForgotPasswordForm,
  ForgotPasswordSchema,
} from '@/validation/auth.validation';

type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const ForgotPasswordModal = ({ show, setShow }: Props) => {
  const { openModal } = useDefaultModal();
  const { mutateAsync } = useForgotPassword();

  const { control, handleSubmit, reset } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await mutateAsync(data.email);
      openModal({
        title: 'Sucesso',
        message: 'Senha redefinida com sucesso! ',
        confirmText: 'Ok',
        onConfirm: handleClose,
      });
    } catch {
      // globally handled
    }
  };

  if (!show) {
    return null;
  }

  return (
    <DefaultModalBackdrop>
      <dialog className="relative flex h-[250px] w-[400px] flex-col overflow-hidden rounded-lg bg-white">
        <DefaultModalHeader title="Esqueci minha senha" />

        <div className="flex grow flex-col gap-3 p-3">
          <Input
            control={control}
            label="E-mail"
            name="email"
            placeholder="seu@email.com"
          />
        </div>

        <DefaultModalFooter
          cancelText="Cancelar"
          confirmText="Enviar"
          handleCancel={handleClose}
          handleConfirm={handleSubmit(onSubmit)}
        />
      </dialog>
    </DefaultModalBackdrop>
  );
};

export default ForgotPasswordModal;
