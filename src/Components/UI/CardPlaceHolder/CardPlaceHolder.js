import React from 'react';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

import "./CardPlaceHolder.css"

const CardPlaceHolder = (props) => {

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
    const imgBox2 = {
        width: "80px",
        height: "80px",
        borderRadius: "5px",
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


    const [defaulShow]=useState(props.defaulShow)

    let cardPlaceItem = defaulShow ? (
        <div className='col-12 col-lg-6 px-4 py-2 my-2 mx-auto'>
            <div className='d-flex justify-content-between align-items-center border rounded px-2' style={{ gap: "10px" }}>
                <div className='flex-fill py-2' >
                    <Placeholder as={Card.Text} animation="wave">
                        <Placeholder xs={8} className="mt-2 mb-2" />

                        <Placeholder xs={10} bg='secondary' />
                        <Placeholder xs={4} bg='secondary' />{'  '}
                        <Placeholder xs={4} bg='secondary' />
                        <Placeholder xs={12} size='xs' bg='secondary' className="mt-2" />
                    </Placeholder>
                </div>
                <div className='' style={imgBox2}>

                </div>
            </div>
        </div>
    ):(
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