import { LoginForm, RegisterForm } from '@/validation/login.validation';

import { http } from '../http';

const BASE_URL = 'auth/';

export const authService = {
  login: async (form: LoginForm) => {
    const { data } = await http.post<{ jwt: string }>(`${BASE_URL}login`, form);
    return data;
  },

  register: async (form: RegisterForm) => {
    await http.post(`${BASE_URL}register`, form);
  },
};
