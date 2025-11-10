import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { cycleService } from '@/services/api/cycle';

export const useCycles = () => {
  return useQuery({
    queryKey: queryKeys.cycles.all,
    queryFn: cycleService.list,
    initialData: [],
  });
};

export const useCycle = (cycleId?: string) => {
  return useQuery({
    queryKey: queryKeys.cycles.details(cycleId!),
    queryFn: () => cycleService.read(cycleId!),
    enabled: !!cycleId,
  });
};

export const useCreateCycle = () => {
  return useMutation({
    mutationFn: cycleService.create,
    meta: { invalidateQueries: queryKeys.cycles.all },
  });
};

export const useUpdateCycle = () => {
  return useMutation({
    mutationFn: cycleService.update,
    meta: { invalidateQueries: queryKeys.cycles.all },
  });
};

export const useDeleteCycle = () => {
  return useMutation({
    mutationFn: cycleService.delete,
    meta: { invalidateQueries: queryKeys.cycles.all },
  });
};
