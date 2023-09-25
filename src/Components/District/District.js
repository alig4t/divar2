import React, { useEffect, useState } from 'react';
import AllDistricts from "./districts.json"
import { ListGroup } from 'react-bootstrap';

const District = () => {

    const city = 113;
    const [districts, setDistricts] = useState([])
    useEffect(() => {
        let mahaleList = AllDistricts.filter((mahal) => {
            return mahal.city === city
        })
        setDistricts(mahaleList)
    }, [])

    useEffect(() => {
        console.log(districts);
    })

    return (
        <div className='dv-sidebox'>
            <ListGroup>
                {districts.map((mahal) => {
                    return <ListGroup.Item>{mahal.title}</ListGroup.Item>
                })}
            </ListGroup>
        </div>
    );
}


export default District;