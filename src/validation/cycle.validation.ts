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
      .min(1)
      .refine(validateDate, 'Data inválida')
      .transform(formatDateToEnglish),
    endDate: z
      .string()
      .min(1)
      .refine(validateDate, 'Data inválida')
      .transform(formatDateToEnglish),
  })
  .refine(
    data => {
      const parsedStart = parse(data.startDate, 'yyyy-MM-dd', new Date());
      const parsedEnd = parse(data.endDate, 'yyyy-MM-dd', new Date());

      return isAfter(parsedStart, parsedEnd);
    },
    {
      message: 'A data de término deve ser posterior à data de início',
      path: ['endDate'],
    },
  );

export type CycleForm = z.infer<typeof CycleSchema>;
