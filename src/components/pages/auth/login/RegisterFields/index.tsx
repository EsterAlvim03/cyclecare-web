import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, CheckBox, Input } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { useRegister } from '@/hooks/api/useAuthApi';
import { useDefaultModal } from '@/store/defaultModalStore';
import colors from '@/theme/colors';
import { RegisterForm, RegisterSchema } from '@/validation/auth.validation';

const RegisterFields = () => {
  const { login } = useAuth();
  const { openModal } = useDefaultModal();
  const { mutateAsync: register } = useRegister();

  const { control, handleSubmit, watch } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const termsAccepted = watch('terms');

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register(data);
      openModal({
        title: 'Cadastro realizado',
        message: 'Sua conta foi criada com sucesso!',
        confirmText: 'Continuar',
        onConfirm: () => login(data),
      });
    } catch {
      // globally handled
    }
  };

  const goToTerms = () => {
    window.open('/terms', '_blank');
  };

  return (
    <form key="login-form" className="flex flex-col gap-4">
      <Input
        control={control}
        label="Nome completo"
        name="name"
        placeholder="Seu nome"
      />

      <Input
        control={control}
        label="Celular"
        mask="(00) 00000-0000"
        name="phone"
        placeholder="(00) 00000-0000"
      />

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

      <Input
        password
        control={control}
        label="Confirmar Senha"
        name="confirmPassword"
        placeholder="********"
      />

      <CheckBox control={control} name="terms">
        <span className="text-sm">
          <span>Declaro que li e aceito os </span>

          <button
            className="text-primary underline"
            type="button"
            onClick={goToTerms}
          >
            Termos de Serviço
          </button>
        </span>
      </CheckBox>

      <Button
        color={termsAccepted ? colors.primary : colors.neutral[400]}
        disabled={!termsAccepted}
        fontSize={18}
        text="Cadastrar"
        type="submit"
        width="100%"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default RegisterFields;
