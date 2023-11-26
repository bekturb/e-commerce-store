import React, {useCallback, useEffect, useState} from 'react';
import EachReview from "../EachReview/EachReview";
import ReviewsForm from "../ReviewsForm/ReviewsForm";
import {useDispatch, useSelector} from "react-redux";
import {getReviews} from "../../features/getAllReviewSlice";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import SingleProduct from "../SingleProduct/SingleProduct";
import Features from "../Features/Features";

const ReviewDetail = ({expand, product}) => {

    const dispatch = useDispatch();

    const {data: reviews, loading, error} = useSelector(state => state.allReviewsReducer);

    console.log(reviews, "pro")

    const fetchReviews = useCallback(async () => {
        const productId = product._id
        try {
            dispatch(getReviews(productId));
        }catch (err) {
            alert(err)
        }
    },[dispatch])

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

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
                    {loading ? (
                        <div className="trending__loader">
                            <Loader />
                        </div>
                    ) : error ? (
                        <div className="trending__loader">
                            <NotFound error={error}/>
                        </div>
                    ) : reviews?.length > 0 ? (
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
                    ) : null}
                    <ReviewsForm product={product}/>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;