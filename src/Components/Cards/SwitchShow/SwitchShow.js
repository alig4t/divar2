import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { HiOutlineViewGrid } from 'react-icons/hi';
import { MdOutlineViewList } from 'react-icons/md';

import styles from "./SwitchShow.module.css"

const SwitchShow = (props) => {

    const [showType, setShowType] = useState(false)

    const showTypeHandler = () => {
        setShowType(!showType)
        props.changeDefaultShow(!props.defaultShow)
    }
    
    return (
        <div className='col-12 justify-content-left px-3 pt-3'>
            <div className={styles.showstatus} onClick={showTypeHandler}>
                {/* <p className='align-self-center mx-2'>تغییر حالت نمایش</p> */}
                <span className='align-self-center'>

                    <ButtonGroup size="sm" >
                        <Button variant={showType?"light":"secondary"} className={styles.btn}>
                            <MdOutlineViewList />
                        </Button>
                        <Button variant={showType?"secondary":"light"} className={styles.btn}>
                            <HiOutlineViewGrid />
                        </Button>
                    </ButtonGroup>
                </span>
            </div>
        </div>
    );
}

export default SwitchShow;