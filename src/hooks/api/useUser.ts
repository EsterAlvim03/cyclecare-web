import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { userService } from '@/services/api/user';

export const useMe = () => {
  return useQuery({
    queryKey: queryKeys.user.me,
    queryFn: userService.me,
    enabled: false,
    staleTime: 0,
  });
};
