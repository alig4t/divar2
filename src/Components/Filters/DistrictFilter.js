import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Collapse, ListGroup } from 'react-bootstrap';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { BiChevronLeft } from "react-icons/bi"

import DistrictModal from '../Modal/DistrictModal';

const DistrictFilter = (props) => {


    const [mahalOpen, setMahalOpen] = useState(false);
    const [districtModal, setDistrictModal] = useState(false)
    const [currentDistricts, setCurrentDistricts] = useState([])
    const closeHandleModal = useCallback(() => {
        setDistrictModal(false)
    }, [])
    const regexDistrict = /(^\d+(\,\d+)*$)/g;


    const [queryString, setQueryString] = useSearchParams();
    const filterParam = queryString.get(props.slug)

    const urlMakerWithDistricts = (slug, ids) => {

        let currentValueString = ids.join(",");
        setQueryString(params => {
            params.set(slug, currentValueString)
            if (currentValueString === '') {
                params.delete(slug)
            } else {
                params.set(slug, currentValueString)
            }
            return params
        })

    }

    const openModalDistrictHandler = () => {
        setDistrictModal(true)
    }
    const clearFilter = () => {
        // setCurrentDistricts([])
        urlMakerWithDistricts(props.slug, [])
    }


    useEffect(() => {

        if (queryString.has(props.slug)) {
            let urlValStr = queryString.get(props.slug)

            if (regexDistrict.test(urlValStr)) {
                let checkListArray = [];
                let urlValArray = urlValStr.split(',');
                urlValArray.forEach((val) => {
                    let inItemsArray = props.itemsList.filter(item => item.id === parseInt(val))
                    if (inItemsArray.length === 1 && !checkListArray.includes((parseInt(val)))) {
                        checkListArray.push(parseInt(val))
                    }
                })
                setCurrentDistricts(checkListArray)
            } else {
                setCurrentDistricts([])
            }
        } else {
            setCurrentDistricts([])
        }
    }, [filterParam])


    return (
        <>
            <div className='dv-sidebox'>
                <ListGroup className='dv-filter-header' aria-controls="choose-district-box" onClick={() => setMahalOpen(!mahalOpen)}>
                    <div className='d-flex flex-row flex-fill' >
                        <span className='pe-2'>
                            {mahalOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                        <p>{props.title}</p>
                    </div>
                    {
                        (currentDistricts.length > 0) ? mahalOpen ? <span className='reset-filter-span-open' onClick={clearFilter}>حذف</span> : <span className='reset-filter-span-close' /> : null
                    }
                </ListGroup>

                <Collapse in={mahalOpen}>
                    <div id="choose-district-box">
                        <div className='mb-3'>

                            <div className={`dv-filter-button ${districtModal ? "active" : ""}`} onClick={openModalDistrictHandler}>
                                <div className='d-flex flex-row'>
                                    <div className='dv-clear-input'>
                                    </div>
                                    <p className='align-self-center'>
                                        {currentDistricts.length === 0 ? "تعیین " + props.title : currentDistricts.length + " " + props.title}
                                    </p>
                                </div>
                                <span className='align-self-center'><BiChevronLeft /></span>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>

            {< DistrictModal
                showModal={districtModal}
                devicePhone={true}
                itemsList={props.itemsList}
                currentDistricts={currentDistricts}
                title={props.title}
                slug={props.slug}
                urlMaker={urlMakerWithDistricts}
                closeModal={closeHandleModal}
            />}
        </>
    );
}

export default DistrictFilter;