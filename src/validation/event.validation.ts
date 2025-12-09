import { isAfter, parse } from 'date-fns';

import { validateDateTime } from '@/utils/validation';

import z from './zod';

export const EventSchema = z
  .object({
    summary: z.string().min(1),
    description: z.string().optional(),
    startDateTime: z
      .string()
      .min(1)
      .refine(validateDateTime, 'Data ou hora inválida'),
    endDateTime: z
      .string()
      .min(1)
      .refine(validateDateTime, 'Data ou hora inválida'),
  })
  .refine(
    data => {
      const parsedStart = parse(
        data.startDateTime,
        'dd/MM/yyyy HH:mm',
        new Date(),
      );
      const parsedEnd = parse(data.endDateTime, 'dd/MM/yyyy HH:mm', new Date());

      return isAfter(parsedEnd, parsedStart);
    },
    {
      message: 'A data de término deve ser posterior à data de início',
      path: ['endDateTime'],
    },
  );

export type EventForm = z.infer<typeof EventSchema>;
