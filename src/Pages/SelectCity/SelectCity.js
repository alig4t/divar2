import React, { useContext, useEffect, useState } from 'react';
import { Badge, Container, Dropdown, Form, Row } from 'react-bootstrap';
import "./style.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CityList from "../../JsonFiles/Cities.json"
import Provinces from "../../JsonFiles/Provinces.json"
import WrongUrlMsg from '../../Components/UI/WrongUrlMsg/WrongUrlMsg';

const SelectCity = () => {


    const navigate = useNavigate()
    const location = useLocation()
    const states = CityList.filter((city) => city.parent !== 0)

    useEffect(()=>{
        navigate('/s/tehran',{replace:true})
    },[])


    const [inputSearch, setInputSearch] = useState("")
    const [suggestList, setSuggestList] = useState([]);

    const topCities = [
        { "id": 112, "title": "بومهن", "parent": 21, "slug": "bomehen" },
        { "id": 113, "title": "تهران", "parent": 21, "slug": "tehran" },
        { "id": 114, "title": "فشم", "parent": 21, "slug": "fasham" },
        { "id": 115, "title": "لواسان", "parent": 21, "slug": "lavasan" },
        { "id": 116, "title": "ورامین", "parent": 21, "slug": "varamin" },
        { "id": 131, "title": "خمینی شهر", "parent": 3, "slug": "khomeyni-shahr" },
        { "id": 132, "title": "اصفهان", "parent": 3, "slug": "isfahan" },
        { "id": 133, "title": "سمیرم", "parent": 3, "slug": "semirom" },
        { "id": 134, "title": "شاهین شهر", "parent": 3, "slug": "shahinshahr" },
        { "id": 135, "title": "لنجان", "parent": 3, "slug": "lenjan" },
    ]

    const filterCityListHandler = (e) => {
        console.log(e);
        setInputSearch(e)
        if (e.length > 0) {
            let filteredCities = CityList.filter((city) => {
                if (city.title.indexOf(e) > -1 || city.slug.indexOf(e.toLowerCase()) > -1) {
                    return city
                }
            })
            setSuggestList(filteredCities)
        } else {
            setSuggestList([])
        }

        // console.log(filteredCities);
    }




    return (
        <Container className='py-4' fluid>
            <Row>
                <div className='col-md-6 m-auto'>
                    <div>
                        <Form.Control type="text" value={inputSearch} placeholder='جستجوی شهر' onChange={(e) => filterCityListHandler(e.target.value)} />

                        <Dropdown show={inputSearch.length > 0} className='dv-filter-dropdown search' drop='down-centered'>
                            <Dropdown.Menu>
                                {suggestList.map((item, index) => {
                                    return <Dropdown.Item key={index}><Link to={`/s/${item.slug}`} state={{wrong:false}} >{item.title}</Link></Dropdown.Item>
                                })}

                                {/* <Dropdown.Divider /> */}

                            </Dropdown.Menu>
                        </Dropdown>

                    </div>

                    <div>
                        <h1 className='pt-5 pb-2 select-city-header'>شهر های پر بازدید</h1>
                        <div className='list-city d-flex flex-rox flex-wrap justify-content-between'>
                            {topCities.map((city) => {
                                return <Link key={city.id} to={`/s/${city.slug}`}>
                                   <Badge bg='Warning' text="dark">
                                    {city.title}
                                   </Badge>
                                    </Link>

                            })}

                        </div>
                    </div>









                </div>
            </Row>
            <Row>
                {location.state !== null ? location.state.wrong ? <WrongUrlMsg currentCity="" /> : "" :""}
            </Row>
        </Container>
    );
}

export default SelectCity;