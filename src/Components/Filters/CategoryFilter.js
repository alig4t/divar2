import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

import { useParams } from 'react-router-dom';
import { isCatSlugValid } from '../../Helper/Helper';
import ModalCategories from '../Categories/ModalCategories';
import { BiCategory } from 'react-icons/bi';


const CategoryFilter = () => {

    const [categoryModal, setCategoryModal] = useState(false);
    const { catParam } = useParams()
    const [isValidCat, catSlug, catTitle] = isCatSlugValid(catParam)

    return (
        <>
            <div className='dv-sidebox d-md-none'>
                <ListGroup onClick={() => setCategoryModal(!categoryModal)} className='dvm-filter-header'>
                    <div className='d-flex'>
                        <span className='pe-2'>
                            <BiCategory />
                        </span>
                        <p>دسته بندی</p>
                    </div>
                    <span>{isValidCat ? catTitle : "انتخاب کنید"}</span>
                </ListGroup>
            </div>

            {<ModalCategories showModal={categoryModal} devicePhone={true} closeModal={() => setCategoryModal(false)} />}
        </>

    );
}

export default CategoryFilter;