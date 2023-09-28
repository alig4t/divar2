import React, { useEffect, useState } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
import {AiOutlineBars} from 'react-icons/ai'
import {AiFillPlusCircle} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import {BsFillChatFill} from 'react-icons/bs'
import {BiHomeAlt} from 'react-icons/bi'

const BottomNavbar = (props) => {

    const [catModalOpen,setCatModalOpen] = useState(false)
    
 

    return (
        <nav className="d-md-none dv-mobile-bottom-nav fixed-bottom d-flex justify-content-around">
            <div className='sub-bottom-nav'>
                <span><BiHomeAlt/></span>
                <p>آگهی ها</p>
            </div>
           
            <div className='sub-bottom-nav' onClick={props.openModal}>
                <span><AiOutlineBars /></span>
                <p>دسته ها</p>
            </div>
           
            <div className='sub-bottom-nav'>
                <span><AiFillPlusCircle/></span>
                <p>ثبت آگهی</p>
            </div>
           
            <div className='sub-bottom-nav'>
                <span><BsFillChatFill/></span>
                <p>چت</p>
            </div>
           
            <div className='sub-bottom-nav'>
                <span><BsFillPersonFill/></span>
                <p>دیوار من</p>
            </div>
           

        </nav>
    );
}

export default React.memo(BottomNavbar);