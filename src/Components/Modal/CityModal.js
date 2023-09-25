import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Badge, ListGroup, Form, Modal } from 'react-bootstrap';

import { IoIosClose } from 'react-icons/io'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { RiCheckboxFill } from 'react-icons/ri'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { BiCheckbox, BiSearch } from 'react-icons/bi'

import CityListJson from "./../../JsonFiles/city.json"
import { CityContext } from '../../Context/CityContext';
import { CategoryContext } from '../../Context/CategoryContext';
import { URLMaker } from '../../Utils/Utils';


function CityModal(props) {

 
  console.log("CityModal");

  const [currentCity] = useContext(CityContext)
  const [currentCat] = useContext(CategoryContext)
  // let {cat} = useParams()
  // console.log(cat);
  // let cat =''

  const listDiv = useRef(null);
  const [states, setStates] = useState([]);

  const [allAndSelectedCity, setAllAndSelectedCity] = useState({
    allCity: [],
    selectedCity: []
  })

  const [listCityShow, setListCityShow] = useState({
    parentTitle: '',
    counties: [{ "id": 0, "title": "", "parent": 0 }]
  })

  const [clickableBtn, setClickableBtn] = useState(false);

  const navigate = useNavigate()



  const province = useMemo(() => {
    return listCityShow.counties.map((item) => {
      console.log("list Memo");
      return <ListGroup.Item key={item.id}
        onClick={item.parent === 0 ? () => showCountiesHandler(item.id, item.title) : () => checkCityHandler(item.id, item.title, item.slug)}
      >
        {item.title}
        {
          item.parent === 0 ? <span className='dv-arrow'><MdKeyboardArrowLeft /></span>
            : <span className='dv-arrow'>
              {item.checked ? <RiCheckboxFill /> : <BiCheckbox />}
            </span>
        }
      </ListGroup.Item>
    })
  },[])



  /*********************  When  Rerendered, the following useEffect is executed   *********************/
  /*********************  compare selected city with prevSelected  *********************/

  useEffect(() => {
    let ids = [];
    allAndSelectedCity.selectedCity.forEach((city) => {
      ids.push(city.id);
    })
    let newSelectedStr = (ids.sort()).join("");
    if (allAndSelectedCity.selectedCity.length === 0 || currentCity.idsStr === newSelectedStr) {
      setClickableBtn(false)
    } else {
      setClickableBtn(true)
    }
  }, [allAndSelectedCity.selectedCity])


  /********************* It is executed when currentCity changes  *********************/
  useEffect(() => {

    let initialstate = [];
    let allCounties = [];
    let selectCityBadgeArray = [];

    CityListJson.map((state) => {
      if (state.parent === 0) {
        initialstate.push({ ...state, checked: false })
      } else {
        let checekdStatus = currentCity.idsArray.includes(state.id) ? true : false
        if (checekdStatus) {
          selectCityBadgeArray.push({ ...state, checked: checekdStatus })
        }
        allCounties.push({ ...state, checked: checekdStatus })
      }
    })
    setListCityShow({
      parentTitle: "",
      counties: [...initialstate],
    });
    setStates(initialstate)
    setAllAndSelectedCity({
      allCity: allCounties,
      selectedCity: selectCityBadgeArray
    })

  }, [currentCity])

  const searchCityHandler = txt => {

    let allcities = [...allAndSelectedCity.allCity]
    if (txt !== "") {
      let filteredCities = allcities.filter((item) => {
        if (item.title.indexOf(txt) > -1) {
          return item
        }
      })

      setListCityShow({
        parentTitle: "",
        counties: [...filteredCities],
      })
    } else {
      setListCityShow({
        parentTitle: "",
        counties: [...states],
      })
    }

  }


  /*********************  Delete Badge City And UnCheck It  *********************/

  const deleteCityHandler = (id) => {
    let cities = [...allAndSelectedCity.selectedCity];
    let allcities = [...allAndSelectedCity.allCity]
    let index = cities.findIndex((item) => item.id === id);
    cities.splice(index, 1);

    let cityIndex = allcities.findIndex(item => item.id === id)
    allcities[cityIndex].checked = false

    setAllAndSelectedCity({
      allCity: allcities,
      selectedCity: cities
    })
  }

  /*********************  Showing the cities of each province  *********************/

  const showCountiesHandler = (parentId, parentTitle) => {
    let counties = allAndSelectedCity.allCity.filter((state) => {
      return state.parent === parentId
    })
    let parentIndex = states.findIndex((item) => item.id === parentId);
    setListCityShow({
      parentIndex,
      parentId,
      parentTitle,
      counties: [...counties],
      checked: false
    })
    listDiv.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }

  /********************* Default display - list of provinces  *********************/
  const backToStates = () => {
    setListCityShow({
      parentTitle: "",
      counties: [...states],
    })
  }

  /********************* Mark the city And Add to badges *********************/
  const checkCityHandler = (id, title, slug) => {
    // console.log(parentIndex);
    let checkedCities = [...allAndSelectedCity.selectedCity];
    // console.log(checkedCities);
    let allcities = [...allAndSelectedCity.allCity];
    let copyStates = [...states];
    let index = allcities.findIndex((item) => item.id === id)
    if (allcities[index].checked === true) {
      allcities[index].checked = false;
      let parentId = allcities[index].parent;
      let parentIndex = copyStates.findIndex((city) => city.id === parentId)
      copyStates[parentIndex].checked = false;
      setStates(copyStates)
    } else {
      allcities[index].checked = true;
    }

    let duplicated = checkedCities.some((item) => {
      return item.id === id
    })

    if (!duplicated) {
      checkedCities.push({ id, title, slug })
    } else {
      let indexBadge = checkedCities.findIndex(item => item.id === id);
      checkedCities.splice(indexBadge, 1)
    }

    // setSelectedCity(checkedCities)
    // setAllCity(allcities)

    setAllAndSelectedCity({
      allCity: allcities,
      selectedCity: checkedCities
    })

  }


  /********************* Marking all the cities of a province *********************/

  const checkAllCities = (parentId, parentIndex) => {
    let allCities = [...allAndSelectedCity.allCity]
    let cityIDS = [];
    let copyStates = [...states]
    let selCities = [...allAndSelectedCity.selectedCity];
    let newBadges = [];

    listCityShow.counties.forEach((city) => {
      cityIDS.push(city.id)
    })

    // console.log(states[parentIndex].checked);
    if (states[parentIndex].checked === false) {
      allCities.forEach((item) => {
        if (cityIDS.includes(item.id)) {
          if (item.checked === false) {
            newBadges.push(item)
          }
          item.checked = true;
        }
      })
      copyStates[parentIndex].checked = true;
      // setSelectedCity([...selCities, ...newBadges])
      setAllAndSelectedCity({
        allCity: allCities,
        selectedCity: [...selCities, ...newBadges]
      })

    } else {
      allCities.forEach((item) => {
        if (cityIDS.includes(item.id)) {
          item.checked = false;
        }
      })
      copyStates[parentIndex].checked = false;
      selCities = selCities.filter((item) => {
        if (!cityIDS.includes(item.id)) {
          return item
        }
      })

      // setSelectedCity([...selCities])
      setAllAndSelectedCity({
        allCity: allCities,
        selectedCity: selCities
      })
    }



    // setAllCity(allCities)
    setStates(copyStates)

  }


  /********************* Navigate to new City Route *********************/
  const changeCityHandler = () => {
    props.close()
  
    navigate(URLMaker(allAndSelectedCity.selectedCity, currentCat.slug), { state: { wrong: false } })

  }




  return (
    <Modal
      show={props.show} onHide={props.close}
      fullscreen="sm-down"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header className='flex-wrap'>
        <Modal.Title id="contained-modal-title-vcenter">
          انتخاب شهر
        </Modal.Title>
        {/* <div class="break"></div> */}
        <div className='city-scrollabe w-100 pt-3'>
          {
            allAndSelectedCity.selectedCity.map((item) => {
              return (
                <Badge pill className="dv-citybadge" key={item.id}>
                  {item.title}
                  <span className="dv-deletebadge" onClick={() => deleteCityHandler(item.id)}>
                    <IoIosClose />
                  </span>
                </Badge>
              )
            })
          }
        </div>

        <div className='d-block w-100 mt-3 px-2 position-relative'>
          <Form.Control type="text" className='dv-modalsearch' placeholder="جستجو در شهرها" onChange={e => searchCityHandler(e.target.value)} />
          <span className='dv-search-modal-icon'><BiSearch /></span>
        </div>

      </Modal.Header>
      <Modal.Body className='dv-modal-body overflow-auto'>

        <ListGroup ref={listDiv}>
          {
            (listCityShow.parentTitle !== "") ? (
              <>
                <ListGroup.Item onClick={backToStates}><span className='dv-backarrow'><HiOutlineArrowRight /></span>بازگشت به استانها</ListGroup.Item>
                <ListGroup.Item onClick={() => checkAllCities(listCityShow.parentId, listCityShow.parentIndex)}>
                  {" همه شهرهای " + " " + listCityShow.parentTitle}
                  <span className='dv-arrow'>
                    {states[listCityShow.parentIndex].checked ? <RiCheckboxFill /> : <BiCheckbox />}
                  </span>
                </ListGroup.Item>
              </>
            ) : null
          }

          {
listCityShow.counties.map((item) => {
  console.log("list");
  return <ListGroup.Item key={item.id}
    onClick={item.parent === 0 ? () => showCountiesHandler(item.id, item.title) : () => checkCityHandler(item.id, item.title, item.slug)}
  >
    {item.title}
    {
      item.parent === 0 ? <span className='dv-arrow'><MdKeyboardArrowLeft /></span>
        : <span className='dv-arrow'>
          {item.checked ? <RiCheckboxFill /> : <BiCheckbox />}
        </span>
    }
  </ListGroup.Item>
})          }

        </ListGroup>


      </Modal.Body>
      <Modal.Footer>

        <Button variant='light' className='dv-btn-closemodal' onClick={props.close}>انصراف</Button>
        <Button variant={clickableBtn ? "danger" : "light"} className='dv-btn-closemodal not-allowed' onClick={changeCityHandler} disabled={clickableBtn ? false : true}>تایید</Button>

      </Modal.Footer>
    </Modal>
  );
}

// export default memo(CityModal);
export default CityModal;
