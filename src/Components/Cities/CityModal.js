import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { Badge, Button, Form, ListGroup, Modal } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { IoIosClose } from 'react-icons/io'

import CitiesList from "../../JsonFiles/Cities.json"
import ProvincesList from "../../JsonFiles/Provinces.json"

import { CityContext } from "../../Context/CityContext";
import { CategoryContext } from "../../Context/CategoryContext";

import { URLMaker } from "../../Helper/Helper";

const CityModal = (props) => {

    const navigate = useNavigate()

    const [cityContext, setCityContext] = useContext(CityContext)
    const [currentCat] = useContext(CategoryContext)
    const [clickableBtn, setClickableBtn] = useState(false);

    const [selectedCity, setSelectedCity] = useState({ ids: [], cities: [] })

    const [provinceObj] = useState([...ProvincesList])
    const [citiesObj] = useState([...CitiesList])


    const [showList, setShowList] = useState({ type: "", list: [] })


    const changeCityHandler = () => {
        props.close()
        let idsStr = (selectedCity.ids.sort()).join("");
        setCityContext({
            idsStr,
            idsArray: selectedCity.ids,
            citiesList: selectedCity.cities
        })
        navigate(URLMaker(selectedCity.cities, currentCat.slug), { state: { wrong: false } })
    }


    const searchCityHandler = (txt) => {
        let allcities = [...citiesObj]
        if (txt.length > 1) {
            let filteredCities = allcities.filter((item) => {
                if (item.title.indexOf(txt) > -1) {
                    return item
                }
            })
            setShowList({ type: "search", list: filteredCities })
        } else {
            if (showList.type != "parent") {
                setShowList({ type: "parent", list: provinceObj })
            }
        }
    }



    function showOrginalCity() {
        if(showList.type !=="parent"){
            setShowList({ type: "parent", list: provinceObj })
        }
    }


    useEffect(() => {
        setSelectedCity({
            ids: [...cityContext.idsArray],
            cities: [...cityContext.citiesList]
        })
    }, [cityContext])



    useEffect(() => {
        if (props.show) {
            showOrginalCity()
        }
    }, [props.show])


    useEffect(() => {
        let ids = [...selectedCity.ids]
        let newSelectedStr = (ids.sort()).join("");
        if (selectedCity.ids.length === 0 || cityContext.idsStr === newSelectedStr) {
            setClickableBtn(false)
        } else {
            setClickableBtn(true)
        }
    }, [selectedCity])


    const deleteCityHandler = (id) => {
        let checkedCities = { ...selectedCity }
        let index = checkedCities.ids.indexOf(id);
        checkedCities.ids.splice(index, 1);
        index = checkedCities.cities.findIndex(city => city.id == id)
        checkedCities.cities.splice(index, 1)
        setSelectedCity(checkedCities)
    }

    const checkCityHandler = (id, title, slug) => {
        let checkedCities = { ...selectedCity }
        if (selectedCity.ids.includes(id)) {
            let index = checkedCities.ids.indexOf(id);
            checkedCities.ids.splice(index, 1);
            index = checkedCities.cities.findIndex(city => city.id == id)
            checkedCities.cities.splice(index, 1)
        } else {
            checkedCities.ids.push(id)
            let cityObj = { id, title, slug }
            checkedCities.cities.push(cityObj)
        }
        setSelectedCity(checkedCities)
    }

    const showSubCities = (id) => {
        let sub = CitiesList.filter(city => city.province_id === id)
        setShowList({ type: "sub", list: sub })
    }

    const clearBadges = () => {
        setSelectedCity({ ids: [], cities: [] })
    }

    return (
        <Modal
            show={props.show} onHide={props.close}
            fullscreen="sm-down"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header className='flex-wrap'>
                <Modal.Title className="w-100 d-flex justify-content-between align-items-center" id="contained-modal-title-vcenter">
                    انتخاب شهر
                    <div>
                        {
                            selectedCity.cities.length > 0 ? <span className="clear-city-modal" onClick={clearBadges}>حذف همه</span> : null
                        }
                    </div>

                </Modal.Title>

                <div className='city-scrollabe w-100 pt-3'>
                    {selectedCity.cities?.map((item, index) => {
                        return <Badge key={index} pill className="dv-citybadge" >
                            {item.title}
                            <span className="dv-deletebadge" onClick={() => deleteCityHandler(item.id)}>
                                <IoIosClose />
                            </span>
                        </Badge>
                    })}

                </div>


                <div className='d-block w-100 mt-3 px-2 position-relative'>
                    <Form.Control type="text" className='dv-modalsearch' placeholder="جستجو در شهرها" onChange={e => searchCityHandler(e.target.value)} />
                    <span className='dv-search-modal-icon'><BiSearch /></span>
                </div>

            </Modal.Header>
            <Modal.Body className='dv-modal-body overflow-auto'>

                <ListGroup>


                    {
                        showList.type === 'parent' ? (
                            <>
                                {showList.list.map((item) => {
                                    return <ListGroup.Item className="d-flex justify-content-between" key={item.id} onClick={() => showSubCities(item.id)}>
                                        {item.title}
                                        <MdKeyboardArrowLeft />
                                    </ListGroup.Item>
                                })}
                            </>
                        ) : null
                    }
                    {
                        showList.type === 'sub' ? (
                            <>

                                <ListGroup.Item className="" onClick={showOrginalCity}>
                                    <span className='dv-backarrow'><HiOutlineArrowRight /></span>
                                    بازگشت به استانها
                                </ListGroup.Item>
                                {showList.list.map((item) => {
                                    return <ListGroup.Item className="d-flex justify-content-between" key={item.id} onClick={() => checkCityHandler(item.id, item.title, item.slug)}>
                                        {item.title}
                                        <div className="modal-input-div">
                                        <input className="form-check-input" type="checkbox" id={`checkboxNoLabel-${item.id}`} readOnly checked={selectedCity.ids.includes(item.id) ? true : false} />

                                        </div>
                                    </ListGroup.Item>
                                })}
                            </>
                        ) : null
                    }

                    {
                        showList.type === 'search' ? (
                            <>
                                {showList.list.map((item) => {
                                    return <ListGroup.Item className="d-flex justify-content-between" key={item.id} onClick={() => checkCityHandler(item.id, item.title, item.slug)}>
                                        {item.title}

                                        <input className="form-check-input" type="checkbox" id={`checkboxNoLabel-${item.id}`} readOnly checked={selectedCity.ids.includes(item.id) ? true : false} />
                                    </ListGroup.Item>
                                })}
                            </>
                        ) : null
                    }

                </ListGroup>

            </Modal.Body>
            <Modal.Footer>

                <Button variant='light' className='dv-btn-closemodal' onClick={props.close}>انصراف</Button>
                <Button variant={clickableBtn ? "danger" : "light"} className='dv-btn-closemodal not-allowed' onClick={changeCityHandler} disabled={clickableBtn ? false : true}>تایید</Button>

            </Modal.Footer>

        </Modal >
    );
}

export default React.memo(CityModal);