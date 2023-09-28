import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import catList from "../../JsonFiles/catlist.json"
import { URLMaker } from '../../Helper/Helper';
import { CityContext } from '../../Context/CityContext';

const DeviceCategories = (props) => {

    const navigate = useNavigate()

    const [currentCity, setCurrentCity, titleForNav] = useContext(CityContext)
    const [showList, setShowList] = useState({ depth: 0, sub: [], parent: [] })

    const showSubCats = (id, slug) => {
        let childrenCats = catList.filter((item) => item.parent == id)
        if (childrenCats.length === 0) {
            navigateCategory(slug)
            props.closeModal()
            return
        }
        let parent = catList.filter((item) => item.id == id)
        setShowList({
            depth: 1,
            sub: childrenCats,
            parent: parent
        })
    }

    useEffect(() => {
        let originalCats = catList.filter((item) => item.parent == 0)
        setShowList({
            depth: 0,
            sub: originalCats,
            parent: []
        })
    }, [])

    const navigateCategory = (slug) => {
        navigate(URLMaker(currentCity.citiesList, slug));
        props.closeModal()
    }

    return (
        <ListGroup>
            {showList.parent.length > 0 ? (
                <ListGroup.Item onClick={() => showSubCats(showList.parent[0].parent)} className='dvm-catlist border-0'>
                    <span style={{ verticalAlign: "-1px", marginLeft: "5px" }}><HiOutlineArrowRight /></span>

                    {showList.parent.length > 1 ? " بازگشت به دسته قبل " : 'بازگشت به همه آگهی ها'}

                </ListGroup.Item>
            ) : null}

            {showList.sub.map((cat) => {
                return (
                    <ListGroup.Item key={cat.id} className='dvm-catlist' onClick={() => showSubCats(cat.id, cat.slug)}>
                        {cat.icon !== "" ? <span className='dvm-icon-cat'><img width="24px" src={process.env.PUBLIC_URL + '/assets/icons/' + cat.icon} /></span> : null}
                        {cat.title}
                        <span className='dvm-icon-arrow my-auto'>
                            {cat.hasChildren ? <MdKeyboardArrowLeft /> : ""}
                        </span>

                    </ListGroup.Item>
                )
            })
            }

            {
                (showList.parent.length > 0) ? (
                    <ListGroup.Item className='dvm-catlist' onClick={() => navigateCategory(showList.parent[showList.parent.length - 1].slug)}>


                        {showList.parent[showList.parent.length - 1].icon !== "" ? (
                            <span className='dvm-icon-cat'><img width="24px" src={process.env.PUBLIC_URL + '/assets/icons/' + showList.parent[showList.parent.length - 1].icon} /></span>
                        ) : null}
                        {"همه آگهی های" + " " + showList.parent[showList.parent.length - 1].title}

                    </ListGroup.Item>
                ) : null
            }

        </ListGroup>
    );
}

export default DeviceCategories;