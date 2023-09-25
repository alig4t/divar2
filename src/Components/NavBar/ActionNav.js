import React from 'react';

import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Badge, Container, Row } from "react-bootstrap";

import { IoIosClose } from 'react-icons/io'
import { CityContext } from "../../Context/CityContext";

import ModalCategories from '../Categories/ModalCategories';
import { URLMaker, isCatSlugValid } from '../../Helper/Helper';
import FilterModal from '../Sidebar/FilterModal';
import { CategoryContext } from '../../Context/CategoryContext';

// import "./ActionNav.css"

const ActionNav = () => {

    console.log("Action Nav");

    // const {catParam} = useParams()
    // const [isValidCat,slugCat,titleCat] = isCatSlugValid(catParam)

    const [currentCity] = useContext(CityContext)
    const [currentCat] = useContext(CategoryContext)

    const allcat = []
    const location = useLocation()

    const [hasFilter, setHasFilter] = useState(false)

    const [categoryModal, setCategoryModal] = useState(false)
    const categoryModalHandler = () => {
        setCategoryModal(true)
    }
    const [filterModal, setFilterModal] = useState(false)
    const filterModalHandler = () => {
        setFilterModal(true)
    }
    const [districtModal, setDistrictModal] = useState(false)
    const districtModalHandler = () => {
        setDistrictModal(true)
    }


    const getQueryObjectUrl = () => {
        let queryParams = []
        if (location.search !== "") {
            let urlQueryString = location.search.slice(1);
            let urlQueryArray = urlQueryString.split("&");
            urlQueryArray.forEach((item) => {
                let subQuery = item.split("=");
                if (subQuery[0] !== 'cities') {
                    queryParams.push(subQuery[0])
                }
            })
        }
        return queryParams
    }


    useEffect(() => {
        let params = getQueryObjectUrl()

        if (params.length > 0 || currentCat.id > 0) {
            setHasFilter(true)
        } else {
            setHasFilter(false)

        }
    }, [location])

    return (
        <>
            <Container fluid className="d-md-none dv-actionnav-container sticky-top pt-3 pb-2">
                <Row>
                    <div className="col-12 dv-action-nav">
                    <Badge onClick={filterModalHandler} className={`dv-action-badge ${hasFilter ? "active" : ""}`} bg="" style={{ paddingLeft: "15px" }}>
                            فیلترها
                        </Badge>


                        {currentCat.id > 0 ? <Badge className="dv-action-badge active" bg="">
                            <span onClick={categoryModalHandler}>
                                {currentCat.title}
                            </span>

                            <span className="dv-deleteFilter">
                                <Link to={URLMaker(currentCity.citiesList, '')}>
                                    <IoIosClose />
                                </Link>
                            </span>

                        </Badge>
                            : (<>
                                <Badge onClick={categoryModalHandler} className="dv-action-badge" bg="">
                                    دسته ها
                                </Badge>
                                {allcat.map((cat) => <Link key={cat.id} to={URLMaker(currentCity.citiesList, cat.slug)}>
                                    <Badge className="dv-action-badge" bg="">
                                        {cat.title}
                                    </Badge>
                                </Link>)}
                            </>

                            )

                        }



                        </div>
                </Row>
            </Container>
             <FilterModal showModal={filterModal} devicePhone={true} closeModal={() => setFilterModal(false)} />

             <ModalCategories showModal={categoryModal} devicePhone={true} closeModal={() => setCategoryModal(false)} />
        </>
        );
    }

    export default ActionNav