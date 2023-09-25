import { useContext, useEffect, useMemo, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { Button, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CityContext } from "../../Context/CityContext";
import CityList from "../../Components/Cities/Cities.json"
import CatList from "../../JsonFiles/catlist.json"
import { URLMakerWithHash, isCatSlugValid } from "../../Helper/Helper";
import Sidebar from "../../Components/Sidebar/Sidebar";
import NotFound from "../../Components/UI/NotFound/NotFound";
import WrongUrlMsg from "../../Components/UI/WrongUrlMsg/WrongUrlMsg";
import Cards from "../../Components/Cards/Cards";
import { CategoryContext } from "../../Context/CategoryContext";


const Main = () => {
    const [ren, setRen] = useState(0)
    console.log("Main Render");
    const location = useLocation()
    const navigate = useNavigate()
    const [queryStirng] = useSearchParams();
    let { city, catParam } = useParams()


    const [currentCity, setCurrentCity] = useContext(CityContext)
    const [, setCatAndFiltersHanler] = useContext(CategoryContext)

    const [wrongUrl, setWrongUrl] = useState({ cat: false, city: false })

    /*************************** Regex for validate city Ids ***************************/
    const regexStr = /(^\d+(\,\d+)*$)/g;
    const regexHash = /(^\d+(\%2C\d+)*$)/g;

    useEffect(() => {
        console.log("catParam");
        let [isValidCat,catSlug] = isCatSlugValid(catParam)
        if (!isValidCat) {
            setWrongUrl({ city: false, cat: true })
        } else {
            setCatAndFiltersHanler(catParam)
            localStorage.setItem("catSlug",catSlug)
            setWrongUrl({ city: false, cat: false })
        }

    }, [catParam])


    useEffect(() => {
        console.log("Manteghhhhhhhhhh");
        let ids = [];
        let wrongAddress = false;

        let cityListArray = []


        if (city === 'iran' && queryStirng.has('cities') && regexStr.test(queryStirng.get('cities'))) {

            let citiesIdsString = queryStirng.get('cities');
            let citiesIdsArray = citiesIdsString.split(",");
            citiesIdsArray.forEach(id => {
                let cityObj = CityList.find((item) => item.id === Number(id))
                if (cityObj === undefined || cityObj.parent === 0) {
                    wrongAddress = true;
                } else {
                    cityListArray.push(cityObj)
                    ids.push(Number(id))
                }
            });

        } else {
            let singleCityObj = CityList.find((item) => item.slug === city)
            if (singleCityObj === undefined) {
                wrongAddress = true
            } else {
                ids.push(singleCityObj.id)
                cityListArray.push(singleCityObj)
            }
        }

        if (wrongAddress) {
            let prevCityHash = localStorage.getItem("lastCities");
            let prevCat = localStorage.getItem("catSlug");
            if (prevCityHash !== null && prevCityHash !== "" && regexHash.test(prevCityHash)) {
                navigate(URLMakerWithHash(prevCityHash, prevCat), { state: { wrong: true } })
            } else {
                navigate('/', { state: { wrong: true } })
            }
        } else {
            let idsStr = (ids.sort()).join("");
            if (currentCity.idsStr !== idsStr) {
                setCurrentCity({
                    idsStr,
                    idsArray: ids,
                    citiesList: cityListArray
                })
                localStorage.setItem("lastCities", ids.join("%2C"))
            }
        }


    }, [location])


    return (
        <>
            <Layout>
                <Container fluid>
                    {
                        wrongUrl.cat ? <NotFound msg="همچین دسته بندی در سایت موجود نمی باشد" /> :
                            <Row>
                                <div className='d-none d-md-block col-md-4 col-lg-3'>
                                    <Sidebar />
                                </div>
                                <div className='col-12 col-md-8 col-lg-9'>
                                    <Cards />
                                </div>
                                <Row>
                                    {location.state !== null ? location.state.wrong ? <WrongUrlMsg currentCity={currentCity} /> : "" : ""}
                                </Row>
                            </Row>
                    }
                </Container>

            </Layout>

            <Button className="mt-5" style={{ float: "left" }} onClick={() => setRen(ren + 1)} type='button' variant='danger' >Rerender {ren}</Button>
            <Link to="/s/tehran/wwwwww" style={{ float: "left" }} >cat</Link>{' '}
            <Link to="/s/tehran/" style={{ float: "left" }} >right link</Link>{' '}
            <Link to="/s/tehran/real-estate" style={{ float: "left" }} >right link</Link>{' '}
        </>
    );
}

export default Main;