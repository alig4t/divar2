import React from 'react';
// import SingleCard from './SingleCard';
import { FaRegComment } from 'react-icons/fa'

import Ads from "./ads.json"
const Cards = () => {
    return (
        <div className='d-flex flex-wrap'>
            {
                Ads.map((item) => {
                    return (
                        <div className='dv-card' key={item.id}>
                            <div className='dv-card-border'>
                                <div className='dv-post'>
                                    <div className='dvpost-info'>
                                        <div className='dv-info-title flex-fill'>
                                            <h2>{item.title}</h2>
                                        </div>
                                        <div className='dv-info-lists'>
                                            {/* <p>در حد نو</p> */}
                                            {/* <p>۳۵٬۰۰۰٬۰۰۰ تومان</p>
                            <p>۳۵٬۰۰۰٬۰۰۰ تومان</p> */}
                                            {item.features.map((feature,index) => {
                                                return (
                                                    <p key={index}>
                                                        {feature.title + " : " + feature.value + " تومان "}
                                                    </p>
                                                )
                                            })}
                                        </div>
                                        <div className='dv-info-bottom'>
                                            <span className='text-muted'>نیم ساعت پیش در تهران، جنت آباد جنوبی</span>
                                        </div>

                                    </div>
                                    <div className='dvpost-feature align-self-end pb-1 pe-1'>
                                        <FaRegComment />
                                    </div>
                                    <div className='dvpost-thumb'>
                                        <img src={process.env.PUBLIC_URL + "/assets/images/2023/05/13/" + item.imgThumb} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {/* <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard />
            <SingleCard /> */}
        </div>
    );
}

export default Cards;