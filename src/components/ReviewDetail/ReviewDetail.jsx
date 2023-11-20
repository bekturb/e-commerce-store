import React from 'react';

const ReviewDetail = ({expand}) => {
    return (
        <div
            className={expand === "review" ? "content description__content description__content-display" : "content description__content"}>
            <div className="reviews__review">
                <h4 className="reviews__main-title">
                    Customer Reviews
                </h4>
                <div className="reviews__block">
                    <div className="reviews__head">
                        <div className="flexitem">
                           <span
                               className="reviews__rate">4.9
                           </span>
                            <span className="reviews__sum">2,251 Reviews</span>
                        </div>
                        <a href="#reviews-form" className="reviews__btn secondary-button">
                            Write review
                        </a>
                    </div>
                    <div className="reviews__body">
                        <ul className="reviews__info">
                            <li className="reviews__item">
                                <div className="reviews__form">
                                    <p className="reviews__owner">Review
                                        by Sarah</p>
                                    <p className="reviews__date mini-text">On
                                        7/7/22</p>
                                </div>
                                <div
                                    className="reviews__rating content__rating">
                                    <div className="content__stars">

                                    </div>
                                </div>
                                <div className="reviews__title">
                                    <p className="reviews__title-item">
                                        Awesome Product
                                    </p>
                                </div>
                                <div className="reviews__text">
                                    <p className="reviews__text-item">
                                        Lorem ipsum dolor sit amet,
                                        consectetur adipisicing
                                        elit. Alias aspernatur atque
                                        commodi consequuntur
                                        distinctio ducimus esse
                                        excepturi explicabo harum
                                        inventore, iusto magnam
                                        nesciunt nihil quas quis quo
                                        recusandae reprehenderit
                                        voluptas!
                                    </p>
                                </div>
                            </li>
                            <li className="reviews__item">
                                <div className="reviews__form">
                                    <p className="reviews__owner">Review
                                        by Sarah</p>
                                    <p className="reviews__date mini-text">On
                                        7/7/22</p>
                                </div>
                                <div
                                    className="reviews__rating content__rating">
                                    <div className="content__stars">

                                    </div>
                                </div>
                                <div className="reviews__title">
                                    <p className="reviews__title-item">Awesome
                                        Product</p>
                                </div>
                                <div className="reviews__text">
                                    <p className="reviews__text-item">
                                        Lorem ipsum dolor sit amet,
                                        consectetur adipisicing
                                        elit. Alias aspernatur atque
                                        commodi consequuntur
                                        distinctio ducimus esse
                                        excepturi explicabo harum
                                        inventore, iusto magnam
                                        nesciunt nihil quas quis quo
                                        recusandae reprehenderit
                                        voluptas!
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <div className="reviews__second-links">
                            <a href=""
                               className="view-all reviews__view-all">View
                                all Reviews <i
                                    className="ri-arrow-right-line"></i></a>
                        </div>
                    </div>
                    <div id="reviews-form" className="reviews-form">
                        <h4 className="reviews-form__title">Write a
                            review</h4>
                        <div className="reviews-form__rating">
                            <p className="reviews-form__quest">
                                Are you satisfied enough?
                            </p>
                            <div className="rate-this">
                                <input className="rate-this__input"
                                       type="radio" name="rating"
                                       id="star5"/>
                                <label htmlFor="star5"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i></label>

                                <input className="rate-this__input"
                                       type="radio" name="rating"
                                       id="star4"/>
                                <label htmlFor="star4"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i></label>

                                <input className="rate-this__input"
                                       type="radio" name="rating"
                                       id="star3"/>
                                <label htmlFor="star3"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i></label>

                                <input className="rate-this__input"
                                       type="radio" name="rating"
                                       id="star2"/>
                                <label htmlFor="star2"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i></label>

                                <input className="rate-this__input"
                                       type="radio" name="rating"
                                       id="star1"/>
                                <label htmlFor="star1"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i></label>
                            </div>
                        </div>
                        <form action=""
                              className="reviews-form__form">
                            <p className="reviews-form__item">
                                <label htmlFor=""
                                       className="reviews-form__label">Review</label>
                                <textarea cols="30" rows="10"
                                          className="reviews-form__textarea"/>
                            </p>
                            <p className="reviews-form__item">
                                <a href=""
                                   className="primary-button">Submit
                                    Review</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;