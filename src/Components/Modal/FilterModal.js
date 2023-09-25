import React from "react"
import FilterSection from "../Sidebar/FilterSection"
import { Button, Modal } from "react-bootstrap"


const FilterModal = (props) => {
    return (
        <Modal show={props.showModal} fullscreen={true} onHide={props.closeModal} className="d-md-none">
            <Modal.Header closeButton>
                <Modal.Title> فیلترها</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <FilterSection devicePhone={true} />

            </Modal.Body>
            {/* <Modal.Footer> */}
                {/* <Button variant='light' className='dv-btn-closemodal' onClick={props.closeModal}>اعمال فیلترها</Button> */}
              
            {/* </Modal.Footer> */}
        </Modal>
    )
}
export default FilterModal