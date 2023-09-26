import { Breadcrumb, Button, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import { BsBookmark, BsShare } from "react-icons/bs";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "./SingleAd.css"

const SingleAd = () => {

    const breadcrumb_list = ["املاک", "فروش مسکونی", "آپارتمان", "سعادت آباد ۱۴۵ متر فول دید مشجر ۲ پارکینگ"]

    const images = [
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.jpg`,
            thumbnailClass :"thumbnail-class"
        },
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.1.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.1.jpg`,
            thumbnailClass :"thumbnail-class"
        },
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.2.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.2.jpg`,
            thumbnailClass :"thumbnail-class"
        },
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.3.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.3.jpg`,
            thumbnailClass :"thumbnail-class"
        },
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.4.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.4.jpg`,
            thumbnailClass :"thumbnail-class"
        },
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.5.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.5.jpg`,
            thumbnailClass :"thumbnail-class"
        },
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.7.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.7.jpg`,
            thumbnailClass :"thumbnail-class"
        },
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.8.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.8.jpg`,
            thumbnailClass :"thumbnail-class"
        },
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.9.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.9.jpg`,
            thumbnailClass :"thumbnail-class"
        },
        {
            original: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.10.jpg`,
            thumbnail: `${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.10.jpg`,
            thumbnailClass :"thumbnail-class"
        },
    ];

    return (
        <Layout>
            <Container>
                <Row className="py-3">
                    <div className="col-12">

                        <Breadcrumb>
                            {breadcrumb_list.map((list, index) => {
                                return <Breadcrumb.Item active={index === breadcrumb_list.length - 1 ? true : false} href="#">{list}</Breadcrumb.Item>
                            })}
                        </Breadcrumb>

                    </div>
                </Row>
                <Row>
                    <div className="col-sm-6 pe-4">
                        <h1 className="display-6 font-weight-bold" style={{ fontWeight: "500" }}>{breadcrumb_list[breadcrumb_list.length - 1]}</h1>
                        <h6 className="my-3 pavaraghi">دقایقی پیش در تهران، سعادت‌آباد، خیابان علامه شمالی</h6>

                        <div className="mt-5 w-100 d-flex justify-content-between">
                            <div>
                                <Button variant="danger" className="sa-btn-ads right me-2">اطلاعات تماس</Button>
                                <Button variant="light" className="sa-btn-ads left">چت</Button>
                            </div>
                            <div className="sa-icons">
                                <BsBookmark />
                                <BsShare />
                            </div>
                        </div>


                        <div className="mt-4">

                            <div className="d-flex flex-row justify-content-evenly sa-colinfobox">
                                <div className="d-flex flex-column sa-colinfo">
                                    <p>متراژ</p>
                                    <p>69</p>
                                </div>
                                <div className="d-flex flex-column sa-colinfo">
                                    <p>ساخت</p>
                                    <p>1402</p>
                                </div>
                                <div className="d-flex flex-column sa-colinfo">
                                    <p>اتاق</p>
                                    <p>2</p>
                                </div>
                            </div>

                            <hr className="info-divider" />
                            <div className="sa-info-rows py-2">
                                <p>قیمت کل</p>
                                <p>۱۱٬۷۰۰٬۰۰۰٬۰۰۰ تومان</p>
                            </div>
                            <hr className="info-divider" />
                            <div className="sa-info-rows py-2">
                                <p>قیمت هر متر</p>
                                <p>۹۷٬۵۰۰٬۰۰۰ تومان</p>
                            </div>
                            <hr className="info-divider" />
                            <div className="sa-info-rows py-2">
                                <p>آژانس املاک</p>
                                <p>واحدی</p>
                            </div>
                            <hr className="info-divider" />
                            <div className="sa-info-rows py-2">
                                <p>طبقه</p>
                                <p>6</p>
                            </div>
                            <hr className="info-divider" />
                        </div>


                        <div className="mt-4 sa-desc">
                            <h6>توضیحات</h6>
                            <samp>
                                ⚘️⚘️به بهترین ها فکر کنید ، خوش آمدید

                                ⚘️⚘️بهترین جا برای سرمایه‌گذاری....
                                ⚘️⚘️به چشم میتوانید رشد و پیشرفت را ببینید



                                ⭐️⭐️۲خوابه
                                ⭐️⭐️قابلیت وام ۳۲۰میلیون
                                ⭐️⭐️قابلیت رهن ۳۰۰میلیون
                                ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️
                                ⭐️⭐️سند تک برگ آماده
                                ⭐️⭐️نزدیک مترو
                                ⭐️⭐️محیطی آرام و ساکت
                                ⭐️⭐️موقعیت مکانی عالی
                                ⭐️⭐️مشاعات عالی
                                ⭐️⭐️مدارک کامل
                                ⭐️⭐️امتیازات کامل

                                ⚘️⚘️قیمت مناسب ترین فایل ها را از ما بخواهید

                                ⚘️⚘️پیدا کردن ملک دلخواه شما تخصص ماست

                                ⚘️⚘️ملک رویایی شما در اندیشه ماست
                            </samp>
                        </div>

                    </div>

                    <div className="col-sm-6" style={{direction:"ltr"}}>
                        {/* <img src={`${process.env.PUBLIC_URL}/assets/images/2023/05/14/AZ7mtYuL.4.jpg`} /> */}
                        <ImageGallery
                            items={images}
                            showPlayButton={false}
                            infinite={true}
                            showBullets={true}
                            isRTL={false}
                        />
                    </div>
                </Row>
            </Container>
        </Layout>
    );
}

export default SingleAd;