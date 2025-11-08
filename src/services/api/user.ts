import { TUser } from '@/types/user';

import { http } from '../http';

const BASE_URL = 'users/';

export const userService = {
  me: async () => {
    const { data } = await http.get<TUser>(`${BASE_URL}me`);
    return data;
  },
};
