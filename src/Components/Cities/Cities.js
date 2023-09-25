import { Accordion, Badge, Button, Form, ListGroup, Modal } from "react-bootstrap";
import { BiCheckbox, BiSearch } from "react-icons/bi";
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { RiCheckboxFill } from 'react-icons/ri'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { IoIosClose } from 'react-icons/io'

import cityList from "./Cities.json"
import { URLMaker, getSortedCities, isCatSlugValid } from "../../Helper/Helper";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CityContext } from "../../Context/CityContext";
import { CategoryContext } from "../../Context/CategoryContext";

const Cities = (props) => {

    const navigate = useNavigate()
    console.log("Cities Render");

  
    const [currentCity, setCurrentCity] = useContext(CityContext)
    const [currentCat] = useContext(CategoryContext)
    const [clickableBtn, setClickableBtn] = useState(false);

    const changeCityHandler = () => {
        props.close()
        let idsStr = (selectedCity.ids.sort()).join("");
        setCurrentCity({
            idsStr,
            idsArray: selectedCity.ids,
            citiesList: selectedCity.cities
        })
        navigate(URLMaker(selectedCity.cities, currentCat.slug), { state: { wrong: false } })
    }



    
    const searchCityHandler = (txt) => {
        let allcities = [...provinceObj.onlyCities]
        if (txt !== "") {
            let filteredCities = allcities.filter((item) => {
                if (item.title.indexOf(txt) > -1) {
                    return item
                }
            })
            setSearchList({
                searchOn: true,
                list: filteredCities
            })
        } else {
            setSearchList({
                searchOn: false,
                list: []
            })
        }
    }
    
    const [selectedCity, setSelectedCity] = useState({ids:[],cities:[]})
    const [searchList, setSearchList] = useState({ searchOn: false, list: [] })
    const [provinceObj, setProvinceObj] = useState({ ProvinceWithCity: {} })
    useEffect(() => {
        setProvinceObj(getSortedCities(cityList))
        setSelectedCity({
            ids: currentCity.idsArray,
            cities: currentCity.citiesList
        })
    }, [currentCity])
    
    useEffect(()=>{
        let ids = [...selectedCity.ids]
        let newSelectedStr = (ids.sort()).join("");
        if (selectedCity.ids.length === 0 || currentCity.idsStr === newSelectedStr) {
          setClickableBtn(false)
        } else {
          setClickableBtn(true)
        }
    },[selectedCity])
    
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

    const listCity = useMemo(() => {

        return Object.keys(provinceObj["ProvinceWithCity"]).map((index, id) => {
            return <Accordion.Item eventKey={id} key={index}>
                <Accordion.Header>{provinceObj["ProvinceWithCity"][index].title}</Accordion.Header>
                <Accordion.Body>
                    <ListGroup>
                        {provinceObj["ProvinceWithCity"][index].cities.map((city) => {
                            return <ListGroup.Item key={city.id} onClick={() => checkCityHandler(city.id, city.title, city.slug)}>{city.title}
                                <span className='dv-arrow'>
                                    <input type="checkbox" name="switch"
                                        className="check"
                                        checked={selectedCity.ids.includes(city.id) ? true : false}
                                        readOnly
                                    />
                                </span>
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </Accordion.Body>

            </Accordion.Item>
        })
    }, [provinceObj, selectedCity])



    return (
        <Modal
            show={props.show} onHide={props.close}
            fullscreen="sm-down"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header className='flex-wrap'>
                <Modal.Title id="contained-modal-title-vcenter">
                    انتخاب شهر
                </Modal.Title>

                <div className='city-scrollabe w-100 pt-3'>
                    {selectedCity.cities?.map((item,index) => {
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

                {searchList.searchOn ? <ListGroup>{searchList.list.map((item) => {
                    return <ListGroup.Item key={item.id} onClick={() => checkCityHandler(item.id, item.title, item.slug)}>{item.title}
                        <span className='dv-arrow'>
                            <input type="checkbox" name="switch"
                                className="check"
                                checked={selectedCity.ids.includes(item.id) ? true : false}
                                readOnly
                            />
                        </span>
                    </ListGroup.Item>
                })}</ListGroup> : <Accordion defaultActiveKey="0">
                    {listCity}
                </Accordion>}





            </Modal.Body>
            <Modal.Footer>

                <Button variant='light' className='dv-btn-closemodal' onClick={props.close}>انصراف</Button>
                <Button variant={clickableBtn ? "danger" : "light"} className='dv-btn-closemodal not-allowed' onClick={changeCityHandler} disabled={clickableBtn ? false : true}>تایید</Button>

            </Modal.Footer>

        </Modal >
    );
}

export default React.memo(Cities);