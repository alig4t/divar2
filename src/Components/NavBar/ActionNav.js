import React, { useCallback,useContext, useEffect, useState  } from 'react';
import { Link, useSearchParams } from "react-router-dom";

import { Badge, Container, Row } from "react-bootstrap";
import { IoIosClose } from 'react-icons/io'

import { CityContext } from "../../Context/CityContext";
import { CategoryContext } from '../../Context/CategoryContext';

import ModalCategories from '../Categories/ModalCategories';
import FilterModal from '../Sidebar/FilterModal';
import UpperCards from './UpperCards';
import { URLMaker } from '../../Helper/Helper';
import BottomNavbar from './BottomNavbar';

// import "./ActionNav.css"

const ActionNav = () => {

    const [currentCity] = useContext(CityContext)
    const [currentCat] = useContext(CategoryContext)
    const [queryString] = useSearchParams()

    const allcat = []

    const [hasFilter, setHasFilter] = useState(false)

    const [categoryModal, setCategoryModal] = useState(false)
    const categoryModalHandler = () => {
        setCategoryModal(true)
    }

    const closeCategoryModal = useCallback(() => {
        setCategoryModal(false)
    }, [])


    const [filterModal, setFilterModal] = useState(false)
    const filterModalHandler = () => {
        setFilterModal(true)
    }

    useEffect(() => {
        let parmas = queryString.toString()
        if (parmas.length > 1 || currentCat.id > 0) {
            setHasFilter(true)
        } else {
            setHasFilter(false)
        }
    }, [currentCat, queryString])


    return (
        <>
            {currentCat.id > 0 ? (
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
            ) : (
                <UpperCards />   
            )
            }
            <BottomNavbar openModal={categoryModalHandler} />
            <FilterModal showModal={filterModal} devicePhone={true} closeModal={() => setFilterModal(false)} />

            <ModalCategories showModal={categoryModal} closeModal={closeCategoryModal} />
        </>
    );
}

export default ActionNav