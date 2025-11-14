import { isAfter, parse } from 'date-fns';

import { validateDateTime } from '@/utils/validation';

import z from './zod';

export const EventSchema = z
  .object({
    summary: z.string().min(1),
    description: z.string().optional(),
    startDateTime: z.string().refine(validateDateTime, 'Data ou hora inválida'),
    endDateTime: z.string().refine(validateDateTime, 'Data ou hora inválida'),
  })
  .refine(
    data =>
      isAfter(
        parse(data.endDateTime, 'dd/MM/yyyy HH:mm', new Date()),
        parse(data.startDateTime, 'dd/MM/yyyy HH:mm', new Date()),
      ),
    {
      message: 'A data de término deve ser posterior à data de início',
      path: ['endDateTime'],
    },
  );

export type EventForm = z.infer<typeof EventSchema>;
