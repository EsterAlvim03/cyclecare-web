import { useMutation } from '@tanstack/react-query';

import { authService } from '@/services/api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
  });
};
