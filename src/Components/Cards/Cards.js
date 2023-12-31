import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import CardPlaceHolder from '../UI/CardPlaceHolder/CardPlaceHolder';
import ErrorCard from '../UI/ErrorCard/ErrorCard';
import SwitchShow from './SwitchShow/SwitchShow';
import CardShow1 from '../UI/CardShow1/CardShow1';
import CardShow2 from '../UI/CardShow2/CardShow2';

import "./Card2.css"

const Cards = () => {

    // https://mocki.io/v1/e69e3e8c-6662-438a-90b4-d5c1a354f661
    const location = useLocation()

    const { isLoading, error, data, refetch } = useQuery(
        ['location',location],
        {
            queryKey: ['repoData'],
            queryFn: () =>
                fetch('https://mocki.io/v1/cdca9caf-f2ed-4670-9166-bb03ea91d9d0').then(
                    (res) => res.json(),
                ),
            retry: 2,
            retryDelay: 1000,
        })

    const [defaultShowTypeUi, setDefaultShowTypeUi] = useState(true)

    useEffect(()=>{
        if(isLoading){
            window.scrollTo({top:0})
        }
    },[isLoading])

    // const urls = [
    //     "https://mocki.io/v1/48418129-439e-4b9c-8db2-46b0fa41b59b",
    //     // "https://mocki.io/v1/089f7984-7c76-4d86-afc5-54c5feb1b8db",
    //     "https://mocki.io/v1/48418129-439e-4b9c-8db2-46b0fa41b59b",
    //     "https://mocki.io/v1/089fb",
    //     "https://mocki.io/v1/48418129-439e-4b9c-8db2-46b0fa41b59b",
    // ]

    return (

        <div className='row'>

            {isLoading ? <CardPlaceHolder defaulShow={defaultShowTypeUi} /> : data !== undefined ? <>
                <SwitchShow changeDefaultShow={setDefaultShowTypeUi} defaultShow={defaultShowTypeUi} />
                {
                    defaultShowTypeUi ? <CardShow2 cardsList={data} /> : <CardShow1 cardsList={data} />
                }
            </> : ""
            }

            {
                error ? (
                    <ErrorCard reload={refetch} />
                ) : null
            }


        </div>
    );
}

export default Cards;