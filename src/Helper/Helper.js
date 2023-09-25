import CatList from '../JsonFiles/catlist.json'

export const isCatSlugValid = (slug) => {

    if (slug === undefined || slug === '') return [true,'']
    let catObj = CatList.find((cat) => {
        return cat.slug === slug
    })
    if (catObj == undefined) return [false, '']
    return [true, catObj.slug]
}

export const URLMaker = (city = [], cat, filters = {}) => {

    if (city.length === 0) return '/'
    let hashCities = '';
    let multiCity = city.length > 1 ? true : false
    let cityName = city.length > 1 ? "iran" : city[0].slug
    let catName = cat !== undefined ? cat : ''
    if (multiCity) {
        city.forEach((item, key) => {
            hashCities += item.id
            if (key < city.length - 1) {
                hashCities += ','
            }
        })
        // hashCities = encodeURIComponent(hashCities)
        filters.cities = hashCities
    } else {
        hashCities = city[0].slug
    }

    let filtersString = '?' + new URLSearchParams(filters);
    let urlArray = ['/s', cityName, catName]
    // console.log(catName);
    urlArray = urlArray.filter((seg) => seg !== '')
    urlArray = urlArray.join('/')
    // console.log(urlArray + filtersString);

    // console.log(urlArray + filtersString);

    return urlArray + filtersString

}

export const URLMakerWithHash = (hash, cat) => {
    let catPath = cat === '' || cat == undefined ? "" : "/" + cat;
    return `/s/iran${catPath}?cities=${hash}`
}


export const getSortedCities = (cityList) => {

    console.log("helper");

    let provinces = { ProvinceWithCity: {}, onlyCities: [] };

    cityList.forEach((state) => {
        if (state.parent === 0) {
            provinces["ProvinceWithCity"][state.id] = {
                id: state.id,
                title: state.title,
                slug: state.slug,
                cities: []
            }
        }
    })

    for (let i = 0; i < cityList.length; i++) {
        let item = cityList[i];
        if (item.parent !== 0) {
            let province = provinces["ProvinceWithCity"][item.parent];
            if (province) {
                province.cities.push({
                    id: item.id,
                    title: item.title,
                    slug: item.slug
                });
            }
            provinces["onlyCities"].push({
                id: item.id,
                title: item.title,
                slug: item.slug
            })
        }
    }
    // console.log(provinceObj["ProvinceWithCity"]);
    return provinces
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export const getQueryObjectUrl = () => {
    let queryParams = []
    if (window.location.search !== "") {
        let urlQueryString = window.location.search.slice(1);
        let urlQueryArray = urlQueryString.split("&");
        urlQueryArray.forEach((item) => {
            let subQuery = item.split("=");
            if (subQuery[0] !== 'cities') {
                queryParams.push(subQuery[0])
            }
        })
    }
    return queryParams
}
