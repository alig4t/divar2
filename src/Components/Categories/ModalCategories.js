import React from 'react';

import { Button, Modal } from "react-bootstrap";
import DeviceCategories from './DeviceCategories';

const ModalCategories = (props) => {

    return (
        <Modal show={props.showModal} fullscreen={true} onHide={props.closeModal} className="d-md-none">
            <Modal.Header closeButton>
                <Modal.Title> انتخاب دسته بندی</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DeviceCategories closeModal={props.closeModal} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='light' className='dv-btn-closemodal' onClick={props.closeModal}>انصراف</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default React.memo(ModalCategories);


