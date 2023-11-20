import React from 'react';
import EachReview from "../EachReview/EachReview";

const ReviewDetail = ({expand, product, reviews}) => {

    const handleChangeStar = (e) => {
        const changedRating = e.target.value;
        console.log(changedRating, "rat")
    }

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
                           <span className="reviews__rate">
                               {product?.totalRating}
                           </span>
                            <span className="reviews__sum">{product?.numOfReviews} Reviews</span>
                        </div>
                        <a href="#reviews-form" className="reviews__btn secondary-button">
                            Write review
                        </a>
                    </div>
                    <div className="reviews__body">
                        <ul className="reviews__info">
                            {
                                reviews?.map((review, idx) => (
                                    <EachReview key={idx} review={review}/>
                                ))
                            }
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
                                <input
                                    onClick={(e) => handleChangeStar(e)}
                                    className="rate-this__input"
                                    type="radio"
                                    name="rating"
                                    id="star5"
                                    value={5}
                                />
                                <label htmlFor="star5"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i></label>

                                <input
                                    onClick={(e) => handleChangeStar(e)}
                                    className="rate-this__input"
                                    type="radio"
                                    name="rating"
                                    id="star4"
                                    value={4}
                                />
                                <label htmlFor="star4"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i></label>

                                <input
                                    onClick={(e) => handleChangeStar(e)}
                                    className="rate-this__input"
                                    type="radio"
                                    name="rating"
                                    id="star3"
                                    value={3}
                                />
                                <label htmlFor="star3"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i></label>

                                <input
                                    onClick={(e) => handleChangeStar(e)}
                                    className="rate-this__input"
                                    type="radio"
                                    name="rating"
                                    id="star2"
                                    value={2}
                                />
                                <label htmlFor="star2"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i></label>

                                <input
                                    onClick={(e) => handleChangeStar(e)}
                                    className="rate-this__input"
                                    type="radio"
                                    name="rating"
                                    id="star1"
                                    value={1}
                                />
                                <label htmlFor="star1"
                                       className="rate-this__label"><i
                                    className="ri-star-fill"></i>
                                </label>
                            </div>
                        </div>
                        <form action=""
                              className="reviews-form__form">
                            <p className="reviews-form__item">
                                <label htmlFor=""
                                       className="reviews-form__label">Title</label>
                                <input className="reviews-form__textarea"/>
                            </p>
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