'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function Provider({ children }) {
    const [qc] = useState(() => new QueryClient({
        defaultOptions: {
        queries: {
            staleTime: 1000 * 30, 
            cacheTime: 1000 * 60 * 5,
            retry: 1
        }
        }
    }));

    return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
