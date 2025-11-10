import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { eventService } from '@/services/api/event';

export const useEvents = () => {
  return useQuery({
    queryKey: queryKeys.events.lists(),
    queryFn: eventService.list,
    initialData: [],
  });
};

export const useEvent = (eventId?: string) => {
  return useQuery({
    queryKey: queryKeys.events.details(eventId!),
    queryFn: () => eventService.read(eventId!),
    enabled: !!eventId,
  });
};

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: eventService.create,
    meta: { invalidateQueries: queryKeys.events.lists() },
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: eventService.update,
    meta: { invalidateQueries: queryKeys.events.lists() },
  });
};

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: eventService.delete,
    meta: { invalidateQueries: queryKeys.events.lists() },
  });
};
