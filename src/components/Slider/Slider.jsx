import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper";
import {useDispatch, useSelector} from "react-redux";
import NotFound from "../NotFound/NotFound";
import "./slider.scss"
import "swiper/css";
import "swiper/css/pagination";
import Skeleton from "react-loading-skeleton";

const Slider = () => {

    const dispatch = useDispatch();
    const {data: pages, loading, error} = useSelector(state => state.pages);

    return (
        loading ? (
            <div className="container">
                <Skeleton width={`${100}%`} height={400}/>
            </div>
            ) :
            <div className="slider">
            <div className="container">
                <div className="slider__wrapper">
                    {
                        error ? (
                            <div className="mySlider">
                                <div className="mySlider__wrapper">
                                    <div className="slider__slide">
                                        <div className="slider__item">
                                            <NotFound error={error}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : pages?.length > 0 ? (
                            <Swiper pagination={{clickable: true,}}
                                    modules={[Autoplay, Pagination]}
                                    loop={true}
                                    autoplay={true}
                                    className="mySwiper">
                                {
                                    pages?.map(page => (
                                        <SwiperSlide key={page._id}>
                                            <div className="mySlider">
                                                <div className="mySlider__wrapper">
                                                    <div className="slider__slide">
                                                        <div className="slider__item">
                                                            <div className="slider__image">
                                                                <img className="slider__img" src={page.banner} alt=""/>
                                                            </div>
                                                            <div className="slider__content text--content">
                                                                <h4 className="slider__text">{page.suggestion}</h4>
                                                                <h2 className="slider__suggestion title">
                                                                    <span className="slider__subtitle">{page.title}</span>
                                                                    <br/>
                                                                    <span className="slider__advert">{page.description}</span>
                                                                </h2>
                                                                <Link to={page.navigateTo} className="primary-button">Shop
                                                                    Now</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        ) : <div>Not Found</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Slider;