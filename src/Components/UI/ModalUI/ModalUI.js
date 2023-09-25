
import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalUI = (props) => {
    return (
        <Modal
            show={props.show} onHide={props.close}
            fullscreen="sm-down"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >

        </Modal>
    );
}

export default ModalUI;