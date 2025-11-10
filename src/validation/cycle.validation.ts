import { formatDateToEnglish } from '@/utils/format';
import { validateDate } from '@/utils/validation';

import z from './zod';

export const CycleSchema = z.object({
  mood: z.string(),
  startDate: z
    .string()
    .refine(validateDate, 'Data inválida')
    .transform(formatDateToEnglish),
  endDate: z
    .string()
    .refine(validateDate, 'Data inválida')
    .transform(formatDateToEnglish),
});

export type CycleForm = z.infer<typeof CycleSchema>;
