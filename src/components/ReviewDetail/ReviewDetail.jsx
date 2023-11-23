import React from 'react';
import EachReview from "../EachReview/EachReview";
import ReviewsForm from "../ReviewsForm/ReviewsForm";

const ReviewDetail = ({expand, product, reviews}) => {

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
                    <ReviewsForm product={product}/>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;