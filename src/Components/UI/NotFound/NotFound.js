
import { Link } from 'react-router-dom';

/*************************** React Bootstrap Component ***************************/
import { Fade, Row } from 'react-bootstrap';

/*************************** Styles ***************************/
import classes from "./NotFound.module.css"
import { useEffect, useState } from 'react';

const NotFound = (props) => {
    console.log("NotFound Render..");    
    
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
    return (
        <>

            <Row>
                <div className='col-8 m-auto text-center'>
                    <img className={classes.img} src={process.env.PUBLIC_URL + "/assets/template/page-not-found2.png"} />
                    <h2 className={classes.nottitle}>
                        به نظر آدرس را اشتباه وارد کرده‌اید.
                    </h2>
                    <h4>
                        برای پیدا کردن مسیر درست می‌توانید سری به
                        <Link to="/" className='text-danger'> صفحهٔ اول سایت </Link>
                        بزنید.
                    </h4>
                </div>
                

            </Row>
            <Fade
                in={activeClass}
                timeout={300}
            >
                <div className='w-100' style={msgBox} onClick={() => setActiveClass(false)}>
                    <span style={msgStyle}>
                        {props.msg}
                    </span>
                </div>
            </Fade>
        </>
    );
}

export default NotFound;