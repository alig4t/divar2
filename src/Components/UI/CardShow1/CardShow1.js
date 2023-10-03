import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdOutlineHideImage } from 'react-icons/md'

const CardShow1 = (props) => {
    return (
        props.cardsList.map((item) => {
            let titleEncode = item.title + "-" + item.cat_title
            titleEncode = encodeURIComponent(titleEncode.replace(/ /g, "-"))
            return (
                <div className='col-sm-6 col-lg-4 dv-card-section p-4' key={item.id}>
                    {/* <Link to={`/v/${titleEncode}/${item.code}`}> */}
                        <Card>
                            <div className='img-box'>
                                <span className='cat-card'>
                                    {item.cat_title}
                                </span>
                                {item.imgThumb.length > 0 ? (
                                    <Card.Img variant="top" src={process.env.PUBLIC_URL + "/assets/images/2023/05/13/" + item.imgThumb} />
                                ) : (
                                    <div className='place-img-card'>
                                        <MdOutlineHideImage />
                                    </div>
                                )
                                }

                            </div>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <div className='dv-info-lists'>
                                    <p>در حد نو</p>
                                    {item.features.map((feature, index) => {
                                        return (
                                            <p key={index}>
                                                {feature.title + " : " + Number(feature.value).toLocaleString() + " تومان "}
                                            </p>
                                        )
                                    })}

                                </div>
                                <span className='zaman'>نیم ساعت پیش در تهران، محله ستارخان</span>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    {/* </Link> */}
                </div>
            )

        })

    );
}

export default CardShow1;