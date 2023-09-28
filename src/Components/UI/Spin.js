import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Spin = () => {

    const [winH,setWinH]= useState(window.innerHeight)

    const style = {
        width: "100%",
        height: winH,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    
    const handleResize = () => {
        setWinH(window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)

    return (
        <div style={style} className='m-auto'>
             <Spinner animation="grow" variant="dark" />
        </div>
    );
}

export default Spin;