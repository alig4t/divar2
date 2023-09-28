import React, { useState,useEffect } from 'react';
import {  useSearchParams } from 'react-router-dom';

import { Collapse, ListGroup, Dropdown } from 'react-bootstrap';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { TiDelete } from "react-icons/ti"


const SelectTypeFilter = (props) => {


    const [filterOpen, setFilterOpen] = useState(false);
    const [selectFilter, setSelectFilter] = useState("")

    const [queryStirng, setQueryStirng] = useSearchParams();
    const filterParam = queryStirng.get(props.slug)

    const urlMakerWithSelectTypeFilter = (slug, value) => {
        setQueryStirng(params => {
            params.set(slug, value)
            return params
        })
    }

    const urlMakerSelectTypeClear = (slug) => {
        setQueryStirng(params => {
            params.delete(slug)
            return params
        })
    }

    useEffect(() => {

        if (queryStirng.has(props.slug)) {
            let val = queryStirng.get(props.slug)
            let inSuggestArray = props.suggestList.filter(item => item.value === val)
            if (inSuggestArray.length === 1) {
                chooseSelectFilter(inSuggestArray[0])
            }
        } else {
            setSelectFilter("")
            setFilterOpen(false)
        }
    }, [filterParam])


    const chooseSelectFilter = (filObject) => {

        setSelectFilter(filObject.title)

    }


    const clearFilter = () => {
        setSelectFilter("")
    }


    const clearSelectHandler = (event) => {
        event.stopPropagation()
        urlMakerSelectTypeClear(props.slug)
        setSelectFilter("")
        // setFilterOpen(false)
    }

    const clickHandler = (val) => {
        urlMakerWithSelectTypeFilter(props.slug, val)
    }


    return (


        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="choose-Filter-box">
                <div className='d-flex flex-row flex-fill' onClick={() => setFilterOpen(!filterOpen)}>
                    <span className='pe-2'>
                        {filterOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>{props.title}</p>
                </div>
                {
                    (selectFilter.length !== 0) ? filterOpen ? <span className='reset-filter-span-open' onClick={clearSelectHandler}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={filterOpen}>
                <div id="choose-Filter-box">
                    <div className='mb-3'>
                        <div className='d-flex flex-row justify-content-between'>

                            <div className='d-flex flex-column flex-fill'>


                                <Dropdown className='dv-filter-dropdown' drop='down-centered'>
                                    <Dropdown.Toggle className='w-100 d-flex flex-row justify-content-between align-items-center' variant="" id="dropdown-basic">
                                        <div className='d-flex flex-row'>
                                            <div className='dv-clear-input' onClick={clearSelectHandler}>
                                                {selectFilter.length > 0 ? <TiDelete onClick={(e) => clearSelectHandler(e)} /> : null}
                                            </div>
                                            <p className={selectFilter.length > 0 ? "selected" : ""}>
                                                {selectFilter.length > 0 ? selectFilter : props.selectPlaceHolder}
                                            </p>
                                        </div>

                                        <span><FiChevronDown className='align-self-center' /></span>
                                    </Dropdown.Toggle>


                                    <Dropdown.Menu>
                                        {props.suggestList.map((item, index) => {
                                            return <Dropdown.Item key={index} data-val={item.value} onClick={() => clickHandler(item.value)}>{item.title}</Dropdown.Item>
                                        })}

                                    </Dropdown.Menu>

                                </Dropdown>

                            </div>

                        </div>
                    </div>

                </div>
            </Collapse>
        </div>

    );
}

export default React.memo(SelectTypeFilter);