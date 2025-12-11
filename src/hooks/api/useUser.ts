import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: userService.update,
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: userService.delete,
  });
};

export const useLoginGoogle = () => {
  return useMutation({
    mutationFn: userService.googleLogin,
  });
};
