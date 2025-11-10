'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PropsWithChildren } from 'react';

import { DefaultModal } from '@/components/ui';
import { AuthProvider } from '@/contexts/authContext';
import { handleError } from '@/utils/handleError';

setDefaultOptions({ locale: ptBR });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
      retry: false,
      initialDataUpdatedAt: 0,
    },
    mutations: {
      onError: err => handleError(err),
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.invalidateQueries) {
        queryClient.invalidateQueries({
          queryKey: mutation.meta.invalidateQueries,
        });
      }
    },
  }),
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="1023348174883-ilrs9or50b0v9uqlcim4gpcl8up6qpp4.apps.googleusercontent.com">
        {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}> */}
        <AuthProvider>
          {children}

          <DefaultModal />
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
