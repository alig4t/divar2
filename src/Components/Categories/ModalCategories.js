import React, { useContext, useEffect, useState } from 'react';

import { Button, ListGroup, Modal } from "react-bootstrap";
import Categories from './Categories';
// import './ModalCategories.css'

import CatList from "../../JsonFiles/catlist.json"
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { CityContext } from '../../Context/CityContext';
import { URLMaker } from '../../Helper/Helper';
import { useNavigate } from 'react-router-dom';



const ModalCategories = (props) => {

    // const [showList, setShowList] = useState({ depth: 0, sub: [], parent: [] })
    // const [currentCity] = useContext(CityContext)
    // const navigate = useNavigate()

    // const navigateCategory = (slug) => {
    //     props.closeModal()
    //     navigate(URLMaker(currentCity.citiesList,slug));
    // }

    // function getOrginalCats() {
    //     let originalCats = CatList.filter((item) => item.parent == 0)
    //     setShowList({
    //         depth: 0,
    //         sub: originalCats,
    //         parent: []
    //     })
    // }
    // useEffect(() => {
    //     getOrginalCats()
    // }, [])

    // const showSubCats = (id,slug) => {
    //     let childrenCats = CatList.filter((item) => item.parent == id)
    //     if (childrenCats.length === 0) {
    //         navigateCategory(slug)
    //         return
    //     }
    //     let parent = CatList.filter((item) => item.id == id)
    //     console.log(parent);
    //     setShowList({
    //         depth: 1,
    //         sub: childrenCats,
    //         parent: parent
    //     })
    // }
console.log("modal");
    return (
        <Modal show={props.showModal} fullscreen={true} onHide={props.closeModal} className="d-md-none">
            <Modal.Header closeButton>
                <Modal.Title> انتخاب دسته بندی</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Categories devicePhone={true} closeModal={props.closeModal} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='light' className='dv-btn-closemodal' onClick={props.closeModal}>انصراف</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default React.memo(ModalCategories);


