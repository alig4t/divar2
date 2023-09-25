import React, { useRef, useState } from 'react';
import { Collapse, ListGroup, Form, Dropdown, Fade } from 'react-bootstrap';
import { FiChevronDown } from "react-icons/fi"
import { FiChevronUp } from "react-icons/fi"
import { RxDotsVertical } from "react-icons/rx"


const PriceFilter = () => {

    const [priceOpen, setPriceOpen] = useState(false);
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")

    const inputMinPrice = useRef(null);
    const inputMaxPrice = useRef(null);

    const [suggestionMinPrice, setSuggestionMinPrice] = useState(false)
    const [suggestionMaxPrice, setSuggestionMaxPrice] = useState(false)

    const chooseMinPrice = (event) => {
        event.preventDefault();
        console.log(event.target.getAttribute('data-val'));
        let value = event.target.getAttribute('data-val');
        let formatValue = format(value);
        setMinPrice(formatValue)
        setSuggestionMinPrice(false)
        // inputMinPrice.current.focus()
    }
    const chooseMaxPrice = (event) => {
        event.preventDefault();
        console.log(event.target.getAttribute('data-val'));
        let value = event.target.getAttribute('data-val');
        let formatValue = format(value);
        setMaxPrice(formatValue)
        setSuggestionMaxPrice(false)
        // inputMaxPrice.current.focus()
    }

    function format(input) {
        var nStr = input + '';
        nStr = nStr.replace(/\,/g, "");
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        input = x1 + x2;
        return input
    }

    function changeMinHandler(val) {
        let newVal = format(val)
        setMinPrice(newVal)
    }

    function changeMaxHandler(val) {
        let newVal = format(val)
        setMaxPrice(newVal)
    }

    function focusInputMin() {
        inputMinPrice.current.focus()
        setSuggestionMinPrice(false)
        setMinPrice("")
    }

    function focusInputMax() {
        inputMaxPrice.current.focus()
        setSuggestionMaxPrice(false)
        setMaxPrice("")
    }
    const clearPrice = () => {
        setMinPrice("")
        setMaxPrice("")
    }

    const onBlurMinInput = () => {
        setTimeout(()=>{
            setSuggestionMinPrice(false)
        },100)
    }

    const onBlurMaxInput = () => {
        setTimeout(()=>{
            setSuggestionMaxPrice(false)
        },100)
    }
    
    const onClickMaxDiv = () => {
        inputMaxPrice.current.focus()
        setSuggestionMaxPrice(true)
    }
    
    const onClickMinDiv = () => {
        inputMinPrice.current.focus()
        setSuggestionMinPrice(true)
    }


    return (


        <div className='dv-sidebox'>
            <ListGroup className='dv-filter-header' aria-controls="choose-price-box">
                <div className='d-flex flex-row flex-fill' onClick={() => setPriceOpen(!priceOpen)}>
                    <span className='pe-2'>
                        {priceOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                    <p>قیمت</p>
                </div>
                {
                    (minPrice.length !== 0 || maxPrice.length !== 0) ? priceOpen ? <span className='reset-filter-span-open' onClick={clearPrice}>حذف</span> : <span className='reset-filter-span-close' /> : null
                }
            </ListGroup>

            <Collapse in={priceOpen}>
                <div id="choose-price-box">
                    <div className='mb-3'>
                        <div className='d-flex flex-row justify-content-between'>
                            <div className='d-flex flex-column align-self-center align-items-center pe-2'>
                                <p>حداقل</p>
                                <span className='dv-vertical-dots'><RxDotsVertical/></span>
                                <p>حداکثر</p>
                            </div>
                            <div className='d-flex flex-column flex-fill'>
                                <div className='dv-filter-button' onClick={onClickMinDiv}>
                                    <Form.Control className='filterform' ref={inputMinPrice} autoFocus value={minPrice}
                                        onChange={(e) => changeMinHandler(e.target.value)} placeholder='مثلا ۷۰،۰۰۰،۰۰۰'
                                         aria-controls="suggestion-min-price"
                                        aria-expanded={suggestionMinPrice} onBlur={onBlurMinInput}
                                    />

                                    <span className='d-flex flex-fill'>
                                        <p className='pe-2'>تومان</p>
                                        <FiChevronDown className='align-self-center' />
                                    </span>
                                    <Fade in={suggestionMinPrice}>
                                        <div id="suggestion-min-price">
                                            <Dropdown.Menu className='dv-suggest-box' show={suggestionMinPrice?true:false}>
                                                <Dropdown.Header onClick={focusInputMin}>وارد کردن مقدار دلخواه</Dropdown.Header>
                                                <Dropdown.Item eventKey="2" data-val="10000" onClick={(e) => chooseMinPrice(e)}>10 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="20000" onClick={(e) => chooseMinPrice(e)}>20 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="50000" onClick={(e) => chooseMinPrice(e)}>50 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="100000" onClick={(e) => chooseMinPrice(e)}>100 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="200000" onClick={(e) => chooseMinPrice(e)}>200 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="1000000" onClick={(e) => chooseMinPrice(e)}>1 میلیون</Dropdown.Item>
                                                <Dropdown.Item data-val="2000000" onClick={(e) => chooseMinPrice(e)}>2 میلیون</Dropdown.Item>
                                                <Dropdown.Item data-val="5000000" onClick={(e) => chooseMinPrice(e)}>5 میلیون</Dropdown.Item>
                                                <Dropdown.Item data-val="10000000" onClick={(e) => chooseMinPrice(e)}>10 میلیون</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </div>
                                    </Fade>
                                </div>
                                <div className='dv-filter-button' onClick={onClickMaxDiv}>
                                    <Form.Control className='filterform' ref={inputMaxPrice} autoFocus value={maxPrice}
                                        onChange={(e) => changeMaxHandler(e.target.value)} placeholder='مثلا ۷۰،۰۰۰،۰۰۰'
                                        onBlur={onBlurMaxInput}
                                        aria-controls="suggestion-max-price" aria-expanded={suggestionMaxPrice}
                                    />
                                    <span className='d-flex flex-fill'>
                                        <p className='pe-2'>تومان</p>
                                        <FiChevronDown className='align-self-center' />
                                    </span>
                                    <Fade in={suggestionMaxPrice}>
                                        <div id="suggestion-max-price">
                                            <Dropdown.Menu className='dv-suggest-box' show={suggestionMaxPrice?true:false}>
                                                <Dropdown.Header onClick={focusInputMax}>وارد کردن مقدار دلخواه</Dropdown.Header>
                                                <Dropdown.Item eventKey="2" data-val="10000" onClick={(e) => chooseMaxPrice(e)}>10 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="20000" onClick={(e) => chooseMaxPrice(e)}>20 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="50000" onClick={(e) => chooseMaxPrice(e)}>50 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="100000" onClick={(e) => chooseMaxPrice(e)}>100 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="200000" onClick={(e) => chooseMaxPrice(e)}>200 هزار</Dropdown.Item>
                                                <Dropdown.Item data-val="1000000" onClick={(e) => chooseMaxPrice(e)}>1 میلیون</Dropdown.Item>
                                                <Dropdown.Item data-val="2000000" onClick={(e) => chooseMaxPrice(e)}>2 میلیون</Dropdown.Item>
                                                <Dropdown.Item data-val="5000000" onClick={(e) => chooseMaxPrice(e)}>5 میلیون</Dropdown.Item>
                                                <Dropdown.Item data-val="10000000" onClick={(e) => chooseMaxPrice(e)}>10 میلیون</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </div>
                                    </Fade>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </Collapse >
        </div >

    );
}

export default PriceFilter;