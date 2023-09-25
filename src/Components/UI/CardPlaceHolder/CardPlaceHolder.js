import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

import "./CardPlaceHolder.css"
import { Spinner } from 'react-bootstrap';



const CardPlaceHolder = () => {

    // console.log(window.innerHeight);
    const catCardPlace = {
        position: "absolute",
        top: "8px",
        left: "17px",
        width: "70px",
        borderRadius: "6px"
    }
    const borderRad = { borderRadius: "6px" }
    const imgBox = {
        width: "100%",
        height: "185px",
        borderRadius: "20px",
        overflow: "hidden",
        // background: "rgba(55,57,64,0.9)",
        background: "#efefef",
        position: "relative"
    }
    const cardStyle = {
        "borderRadius": "20px !important",
        "boxShadow": "none",
        "opacity": "0.3"
    }

    const spinnerStyle={
        "position":"fixed",
        "top":"50%",
        "left":"50%",
        "z-index":"199"
    }

    const cardPlaceItem = (
        <div className='col-sm-6 col-lg-4 p-4'>
            <Card style={cardStyle}>
                <div style={imgBox}>
                    <span style={catCardPlace}>
                        <Placeholder as={Card.Title} animation='glow'>
                            <Placeholder style={borderRad} xs={12} bg='secondary' />
                        </Placeholder>
                    </span>
                </div>
                <Card.Body>
                    <Card.Title>
                        <Placeholder as={Card.Title} animation="wave">
                            <Placeholder xs={9} size='lg' bg='dark' />
                        </Placeholder>
                    </Card.Title>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} />
                        <Placeholder xs={4} />
                        <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} />
                        <Placeholder xs={8} />
                        <Placeholder xs={12} size='xs' className="mt-2" />
                    </Placeholder>


                </Card.Body>
            </Card>
        </div>
    )


    return (
        <>
            {/* <Spinner animation="border" className='my-3 mx-auto' style={spinnerStyle} variant="danger" /> */}

            {/* {Array.apply(null, {length: 6 }).map((e, i) => (
            cardPlaceItem
            ))} */}

            {cardPlaceItem}
            {cardPlaceItem}
            {cardPlaceItem}
            {cardPlaceItem}
            {cardPlaceItem}
            {cardPlaceItem}


        </>
    );
}

export default CardPlaceHolder;