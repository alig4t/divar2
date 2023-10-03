import React from 'react';
import { FaRegComment } from 'react-icons/fa'
import { MdOutlineHideImage } from 'react-icons/md';
import { Link } from 'react-router-dom';


const CardShow2 = (props) => {
    return (
        <div className='d-flex flex-wrap'>
            {
                props.cardsList.map((item, index) => {
                    let titleEncode = item.title + "-" + item.cat_title
                    titleEncode = encodeURIComponent(titleEncode.replace(/ /g, "-"))
                    return (
                        <div className='dv-card' key={index}>
                            {/* <Link to={`/v/${titleEncode}/${item.code}`}> */}
                                <div className='dv-card-border'>
                                    <div className='dv-post'>
                                        <div className='dvpost-info'>
                                            <div className='dv-info-title flex-fill'>
                                                <h2>{item.title}</h2>
                                            </div>
                                            <div className='dv-info-lists'>
                                                {item.features.map((feature, subIndex) => {
                                                    return (
                                                        <p key={subIndex}>
                                                            {feature.title + " : " + Number(feature.value).toLocaleString() + " تومان "}
                                                        </p>
                                                    )
                                                })}
                                            </div>
                                            <div className='dv-info-bottom'>
                                                <span className='text-muted'>نیم ساعت پیش در تهران، محله ستارخان</span>
                                            </div>

                                        </div>
                                        <div className='dvpost-feature align-self-end pb-1 pe-1'>
                                            <FaRegComment />
                                        </div>
                                        {item.imgThumb.length > 0 ? (
                                            <div className='dvpost-thumb'>
                                                <img src={process.env.PUBLIC_URL + "/assets/images/2023/05/13/" + item.imgThumb} />
                                            </div>
                                        ) : (
                                            <div className='dvpost-thumb-placeholder'>
                                                <MdOutlineHideImage />
                                            </div>
                                        )
                                        }

                                    </div>
                                </div>
                            {/* </Link> */}
                        </div>

                    )
                })
            }

        </div>
    );
}

export default CardShow2;