import React, { useContext, useEffect, useState } from 'react';
import catList from "../../JsonFiles/catlist.json"
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URLMaker } from '../../Helper/Helper';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { CityContext } from '../../Context/CityContext';
import { CategoryContext } from '../../Context/CategoryContext';

// import "./Categories.css"

const Categories = () => {

    console.log("Categories SideBar Render...");

    const [currentCat] = useContext(CategoryContext)
    const [currentCity] = useContext(CityContext)

    const [parentCats] = useState(catList.filter((item) => item.parent == 0))

    const [catShow, setCatShow] = useState({
        depth: 0,
        sub: [{ id: 0, title: "", parent: 0 }],
        parent: [{ id: 0, title: "", parent: 0 }],
    })

    function getCatWithAllParents(slug) {
        let parentList = [];
        let depth = 1

        let catObj = catList.filter((item) => item.slug === slug)
        if (catObj.length === 0) return
        catObj = { ...catObj[0] }
        let subCats = catList.filter((item) => item.parent == catObj.id)


        let catIndex = catList.findIndex((cat) => cat.id === catObj.id);
        while (catList[catIndex].parent !== 0) {
            parentList.push({
                id: catList[catIndex].id,
                title: catList[catIndex].title,
                icon: catList[catIndex].icon,
                slug: catList[catIndex].slug
            });
            catIndex = catList.findIndex((cat) => cat.id === catList[catIndex].parent);
            depth += 1;
        }
        parentList.push({
            id: catList[catIndex].id,
            title: catList[catIndex].title,
            icon: catList[catIndex].icon,
            slug: catList[catIndex].slug,
        });

        if (depth === 3) {
            // console.log(parentList);
            subCats = catList.filter((item) => item.parent == catObj.parent)
            parentList.splice(0, 1)
            // console.log(parentList);
        }

        setCatShow({
            depth,
            sub: subCats,
            parent: parentList.reverse()
        })
    }


    useEffect(() => {
        if (currentCat.id > 0) {
            getCatWithAllParents(currentCat.slug)
        } else {
            setCatShow({
                depth: 0,
                sub: parentCats,
                parent: []
            })
        }
    }, [currentCat])





    return (
        <div className='dv-sidebox'>
            <h6>دسته ها</h6>
            <ListGroup>
                {catShow.depth > 0 ? (
                    <>
                        <ListGroup.Item className='dv-catlist border-0'>

                            <Link to={URLMaker(currentCity.citiesList, '')}>
                                <span style={{ verticalAlign: "-2px" }}><HiOutlineArrowRight /></span>
                                همه آگهی ها
                            </Link>

                        </ListGroup.Item>
                        {
                            catShow.parent.map((parent, key) => {
                                return (
                                    <Link key={key} to={URLMaker(currentCity.citiesList, parent.slug)}>
                                        <ListGroup.Item className={`dv-catlist border-0 fw-bold dv-cat-parent ${key != 0 ? "ps-5" : ""}`}
                                        >
                                            {key === 0 ? <span className='fw-bold'><img width="22px" src={process.env.PUBLIC_URL + '/assets/icons/' + parent.icon} /></span> : null}
                                            {parent.title}
                                        </ListGroup.Item>
                                    </Link>

                                )
                            })
                        }
                    </>
                ) : null
                }
                <div className={catShow.depth > 0 ? "ps-5 pb-4" : ""}>
                    {catShow.sub.map((cat) => {
                        return (
                            <ListGroup.Item key={cat.id} className={`dv-catlist border-0 ${catShow.depth > 1 ? "cat-depth3" : ""} `}>
                                <Link to={URLMaker(currentCity.citiesList, cat.slug)}
                                    className={cat.slug == currentCat.slug ? 'active' : 'sss'}>
                                    {
                                        catShow.depth > 0 ? null : <span><img width="18px" src={process.env.PUBLIC_URL + '/assets/icons/' + cat.icon} /></span>
                                    }
                                    {cat.title}
                                </Link>

                            </ListGroup.Item>
                        )
                    })}
                </div>
            </ListGroup>
        </div>
    );
}

export default React.memo(Categories);