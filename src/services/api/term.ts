import { TTerm } from '@/types/term';

import { http } from '../http';

const BASE_URL = 'terms';

export const termService = {
  read: async () => {
    const { data } = await http.get<TTerm>(BASE_URL);

    return data;
  },
};
