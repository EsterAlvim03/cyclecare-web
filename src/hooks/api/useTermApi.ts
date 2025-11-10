import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { termService } from '@/services/api/term';

export const useTerms = () => {
  return useQuery({
    queryKey: queryKeys.terms.all,
    queryFn: termService.read,
  });
};
