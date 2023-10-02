import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

import { IoIosClose } from 'react-icons/io'
import { BiCheckbox } from 'react-icons/bi'
import { RiCheckboxFill } from 'react-icons/ri'
import { BiSearch } from 'react-icons/bi';

import distJson from "./../District/districts.json"
import { Form, ListGroup } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';


const DistrictModal = (props) => {


  const [districtsShow, setDistrictsShow] = useState([])
  const [AllDistricts, setAllDistricts] = useState([])

  const [selectedDistricts, setSelectedDistricts] = useState([])
  const [clickableBtn, setClickableBtn] = useState(false);

  
  useEffect(() => {
    function backBrowerClicked() {
      props.closeModal()
    }
    window.addEventListener('popstate', backBrowerClicked)
    return () => {
      window.removeEventListener('popstate', backBrowerClicked)
    };
  }, [])




  const navigateUrl = () => {
    let ids = [];
    selectedDistricts.forEach((mahal) => {
      ids.push(mahal.id);
    })
    props.urlMaker(props.slug, ids)
    props.closeModal()
  }


  useEffect(() => {
    if (props.showModal) {

      let mahaleList = props.itemsList.map((item) => {
        let checekdStatus = props.currentDistricts.includes(item.id) ? true : false
        return { ...item, "checked": checekdStatus }
      })

      let selectMahalBadgeArray = [];


      props.currentDistricts.map((mahalId) => {
        let index = mahaleList.findIndex(mahal => mahal.id === mahalId)
        mahaleList[index].checked = true;
        selectMahalBadgeArray.push({ id: mahaleList[index].id, title: mahaleList[index].title })
      })

      setDistrictsShow(mahaleList)
      setAllDistricts(mahaleList)
      setSelectedDistricts(selectMahalBadgeArray)
    }
  }, [props.showModal])

  useEffect(() => {
    let ids = [];
    selectedDistricts.forEach((mahal) => {
      ids.push(mahal.id);
    })
    let newSelectedStr = (ids.sort()).join("");
    let prevSelected = (props.currentDistricts).sort().join("")
    if (prevSelected == newSelectedStr) {
      setClickableBtn(false)
    } else {
      setClickableBtn(true)
    }

  }, [selectedDistricts])

  const deleteCityHandler = (id) => {
    let selectedDup = [...selectedDistricts];
    let districtsDup = [...AllDistricts];

    let index = districtsDup.findIndex(item => item.id === id);
    districtsDup[index].checked = false;

    setAllDistricts(districtsDup)
    setDistrictsShow(districtsDup)

    let selectedIndex = selectedDup.findIndex(item => item.id === id);
    selectedDup.splice(selectedIndex, 1)
    setSelectedDistricts(selectedDup)

  }


  const searchDistrictHandler = txt => {

    let allmahale = [...AllDistricts]
    if (txt !== "") {
      let filteredMahal = allmahale.filter((item) => {
        if (item.title.indexOf(txt) > -1) {
          return item
        }
      })
      setDistrictsShow(filteredMahal)

    } else {
      setDistrictsShow(allmahale)

    }

  }




  const checkDistrictHandler = (id, title) => {
    let dupDist = [...AllDistricts];
    let index = dupDist.findIndex(item => item.id === id);
    if (dupDist[index].checked === false) {
      dupDist[index].checked = true
    } else {
      dupDist[index].checked = false
    }


    let checkedDist = [...selectedDistricts]
    let duplicated = checkedDist.some((item) => {
      return item.id === id
    })

    if (!duplicated) {
      checkedDist.push({ id, title })
    } else {
      let indexBadge = checkedDist.findIndex(item => item.id === id);
      checkedDist.splice(indexBadge, 1)
    }
    setSelectedDistricts(checkedDist)

  }


  return (
    <Modal
      show={props.showModal} onHide={props.closeModal}
      fullscreen="sm-down"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header className='flex-wrap'>
        <Modal.Title id="contained-modal-title-vcenter">
          انتخاب {props.title}
        </Modal.Title>
        {/* <div class="break"></div> */}
        <div className='city-scrollabe w-100 pt-3'>
          {
            selectedDistricts.map((item) => {
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
          {selectedDistricts.length === 0 ? <h4>حداقل یک {props.title} انتخاب نمایید</h4> : null}
        </div>

        <div className='d-block w-100 mt-3 px-2 position-relative'>
          <Form.Control type="text" className='dv-modalsearch' placeholder={`جستجو در ${props.title} ها`} onChange={e => searchDistrictHandler(e.target.value)} />
          <span className='dv-search-modal-icon'><BiSearch /></span>
        </div>

      </Modal.Header>
      <Modal.Body className='dv-modal-body overflow-auto'>

        <ListGroup>

          {
            districtsShow.map((item) => {
              return <ListGroup.Item className='d-flex justify-content-between' key={item.id} onClick={() => checkDistrictHandler(item.id, item.title)}
              >
                {item.title}
                {/* <span className='dv-arrow'> */}
                {/* {item.checked ? <RiCheckboxFill /> : <BiCheckbox />} */}
                <div className='modal-input-div'>
                  <input className="form-check-input"
                    type="checkbox"
                    id={`checkboxNoLabel-${item.id}`}
                    readOnly
                    checked={item.checked ? true : false}
                  />
                </div>

                {/* </span> */}
              </ListGroup.Item>
            })
          }

        </ListGroup>


      </Modal.Body>
      <Modal.Footer>
        <Button variant='light' className='dv-btn-closemodal' onClick={props.closeModal}>انصراف</Button>
        <Button variant={clickableBtn ? "danger" : "light"} className='dv-btn-closemodal not-allowed' onClick={navigateUrl} disabled={clickableBtn ? false : true}>تایید</Button>

      </Modal.Footer>
    </Modal>
  );
}

export default DistrictModal;
