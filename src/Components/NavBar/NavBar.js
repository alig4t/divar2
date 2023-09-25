import { Button, Form, Navbar, Nav } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';

import { Link, useLocation, useParams } from "react-router-dom";

import { MdLocationOn } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs'
import { BsChatDots } from 'react-icons/bs'

// import "./NavBar.css"
import Cities from "../Cities/Cities";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CityContext } from "../../Context/CityContext";

const NavBar = () => {

    console.log("NavBar Render");
    const expand = "lg"

    const [city, , titleForNav] = useContext(CityContext)

    const [cityModalShow, setCityModalShow] = useState(false)
    const handleCityModalShow = () => setCityModalShow(true);
    const handleCityModalClose = useCallback(() => setCityModalShow(false), []);


    return (
        <Navbar
            key={expand}
            bg="light"
            expand={expand}
            className="dv-nav mb-3"
            sticky='top'
        >

            <Link to='/' className='navbar-brand d-none d-md-block'>
                {process.env.REACT_APP_BASE_TITLE}
            </Link>

            <div className="d-none d-md-block vr h-75 mx-2 my-auto"></div>
            <Button onClick={handleCityModalShow} variant="" className="d-none d-md-block dv-city-select-btn me-3 me-xl-5">
                <span>
                    <MdLocationOn />
                </span>

                {titleForNav}
            </Button>


            <div className="d-flex bd-highlight align-items-center dv-searchbox flex-fill">
                <BiSearch className='mx-2' />
                <Form.Control
                    type="search"
                    placeholder="جستجو در همه آگهی ها"
                    className="me-2 dv-search-input"
                    aria-label="Search"
                />
                <Button onClick={handleCityModalShow} variant="" className="d-block d-sm-block d-md-none dv-city-input-btn">

                    <span className='border-start ps-3' style={{ whiteSpace: "nowrap" }}>
                        {titleForNav}
                    </span>
                </Button>
                
            </div>


            <Navbar.Toggle className='d-none d-md-block d-lg-none dv-nav-toggle' aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>

                        {process.env.REACT_APP_BASE_TITLE}

                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link className='my-auto' href="#action1"><span className='me-1'><BsPerson /></span>دیوار من</Nav.Link>
                        <Nav.Link className='my-auto' href="#action2"><span className='me-1'><BsChatDots /></span>چت</Nav.Link>
                        <Nav.Link className='my-auto' href="#action2"><span className='me-1'></span>پشتیبانی</Nav.Link>
                        <Nav.Link className='my-auto' href="#action2">
                            <button className="btn btn-danger dv-btn-ads" href="#">ثبت آگهی</button>
                        </Nav.Link>

                    </Nav>

                </Offcanvas.Body>
            </Navbar.Offcanvas>

            <Cities show={cityModalShow} close={handleCityModalClose} />
          
        </Navbar>
    );
}

export default React.memo(NavBar);