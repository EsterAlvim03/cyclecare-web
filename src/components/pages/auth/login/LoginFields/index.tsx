import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, CheckBox, Input } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { LoginForm, LoginSchema } from '@/validation/auth.validation';

import ForgotPasswordModal from '../forgotPasswordModal';

const LoginFields = () => {
  const { login } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  return (
    <form key="login-form" className="flex flex-col gap-4">
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

      <div className="flex items-center justify-between">
        <CheckBox control={control} name="rememberMe">
          <span className="text-sm">Lembrar de mim</span>
        </CheckBox>

        <button type="button" onClick={() => setShowModal(true)}>
          <span className="text-primary text-sm underline">
            Esqueci minha senha
          </span>
        </button>
      </div>

      <Button
        fontSize={18}
        text="Entrar"
        type="submit"
        width="100%"
        onClick={handleSubmit(login)}
      />

      <ForgotPasswordModal setShow={setShowModal} show={showModal} />
    </form>
  );
};

export default LoginFields;
