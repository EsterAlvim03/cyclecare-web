import { formatDateToApi } from '@/utils/format';
import { validateDateTime } from '@/utils/validation';

import z from './zod';

export const EventSchema = z.object({
  summary: z.string().min(1),
  description: z.string().optional(),
  startDateTime: z
    .string()
    .refine(validateDateTime, 'Data ou hora inválida')
    .transform(formatDateToApi),
  endDateTime: z
    .string()
    .refine(validateDateTime, 'Data ou hora inválida')
    .transform(formatDateToApi),
});

export type EventForm = z.infer<typeof EventSchema>;
