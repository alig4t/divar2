import React from 'react';
import Main from './Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const MainCore = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Main />
        </QueryClientProvider>
    );
}

export default MainCore;