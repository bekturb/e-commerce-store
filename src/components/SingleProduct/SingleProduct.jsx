import React, {useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Thumbs, FreeMode} from "swiper";
import {SRLWrapper} from "simple-react-lightbox"
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import image1 from "../../assets/products/shoe1.jpg";
import image2 from "../../assets/products/shoe1-1.jpg";
import image3 from "../../assets/products/shoe1-2.jpg";
import image4 from "../../assets/products/shoe1-3.jpg";
import "./single-product.scss";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const SingleProduct = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [expand, setExpand] = useState("info");

    return (
        <>
            <div className="single-product">
                <div className="container">
                    <div className="single-product__wrapper">
                        <Breadcrumb/>
                        <div className="column">
                            <div className="products one">
                                <div className="flexwrap">
                                    <div className="one__row row">
                                        <div className="products__item one__item one__item-sticky">
                                            <div className="one__price">
                                        <span className="one__discount">
                                            32%
                                            <br/>
                                            OFF
                                        </span>
                                            </div>
                                            <div className="one__big-image big-image">
                                                <SRLWrapper>
                                                    <Swiper
                                                        loop={true}
                                                        autoHeight={true}
                                                        spaceBetween={10}
                                                        navigation={true}
                                                        thumbs={{swiper: thumbsSwiper}}
                                                        modules={[FreeMode, Navigation, Thumbs]}
                                                        className="mySwiper2"
                                                    >
                                                        <SwiperSlide>
                                                            <div className="big-image__wrapper">
                                                                <div className="big-image__show">
                                                                    <a href={image1} className="big-image__link">
                                                                        <img className="big-image__img img" src={image1}
                                                                             alt=""/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="big-image__wrapper">
                                                                <div className="big-image__show">
                                                                    <a href={image2} className="big-image__link">
                                                                        <img className="big-image__img img" src={image2}
                                                                             alt=""/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="big-image__wrapper">
                                                                <div className="big-image__show">
                                                                    <a href={image3} className="big-image__link">
                                                                        <img className="big-image__img img" src={image3}
                                                                             alt=""/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <div className="big-image__wrapper">
                                                                <div className="big-image__show">
                                                                    <a href={image4} className="big-image__link">
                                                                        <img className="big-image__img img" src={image4}
                                                                             alt=""/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    </Swiper>
                                                </SRLWrapper>
                                            </div>

                                            <div className="one__small-image small-image">
                                                <ul className="small-image__wrapper">
                                                    <Swiper
                                                        onSwiper={setThumbsSwiper}
                                                        loop={true}
                                                        spaceBetween={10}
                                                        slidesPerView={3}
                                                        freeMode={true}
                                                        watchSlidesProgress={true}
                                                        breakpoints={{
                                                            451: {
                                                                spaceBetween: 32
                                                            }
                                                        }}
                                                        modules={[FreeMode, Navigation, Thumbs]}
                                                        className="mySwiper"
                                                    >
                                                        <SwiperSlide>
                                                            <li className="small-image__show">
                                                                <img className="small-image__img img" src={image1}
                                                                     alt=""/>
                                                            </li>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <li className="small-image__show">
                                                                <img className="small-image__img img" src={image2}
                                                                     alt=""/>
                                                            </li>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <li className="small-image__show">
                                                                <img className="small-image__img img" src={image3}
                                                                     alt=""/>
                                                            </li>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <li className="small-image__show">
                                                                <img className="small-image__img img" src={image4}
                                                                     alt=""/>
                                                            </li>
                                                        </SwiperSlide>
                                                    </Swiper>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="one__row row">
                                        <div className="one__item">
                                            <h1 className="one__name">
                                                Men Slip On Shoes Casual with Arch Support Insoles
                                            </h1>
                                            <div className="one__content content">
                                                <div className="content__rating one__rating">
                                                    <div className="content__stars one__stars"></div>
                                                    <a className="one__num-review mini-text" href="">2,251</a>
                                                    <a href="" className="one__add-review mini-text">Add Your Review</a>
                                                </div>
                                                <div className="one__stock-squ stock-squ">
                                                    <span className="stock-squ__available">In Stock </span>
                                                    <span className="stock-squ__squ mini-text">
                                                        SQU-881
                                                    </span>
                                                </div>
                                                <div className="price one__price">
                                                    <span className="price__current one__current">
                                                        $80.90
                                                    </span>
                                                    <span className="price__old">
                                                        $119.90
                                                    </span>
                                                </div>
                                                <div className="colors">
                                                    <p className="colors__title">Color</p>
                                                    <div className="colors__variants">
                                                        <form className="colors__form" action="">
                                                            <p className="colors__variant">
                                                                <input className="colors__input" type="radio" name="color" id="cogrey"/>
                                                                <label htmlFor="cogrey" className="colors__circle circle"></label>
                                                            </p>
                                                            <p className="colors__variant">
                                                                <input className="colors__input" type="radio" name="color" id="coblue"/>
                                                                <label htmlFor="coblue" className="colors__circle circle"></label>
                                                            </p>
                                                            <p className="colors__variant">
                                                                <input className="colors__input" type="radio" name="color" id="cogreen"/>
                                                                <label htmlFor="cogreen" className="colors__circle circle"></label>
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="sizes">
                                                    <p className="sizes__title">Size</p>
                                                    <div className="sizes__variants">
                                                        <form className="sizes__form" action="">
                                                            <p className="sizes__variant">
                                                                <input className="sizes__input" type="radio" name="size" id="size-41"/>
                                                                <label htmlFor="size-41" className="sizes__circle circle"><span className="sizes__number">41</span></label>
                                                            </p>
                                                            <p className="sizes__variant">
                                                                <input className="colors__input" type="radio" name="size" id="size-42"/>
                                                                <label htmlFor="size-42" className="sizes__circle circle"><span className="sizes__number">42</span></label>
                                                            </p>
                                                            <p className="sizes__variant">
                                                                <input className="colors__input" type="radio" name="size" id="size-43"/>
                                                                <label htmlFor="size-43" className="sizes__circle circle"><span className="sizes__number">43</span></label>
                                                            </p>
                                                            <p className="sizes__variant">
                                                                <input className="colors__input" type="radio" name="size" id="size-44"/>
                                                                <label htmlFor="size-44" className="sizes__circle circle"><span className="sizes__number">44</span></label>
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="actions">
                                                    <div className="actions__qty-control flexitem">
                                                        <button className="actions__minus circle">-</button>
                                                        <input className="actions__input" type="text" value="1"/>
                                                        <button className="actions__plus circle">+</button>
                                                    </div>
                                                    <div className="actions__button-cart">
                                                        <button className="actions__btn primary-button">
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                    <div className="wish-share">
                                                        <ul className="flexitem wish-share__second-links">
                                                            <li className="wish-share__link-list">
                                                                <a className="wish-share__link" href="">
                                                                        <span className="icon-lg">
                                                                            <i className="ri-heart-line"></i>
                                                                        </span>
                                                                    <span>Wishlist</span>
                                                                </a>
                                                            </li>
                                                            <li className="wish-share__link-list">
                                                                <a className="wish-share__link" href="">
                                                                        <span className="icon-lg">
                                                                            <i className="ri-share-line"></i>
                                                                        </span>
                                                                    <span>Share</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="description">
                                                    <ul className="description__list">
                                                        <li className="description__item child">
                                                            <div className={expand === "info" ? "description__link description__link-minus" : "description__link"} onClick={expand === "info" ? () => setExpand("") : () => setExpand("info")}>Information</div>
                                                            <ul className={expand === "info" ? "content description__content description__content-display" : "content description__content"}>
                                                                <li className="description__brand">
                                                                    <span className="description__brand-title">Brands</span>
                                                                    <span className="description__brand-name">Nike</span>
                                                                </li>
                                                                <li className="description__brand">
                                                                    <span className="description__brand-title">Activity</span>
                                                                    <span className="description__brand-name">Running</span>
                                                                </li>
                                                                <li className="description__brand">
                                                                    <span className="description__brand-title">Material</span>
                                                                    <span className="description__brand-name">Fleece</span>
                                                                </li>
                                                                <li className="description__brand">
                                                                    <span className="description__brand-title">Gender</span>
                                                                    <span className="description__brand-name">Men</span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="description__item child">
                                                            <div className={expand === "detail" ? "description__link description__link-minus" : "description__link"} onClick={expand === "detail" ? () => setExpand("") : () => setExpand("detail")}>Details</div>
                                                            <div className={expand === "detail" ? "content description__content description__content-display" : "content description__content"}>
                                                                <p className="description__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab enim itaque minus mollitia non vel.</p>
                                                                <p className="description__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consectetur, cupiditate iusto molestias nobis omnis pariatur sit tenetur? Alias animi, beatae deleniti nulla quod voluptates?</p>
                                                            </div>
                                                        </li>
                                                        <li className="description__item reviews">
                                                            <div className={expand === "review" ? "description__link description__link-minus icon-sm" : "description__link icon-sm"} onClick={expand === "review" ? () => setExpand("") : () => setExpand("review")}>
                                                                    Reviews
                                                                <span className="reviews__number mini-text">
                                                                    2.2k
                                                                </span>
                                                            </div>
                                                            <div className={expand === "review" ? "content description__content description__content-display" : "content description__content"}>
                                                                <div className="reviews__review">
                                                                    <h4 className="reviews__main-title">
                                                                        Customer Reviews
                                                                    </h4>
                                                                    <div className="reviews__block">
                                                                        <div className="reviews__head">
                                                                            <div className="flexitem">
                                                                                <span className="reviews__rate">4.9</span>
                                                                                <span className="reviews__sum">2,251 Reviews</span>
                                                                            </div>
                                                                            <a href="#reviews-form" className="reviews__btn secondary-button">Write review</a>
                                                                        </div>
                                                                        <div className="reviews__body">
                                                                            <ul className="reviews__info">
                                                                                <li className="reviews__item">
                                                                                    <div className="reviews__form">
                                                                                        <p className="reviews__owner">Review by Sarah</p>
                                                                                        <p className="reviews__date mini-text">On 7/7/22</p>
                                                                                    </div>
                                                                                    <div className="reviews__rating content__rating">
                                                                                        <div className="content__stars">

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="reviews__title">
                                                                                        <p className="reviews__title-item">Awesome Product</p>
                                                                                    </div>
                                                                                    <div className="reviews__text">
                                                                                        <p className="reviews__text-item">
                                                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur atque commodi consequuntur distinctio ducimus esse excepturi explicabo harum inventore, iusto magnam nesciunt nihil quas quis quo recusandae reprehenderit voluptas!
                                                                                        </p>
                                                                                    </div>
                                                                                </li>
                                                                                <li className="reviews__item">
                                                                                    <div className="reviews__form">
                                                                                        <p className="reviews__owner">Review by Sarah</p>
                                                                                        <p className="reviews__date mini-text">On 7/7/22</p>
                                                                                    </div>
                                                                                    <div className="reviews__rating content__rating">
                                                                                        <div className="content__stars">

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="reviews__title">
                                                                                        <p className="reviews__title-item">Awesome Product</p>
                                                                                    </div>
                                                                                    <div className="reviews__text">
                                                                                        <p className="reviews__text-item">
                                                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur atque commodi consequuntur distinctio ducimus esse excepturi explicabo harum inventore, iusto magnam nesciunt nihil quas quis quo recusandae reprehenderit voluptas!
                                                                                        </p>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                            <div className="reviews__second-links">
                                                                                <a href="" className="view-all reviews__view-all">View all Reviews <i className="ri-arrow-right-line"></i></a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="reviews-form">
                                                                            <h4 className="reviews-form__title">Write a review</h4>
                                                                            <div className="reviews-form__rating">
                                                                                <p className="reviews-form__quest">
                                                                                    Are you satisfied enough?
                                                                                </p>
                                                                                <div className="rate-this">
                                                                                    <input className="rate-this__input" type="radio" name="rating" id="star5"/>
                                                                                    <label htmlFor="star5" className="rate-this__label"><i className="ri-star-fill"></i></label>

                                                                                    <input className="rate-this__input" type="radio" name="rating" id="star4"/>
                                                                                    <label htmlFor="star4" className="rate-this__label"><i className="ri-star-fill"></i></label>

                                                                                    <input className="rate-this__input" type="radio" name="rating" id="star3"/>
                                                                                    <label htmlFor="star3" className="rate-this__label"><i className="ri-star-fill"></i></label>

                                                                                    <input className="rate-this__input" type="radio" name="rating" id="star2"/>
                                                                                    <label htmlFor="star2" className="rate-this__label"><i className="ri-star-fill"></i></label>

                                                                                    <input className="rate-this__input" type="radio" name="rating" id="star1"/>
                                                                                    <label htmlFor="star1" className="rate-this__label"><i className="ri-star-fill"></i></label>
                                                                                </div>
                                                                            </div>
                                                                            <form action="" className="reviews-form__form">
                                                                                <p className="reviews-form__item">
                                                                                    <label htmlFor="" className="reviews-form__label">Review</label>
                                                                                    <textarea cols="30" rows="10" className="reviews-form__textarea"/>
                                                                                </p>
                                                                                <p className="reviews-form__item">
                                                                                    <a href="" className="primary-button">Submit Review</a>
                                                                                </p>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;