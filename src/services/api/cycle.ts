import { TCycle } from '@/types/cycle';
import { CycleForm } from '@/validation/cycle.validation';

import { http } from '../http';

const BASE_URL = 'cycles';

export const cycleService = {
  list: async () => {
    const { data } = await http.get<TCycle[]>(BASE_URL);

    return data;
  },

  create: async (cycle: CycleForm) => {
    const { data } = await http.post<TCycle>(BASE_URL, cycle);

    return data;
  },

  read: async (id: string) => {
    const { data } = await http.get<TCycle>(`${BASE_URL}/${id}`);

    return data;
  },

  update: async ({ cycleId, cycle }: { cycleId: string; cycle: CycleForm }) => {
    const { data } = await http.put<TCycle>(`${BASE_URL}/${cycleId}`, cycle);

    return data;
  },

  delete: async (id: string) => {
    await http.delete(`${BASE_URL}/${id}`);
  },
};
