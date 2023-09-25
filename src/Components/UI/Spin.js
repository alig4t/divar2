import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Spin = () => {

    const [winH,setWinH]= useState(window.innerHeight)

    console.log(winH);
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
        // <Container>
        //     <div className='d-flex h-100 justify-content-center align-items-center'>
        //         <Spinner animation="grow" variant="dark" />
        //     </div>
        // </Container>
        <div style={style} className='m-auto'>
             <Spinner animation="grow" variant="dark" />
        </div>
    );
}

export default Spin;