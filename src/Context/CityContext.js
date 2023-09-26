
import React, { useMemo, useState } from 'react';

export const CityContext = React.createContext()

export const CityProvider = (props) => {

    console.log("CityProviderrrrrrr");

    const [currentCity, setCurrentCity] = useState({
        idsStr: "",
        idsArray: [],
        citiesList: [{ title: "", slug: "" }]
    });


    let titleForNav = 'انتخاب کنید'
    let slug = '';

    if (currentCity.idsArray.length > 1) {
        titleForNav = currentCity.idsArray.length + " " + "شهر"
        slug = "/s/iran?cities=" + currentCity.idsArray.join('%2C')
    } else if (currentCity.idsArray.length === 1) {
        titleForNav = currentCity.citiesList[0].title
        slug = "/" + currentCity.citiesList[0].slug
    }

    // const value = useMemo(() =>
    // ({ currentCity, setCurrentCity,titleForNav })
    // , [currentCity])
    // const value = useMemo(() => ([currentCity, setCurrentCity,titleForNav]), [currentCity]);
    // [currentCity, setCurrentCity,titleForNav]
    const value = React.useMemo(() => [currentCity, setCurrentCity, titleForNav, slug], [currentCity])

    return (
        <CityContext.Provider
            value={value}
        >
            {props.children}
        </CityContext.Provider>
    )

}

// export function CityProvider(props) {
//     const [currentCity, setCurrentCity] = useState({
//         idsStr: "",
//         idsArray: [],
//         citiesList: [{ title: "", slug: "" }]
//     });

//     const value = useMemo(() => ([currentCity, setCurrentCity]), [currentCity]);

//     return <CityContext.Provider value={value} {...props} />;
// }
