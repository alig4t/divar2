import React, { useContext, useEffect, useState } from 'react';
import { Badge, Collapse, ListGroup } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';


const RadioBoxFilter = (props) => {

    const [radioBoxOpen, setRadioBoxOpen] = useState(false)
    const [radioBoxChecked, setRadioBoxChecked] = useState(props.default)

    // let { city, cat } = useParams()
    const [queryStirng, setQueryStirng] = useSearchParams();
    const filterParam = queryStirng.get(props.slug)

    console.log("RadioBox Renderd..");

    const urlMakerWithRadioBoxFilter = (slug, value) => {

        setQueryStirng(params => {
            params.set(slug, value)
            return params
        })
    }

    const urlMakerRadioBoxClear = (slug) => {

        setQueryStirng(params => {
            if (params.has(slug)) {
                params.delete(slug)
            }
            return params
        })
    }



    const checkItemHandler = (val) => {
        if (val === props.default) {
            clearRadio()
        } else {
            urlMakerWithRadioBoxFilter(props.slug, val)
        }
    }

    const clearRadio = () => {
        urlMakerRadioBoxClear(props.slug)
    }


    useEffect(() => {
        console.log("کامپوننت رادیو");

        if (queryStirng.has(props.slug)) {
            let val = queryStirng.get(props.slug)

            let inSuggestArray = props.itemsList.filter(item => item.value === val)
            if (inSuggestArray.length === 1 && val != props.default) {
                setRadioBoxChecked(val)
            } else {
                setRadioBoxChecked(props.default)
            }
        } else {
            setRadioBoxChecked(props.default)
        }
    }, [filterParam])
    // }, [filterParam, cat, city])

    return (

        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="choose-radioBox">
                <div className='d-flex flex-row flex-fill' onClick={() => setRadioBoxOpen(!radioBoxOpen)}>
                    <span className='pe-2'>
                        {radioBoxOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>{props.title}</p>
                </div>
                {
                    (radioBoxChecked !== props.default) ? radioBoxOpen ? <span className='reset-filter-span-open' onClick={clearRadio}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={radioBoxOpen}>
                <div id="choose-radioBox">
                    <div className='mb-3'>

                        <div className="dv-filter-button-radioBox">

                            {
                                props.itemsList.map((item, index) => {
                                    return <span key={index} className={radioBoxChecked === item.value ? "active" : ""} onClick={() => checkItemHandler(item.value)}>{item.title}</span>
                                })
                            }

                        </div>

                    </div>
                </div>
            </Collapse>
        </div>

    );
}

export default React.memo(RadioBoxFilter);