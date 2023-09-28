
import React from 'react';
import Categories from '../Categories/Categories';
import FilterSection from './FilterSection';

const Sidebar = () => {
 
    return (
    <div className='my-sticky-sidebar'>
        {/* <Categories devicePhone={false} /> */}
        <Categories />
        <FilterSection />
    </div>

)}

export default React.memo(Sidebar);