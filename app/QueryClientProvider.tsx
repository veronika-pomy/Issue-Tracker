'use client';

import { QueryClient, QueryClientProvider as QueryProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

// cachign data from backend
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren ) => {
  return (
    <QueryProvider
        client={queryClient}
    >
        {children}
    </QueryProvider>
  );
};

export default QueryClientProvider;