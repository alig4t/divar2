
import React, { useMemo, useState } from 'react';
import CatList from "./../JsonFiles/catlist.json"
import AllFilters from "./../JsonFiles/AllFilters.json"
import DefaultFilters from "./../JsonFiles/DefaultFilters.json"
import DefaultFilters2 from "./../JsonFiles/DefaultFilters2.json"


export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {

    const [currentCat, setCurrentCat] = useState({ id: -1, slug: "", filters: [...DefaultFilters, ...DefaultFilters2] });

    const isCatSlugValid = (slug) => {
        if (slug === undefined || slug === '') return [true, { 'sss': 'sss' }]
        let catObj = CatList.find((cat) => {
            return cat.slug === slug
        })
        if (catObj == undefined) return [false, 'ee']
        return [true, catObj]
    }

    const setDefaultCat = () => {
        if(currentCat.id > 0) {
            setCurrentCat({ id: -1, slug: "", filters: [...DefaultFilters, ...DefaultFilters2] })
        }
    }

    const setCatAndFiltersHanler = (slug) => {
        let [isValid, catObj] = isCatSlugValid(slug)

        if (catObj.id > 0) {

            let filtersCat = AllFilters.filter((fil) => {
                return fil.catId.includes(catObj.id)
            })
            let newFilterArray = []
            if (filtersCat.length > 0) {
                newFilterArray = [...DefaultFilters, ...filtersCat[0].filter, ...DefaultFilters2]
            } else {
                newFilterArray = [...DefaultFilters, ...DefaultFilters2]
            }
            setCurrentCat({ ...catObj, filters: newFilterArray })
        } else {
            setDefaultCat()     
        }

    }
  

    const value = useMemo(() => ([currentCat, setCatAndFiltersHanler]), [currentCat]);

    return (
        <CategoryContext.Provider
            value={value}
        >
            {props.children}
        </CategoryContext.Provider>
    )

}
