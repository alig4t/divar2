import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Collapse, ListGroup } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CheckboxFilter = (props) => {

    const [checkBoxOpen, setCheckBoxOpen] = useState(false)
    const [checkBoxList, setCheckBoxList] = useState([])

    const [queryStirng, setQueryStirng] = useSearchParams();
    const filterParam = queryStirng.get(props.slug)

    const regexUrl = /(^(\d+|\w+))(\,(\d+|\w+))*$/g




    const urlMakerWithCheckBoxFilter = (slug, value) => {

        setQueryStirng(params => {
            if (params.has(slug)) {
                let vals = params.get(slug).split(',');
                let index = vals.indexOf(value)

                if (index > -1) {
                    vals.splice(index, 1);
                } else {
                    vals.push(value)
                }

                vals.length > 0 ? params.set(slug, vals) : params.delete(slug);

            } else {
                params.append(slug, value)
            }
            return params;
        });
    }


    const urlMakerCheckBoxClear = (slug) => {
        if (queryStirng.has(slug)) {
            setQueryStirng(params => {
                params.delete(slug)
                return params
            })
        }
    }


    const checkItemHandler = (val) => {

        urlMakerWithCheckBoxFilter(props.slug, val)
    }







    const clearMahal = () => {
        // setCheckBoxList([])
        urlMakerCheckBoxClear(props.slug)
    }

    useEffect(() => {
        if (queryStirng.has(props.slug)) {
            let urlValStr = queryStirng.get(props.slug)
            if (regexUrl.test(urlValStr)) {
                let checkListArray = [];
                let urlValArray = urlValStr.split(',');
                urlValArray.forEach((val) => {
                    let inItemsArray = props.itemsList.filter(item => item.value === val)
                    if (inItemsArray.length === 1 && !checkListArray.includes(val)) {
                        checkListArray.push(val)
                    }
                })
               return setCheckBoxList(checkListArray)
            }
        }
        setCheckBoxList([])
        setCheckBoxOpen(false)

    }, [filterParam])

    return (
        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="choose-checkbox">
                <div className='d-flex flex-row flex-fill' onClick={() => setCheckBoxOpen(!checkBoxOpen)}>
                    <span className='pe-2'>
                        {checkBoxOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>{props.title}</p>
                </div>
                {
                    (checkBoxList.length > 0) ? checkBoxOpen ? <span className='reset-filter-span-open' onClick={clearMahal}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={checkBoxOpen}>
                <div id="choose-checkbox">
                    <div className='mb-3'>

                        <div className="dv-filter-button-checkbox">

                            {
                                props.itemsList.map((item, index) => {
                                    return <span key={index} className={checkBoxList.includes(item.value) ? "active" : ""} onClick={() => checkItemHandler(item.value)}>{item.title}</span>
                                })
                            }

                        </div>

                    </div>
                </div>
            </Collapse>
        </div>

    );
}

export default CheckboxFilter;