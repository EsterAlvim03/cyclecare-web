import { validatePhone } from '@/utils/validation';

import z from './zod';

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginForm = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z.string().min(1),
    phone: z
      .string()
      .min(1)
      .refine(validatePhone, 'Número de telefone inválido'),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(1),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterForm = z.infer<typeof RegisterSchema>;
