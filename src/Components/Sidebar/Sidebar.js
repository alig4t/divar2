
import React from 'react';
import Categories from '../Categories/Categories';
import FilterSection from './FilterSection';
import './Sidebar.css'
const Sidebar = () => {
    console.log("sidebar");
    const style = {
        position: "fixed",
        top: "70px",
        maxHeight: "calc(100vh - 70px)",
        overflowY: "auto",
        width:"inherit",
        paddingBottom:"70px",
        paddingLeft:"15px"
    }
    return (
    <div className='my-sticky-sidebar' style={style}>
        <Categories devicePhone={false} />
        <FilterSection />
    </div>

)}

export default React.memo(Sidebar);