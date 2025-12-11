import { LoginForm, RegisterForm } from '@/validation/auth.validation';

import { http } from '../http';

const BASE_URL = 'auth';

export const authService = {
  login: async (form: LoginForm) => {
    const { data } = await http.post<{ jwt: string }>(
      `${BASE_URL}/login`,
      form,
    );
    return data;
  },

  register: async (form: RegisterForm) => {
    await http.post(`${BASE_URL}/register`, form);
  },

  forgotPassword: async (email: string) => {
    await http.put(`${BASE_URL}/forgot-password`, { email });
  },
};
