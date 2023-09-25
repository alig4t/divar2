import React, { useState } from 'react';
import "./ErrorCard.css"
import { Button, Spinner } from 'react-bootstrap';

const ErrorCard = (props) => {

    const [btnReload, setBtnReload] = useState(false)

    function refreshPage() {

        setBtnReload(true)
        setTimeout(() => {
            props.reload()
            setBtnReload(false)

        }, 1000)
    }

    return (
        <div className='w-100 py-4 text-center error-card'>


            {btnReload ? (
                <>
                    <p>در حال تلاش مجدد..</p>
                    <Spinner animation="border" className='my-3' variant="danger" />
                </>
            ) : (
                <>
                    <p>خطا در برقرای ارتباط با سرور</p>
                    <Button variant='outline-danger' onClick={refreshPage} className='my-3'>تلاش مجدد</Button>
                </>
            )}

        </div>
    );
}

export default ErrorCard;