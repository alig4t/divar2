import React, { useEffect, useState } from 'react';
import { Fade } from 'react-bootstrap';

const WrongUrlMsg = ({ currentCity }) => {

    console.log("WrongUrlMsg Render..");


    /*************************** Show Message State (True/False) ***************************/
    const [activeClass, setActiveClass] = useState(false)
    
    /*************************** Message Box Style ***************************/
    const msgBox = {
        position: "fixed",
        bottom: "80px",
        textAlign: "center"
    }
    const msgStyle = {
        backgroundColor: "#2d3436",
        color: "#fdfdfd",
        fontSize: "14px",
        fontWeight: "400",
        padding: "10px 16px",
        borderRadius: "4px"
    }

    /*************************** Show Message after 1 second ***************************/
    useEffect(() => {
        setTimeout(() => {
            setActiveClass(true)
        }, 1000)
    }, [])


    /*************************** Hide Message after 3 seconds ***************************/
    useEffect(() => {
        if (activeClass) {
            setTimeout(() => {
                setActiveClass(false)
            }, 3000)
        }
    })

    /*************************** Message Content ***************************/
    let cityTitle = ""
    if(currentCity === ""){
        cityTitle = "لطفا شهر مورد نظر را انتخاب نمایید."
    }else{
        if(currentCity.citiesList.length > 1){
            cityTitle = " شما آگهی های " +currentCity.citiesList[0].title + " و " + (currentCity.citiesList.length - 1) + "  شهر دیگر را می بینید. "
        }else{
            cityTitle = " شما آگهی های " +currentCity.citiesList[0].title +  " را می بینید. "
        }
    }
    

    return (
        <Fade
            in={activeClass}
            timeout={300}
        >
            <div className='w-100' style={msgBox} onClick={() => setActiveClass(false)}>
                <span style={msgStyle}>
                    لینک مشکل داشت، 
                    {cityTitle} 
                </span>
            </div>
        </Fade>
    );
}

export default React.memo(WrongUrlMsg);