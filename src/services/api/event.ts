import { TEvent, TEventRequest } from '@/types/event';

import { http } from '../http';

const BASE_URL = 'events';

export const eventService = {
  list: async () => {
    const { data } = await http.get<TEvent[]>(BASE_URL);

    return data;
  },

  read: async (id: string) => {
    const { data } = await http.get<TEvent>(`${BASE_URL}/${id}`);

    return data;
  },

  create: async (event: TEventRequest) => {
    console.log(event);

    const { data } = await http.post<TEvent>(BASE_URL, event);

    return data;
  },

  update: async ({
    eventId,
    event,
  }: {
    eventId: string;
    event: TEventRequest;
  }) => {
    const { data } = await http.put<TEvent>(`${BASE_URL}/${eventId}`, event);

    return data;
  },

  delete: async (id: string) => {
    await http.delete(`${BASE_URL}/${id}`);
  },
};
