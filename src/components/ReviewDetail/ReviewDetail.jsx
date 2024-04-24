import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import EachReview from "../EachReview/EachReview";
import ReviewsForm from "../ReviewsForm/ReviewsForm";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../features/getAllReviewSlice";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";

const ReviewDetail = ({ expand, product, productId }) => {

    const dispatch = useDispatch();
    const { data: reviews, getReviewsLoading, getReviewsError } = useSelector(state => state.allReviewsReducer);

    useEffect(() => {
        dispatch(getReviews(productId))
    }, [])

    // console.log(reviews, "rev");

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
                        <Link
                            to="reviews-form"
                            className="reviews__btn secondary-button"
                            spy={true}
                            smooth={true}
                            offset={1}
                            duration={500}
                        >
                            Write review
                        </Link>
                    </div>
                    {getReviewsLoading ? (
                        <div className="trending__loader">
                            <Loader />
                        </div>
                    ) : getReviewsError ? (
                        <div className="trending__loader">
                            <NotFound error={getReviewsError} />
                        </div>
                    ) : reviews?.length > 0 ? (
                        <div className="reviews__body">
                            <ul className="reviews__info">
                                {
                                    reviews?.map((review, idx) => (
                                        <EachReview key={idx} review={review} />
                                    ))
                                }
                            </ul>
                            <div className="reviews__second-links">
                                <Link className="view-all reviews__view-all" to={`/all-reviews`}>View
                                    all Reviews
                                    <i className="ri-arrow-right-line"></i>
                                </Link>
                            </div>
                        </div>
                    ) : null}
                    <ReviewsForm product={product} />
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;