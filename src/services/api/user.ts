import { TUser } from '@/types/user';

import { http } from '../http';

const BASE_URL = 'users';

export const userService = {
  me: async () => {
    const { data } = await http.get<TUser>(BASE_URL);

    return data;
  },

  update: async (user: Partial<TUser>) => {
    const { data } = await http.put<TUser>(BASE_URL, user);

    return data;
  },

  delete: async () => {
    await http.delete(BASE_URL);
  },

  googleLogin: async (jwt: string) => {
    const { data } = await http.post(`${BASE_URL}/google-login`, {
      jwt,
    });

    return data;
  },
};
