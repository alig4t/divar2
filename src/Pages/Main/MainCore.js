import React from 'react';
// import { CityProvider } from '../../Context/CityContext';
// import { CategoryProvider } from '../../Context/CategoryContext';
import Main from './Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MainCore = () => {
    console.log("MainCore Render..");

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