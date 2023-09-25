import React, { useContext, useEffect, useMemo, useState } from 'react';

import StatusFilter from '../Filters/StatusFilter';
import DistrictFilter from '../Filters/DistrictFilter';
import CategoryFilter from '../Filters/CategoryFilter';
import MinMaxTypeFilter from '../Filters/MinMaxTypeFilter';
import SelectTypeFilter from '../Filters/SelectTypeFilter';
import CheckboxFilter from '../Filters/CheckboxFilter';
import RadioBoxFilter from '../Filters/RadioBoxFilter';

import { CityContext } from '../../Context/CityContext';

import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import filterTypes from "../../JsonFiles/Filters.json"
import { isCatSlugValid } from '../../Helper/Helper';
import catList from '../../JsonFiles/catlist.json'
import AllFilters from "../../JsonFiles/AllFilters.json"
import DefaultFilters from "../../JsonFiles/DefaultFilters.json"
import DefaultFilters2 from "../../JsonFiles/DefaultFilters2.json"
import { CategoryContext } from '../../Context/CategoryContext';

const FilterSection = () => {

    console.log("filterSection Render");


    const [currentCity, setCurrentCity ] = useContext(CityContext)
    const [currentCat, setCurrentCat] = useContext(CategoryContext)

    console.log(currentCity);
    console.log(currentCat);


    // useEffect(()=>{
        
    // },[catParam])






    const filterComponents = () => {
        return currentCat?.filters?.map((fil) => {
            let ComponentFilter = fil.type
            console.log("filter map");
            switch (fil.type) {
                case "MinMaxTypeFilter":
                    return <MinMaxTypeFilter
                        title={fil.title}
                        unit={fil.unit}
                        slug={fil.slug}
                        suggestListMin={fil.suggestMin}
                        suggestListMax={fil.suggestMax}
                        minPlaceHolder={fil.exampleMin}
                        maxPlaceHolder={fil.exampleMax}
                    />
                case "DistrictFilter":
                    return <DistrictFilter
                        title={fil.title}
                        slug={fil.slug}
                        itemsList={fil.itemsList}
                    />
                case "SelectTypeFilter":
                    return <SelectTypeFilter
                        title={fil.title}
                        slug={fil.slug}
                        unit={fil.unit}
                        suggestList={fil.suggestList}
                        selectPlaceHolder={fil.placeHolder}
                    />
                case "RadioBoxFilter":
                    return <RadioBoxFilter
                        slug={fil.slug}
                        title={fil.title}
                        itemsList={fil.itemsList}
                        default={fil.default}
                    />
                case "CheckboxFilter":
                    return <CheckboxFilter
                        slug={fil.slug}
                        title={fil.title}
                        itemsList={fil.itemsList}
                    />
                case "StatusFilter":
                    return <StatusFilter
                        title={fil.title}
                        itemsList={fil.itemsList}
                    />
            }
        })
    }

    return (<>

        {/* <CategoryFilter /> */}

        {filterComponents()}

    </>
    );
}

export default React.memo(FilterSection);