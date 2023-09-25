import React from 'react';
import { CityProvider } from '../../Context/CityContext';
import Main from './Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CategoryProvider } from '../../Context/CategoryContext';

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
            <CityProvider>
                <CategoryProvider>
                    <Main />
                </CategoryProvider>
            </CityProvider>
        </QueryClientProvider>
    );
}

export default MainCore;