import React,{useState,useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';

import { Collapse, Form, ListGroup } from 'react-bootstrap';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"

const StatusFilter = (props) => {

    const [statusOpen, setStatusOpen] = useState(false);
    const [switchFilters, setSwitchFilters] = useState({ "hasSwitchOn": false, "list": {} })

    const [queryStirng, setQueryStirng] = useSearchParams();


    const urlMakerWithStatus = (slug) => {
        setQueryStirng(params => {
            if (params.has(slug)) {
                let state = params.get(slug);
                params.set(slug, !state)
                if (state == 'true') {
                    params.delete(slug)
                    return params
                }
            }
            params.set(slug, true)
            return params
        })
    }

    const urlMakerStatusClear = (items) => {
        setQueryStirng(params => {
            items.forEach(elem => {
                if(params.has(elem.slug)){
                    params.delete(elem.slug)
                }
            });
            return params
        })
    }

    const clearStatus = () => {
        urlMakerStatusClear(props.itemsList)
    }
    useEffect(() => {
        let switchObject = {}
        switchObject["hasSwitchOn"] = false
        switchObject["list"] = {}

        props.itemsList.forEach(element => {
            let switchOn = false
            if (queryStirng.has(element.slug) && queryStirng.get(element.slug) === "true") {
                switchOn = true
                switchObject["hasSwitchOn"] = true
            }
            switchObject["list"][element.enTitle] = switchOn
        });
        setSwitchFilters(switchObject)

    }, [queryStirng])


    return (
        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="status-box">
                <div className='d-flex flex-row flex-fill' onClick={() => setStatusOpen(!statusOpen)}>
                    <span className='pe-2'>
                        {statusOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>{props.title}</p>
                </div>
                {
                    switchFilters["hasSwitchOn"] ? statusOpen ? <span className='reset-filter-span-open' onClick={clearStatus}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={statusOpen}>
                <div id="status-box">
                    <div className='mb-3'>

                        {props.itemsList.map((item, index) => {
                            return <div className="dv-filter-switch" key={index} onClick={() => urlMakerWithStatus(item.slug)}>
                                <p className='align-self-center'>{item.title}</p>
                                <span className='align-self-center'>
                                    <Form>
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch"
                                            checked={switchFilters["list"][item.enTitle] ? true : false}
                                            onChange={(e) => ({ e })}
                                        />
                                    </Form>
                                </span>
                            </div>
                        })}

                    </div>
                </div>
            </Collapse>
        </div>
    );
}

export default StatusFilter;