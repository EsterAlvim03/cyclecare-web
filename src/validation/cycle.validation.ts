import { parse } from 'date-fns';
import { isAfter } from 'date-fns/fp';

import { formatDateToEnglish } from '@/utils/format';
import { validateDate } from '@/utils/validation';

import z from './zod';

export const CycleSchema = z
  .object({
    mood: z.string().min(1),
    startDate: z
      .string()
      .refine(validateDate, 'Data inválida')
      .transform(formatDateToEnglish),
    endDate: z
      .string()
      .refine(validateDate, 'Data inválida')
      .transform(formatDateToEnglish),
  })
  .refine(
    data =>
      isAfter(
        parse(data.endDate, 'dd/MM/yyyy hh:mm', new Date()),
        parse(data.startDate, 'dd/MM/yyyy hh:mm', new Date()),
      ),
    {
      message: 'A data de término deve ser posterior à data de início',
      path: ['endDate'],
    },
  );

export type CycleForm = z.infer<typeof CycleSchema>;
