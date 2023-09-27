import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { URLMaker, getAllParentCats } from '../../Helper/Helper';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CityContext } from '../../Context/CityContext';
import { useEffect } from 'react';

const UpperCards = () => {

    const parentCatList = getAllParentCats()

    const [currentCity] = useContext(CityContext)



    return (
        <Container fluid className='d-block d-md-none'>
            <Row className='pt-3 pb-2'>
                {parentCatList.map((cat) => {
                    return <div className='col-3 my-2' key={cat.id}>
                        <Link to={URLMaker(currentCity.citiesList, cat.slug)} >
                            <div className='d-flex flex-column align-items-center'>
                                <span className='upper-card-span'><img width="18px" src={process.env.PUBLIC_URL + '/assets/icons/upper/' + cat.slug + ".png"} /></span>
                                <span className='upper-card-txt'>{cat.title}</span>
                            </div>
                        </Link>
                    </div>
                })}
            </Row>
            <Row>
                <h1 className='my-2 upper-desc'> نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو و دست دوم و کارکرده، استخدام و خدمات</h1>
            </Row>
        </Container>
    );
}

export default UpperCards;