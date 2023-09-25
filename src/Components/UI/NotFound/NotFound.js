
import { Link } from 'react-router-dom';

/*************************** React Bootstrap Component ***************************/
import { Row } from 'react-bootstrap';

/*************************** Styles ***************************/
import classes from "./NotFound.module.css"

const NotFound = () => {
    console.log("NotFound Render..");

    return (
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
    );
}

export default NotFound;