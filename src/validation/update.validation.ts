import { validatePhone } from '@/utils/validation';

import z from './zod';

export const UpdateSchema = z.object({
  email: z.email(),
  cpf: z.string(),
  name: z.string(),
  phone: z.string().min(1).refine(validatePhone, 'Número de telefone inválido'),
});

export type UpdateForm = z.infer<typeof UpdateSchema>;

export const PasswordSchema = z
  .object({
    hasNoPassword: z.boolean().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(1),
  })
  .refine(
    data => {
      if (data.hasNoPassword) {
        return true;
      }

      return !!data.currentPassword;
    },
    {
      message: 'Campo obrigatório',
      path: ['currentPassword'],
    },
  )
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
  .refine(data => data.newPassword !== data.currentPassword, {
    message: 'A nova senha deve ser diferente da senha atual',
    path: ['newPassword'],
  });

export type PasswordForm = z.infer<typeof PasswordSchema>;
