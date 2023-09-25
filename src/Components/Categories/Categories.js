import React, { useContext, useEffect, useState } from 'react';
import catList from "../../JsonFiles/catlist.json"
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { Link, NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { URLMaker } from '../../Helper/Helper';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { CityContext } from '../../Context/CityContext';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { CategoryContext } from '../../Context/CategoryContext';

// import "./Categories.css"

const Categories = (props) => {

    console.log("Categories Render...");
    const navigate = useNavigate()
   
  
    const [currentCat, setCatAndFiltersHanler,clearCat] = useContext(CategoryContext) 
    const [currentCity] = useContext(CityContext)

    const [catShow, setCatShow] = useState({
        depth: 0,
        sub: [{ id: 0, title: "", parent: 0 }],
        parent: [{ id: 0, title: "", parent: 0 }],
        currentCat: { id: 0 }
    })
    const [showList, setShowList] = useState({ depth: 0, sub: [], parent: [] })

    function getOrginalCats() {
        let originalCats = catList.filter((item) => item.parent == 0)
        setCatShow({
            depth: 0,
            sub: originalCats,
            parent: []
        })
    }
    useEffect(() => {
        getOrginalCats()
        if(props.devicePhone){
            let originalCats = catList.filter((item) => item.parent == 0)
        setShowList({
            depth: 0,
            sub: originalCats,
            parent: []
        })
        }
    }, [])



    function getCatWithAllParents(slug) {
        let parentList = [];
        let depth = 1

        let currentCat = catList.filter((item) => item.slug === slug)
        if (currentCat.length === 0) return
        currentCat = { ...currentCat[0] }
        let subCats = catList.filter((item) => item.parent == currentCat.id)


        let catIndex = catList.findIndex((cat) => cat.id === currentCat.id);
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
            subCats = catList.filter((item) => item.parent == currentCat.parent)
            parentList.splice(0, 1)
            // console.log(parentList);
        }

        setCatShow({
            depth,
            sub: subCats,
            parent: parentList.reverse()
        })
    }

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
        if(currentCat.id>0){
            getCatWithAllParents(currentCat.slug)
        }else{
            getOrginalCats()
        }
        // if (catParam === '' || catParam === undefined) {
        //     getOrginalCats()
        // } else {
        //     getCatWithAllParents(catParam)
        // }
    }, [currentCat])

    useEffect(()=>{
        
        if(props.show){
            getOrginalCats()
        }
    })

    const navigateCategory = (slug) => {
        console.log('ssss');
        navigate(URLMaker(currentCity.citiesList, slug));
        setCatAndFiltersHanler(slug)
        props.closeModal()
    }


    return (
        <>
            {props.devicePhone === false ? (

                <div className='dv-sidebox'>
                    <h6>دسته ها</h6>
                    <ListGroup>
                        {catShow.depth > 0 ? (
                            <>
                                <ListGroup.Item className='dv-catlist border-0'>

                                    <Link to={URLMaker(currentCity.citiesList, '')} onClick={clearCat}>
                                        <span style={{ verticalAlign: "-2px" }}><HiOutlineArrowRight /></span>
                                        همه آگهی ها
                                    </Link>

                                </ListGroup.Item>
                                {
                                    catShow.parent.map((parent, key) => {
                                        return (
                                            <Link key={key} to={URLMaker(currentCity.citiesList, parent.slug)} onClick={()=>setCatAndFiltersHanler(parent.slug)}>
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
                                        <Link to={URLMaker(currentCity.citiesList, cat.slug)} onClick={()=>setCatAndFiltersHanler(cat.slug)}
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
            ) : (
                
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
                   
            )
            }
        </>
    );
}

export default React.memo(Categories);