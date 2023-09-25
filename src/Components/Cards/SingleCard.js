import React from 'react';
import { FaRegComment } from 'react-icons/fa'

const SingleCard = () => {
    return (
       
        <div className='dv-card'>
            <div className='dv-card-border'>
                <div className='dv-post'>
                    <div className='dvpost-info'>
                        <div className='dv-info-title flex-fill'>
                            <h2>خدمات آرماتور بندی و قالب بندی</h2>
                        </div>
                        <div className='dv-info-lists'>
                            <p>در حد نو</p>
                            <p>۳۵٬۰۰۰٬۰۰۰ تومان</p>
                        </div>
                        <div className='dv-info-bottom'>
                            <span className='text-muted'>نیم ساعت پیش در تهران، جنت آباد جنوبی</span>
                        </div>

                    </div>
                    <div className='dvpost-feature align-self-end pb-1 pe-1'>
                        <FaRegComment />
                    </div>
                    <div className='dvpost-thumb'>
                        <img src={process.env.PUBLIC_URL + "/assets/images/2023/AZjVGJEI.webp"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleCard;