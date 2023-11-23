import React, {useState} from 'react';
import toast from "react-hot-toast";
import {postReviewData} from "../../features/reviewSlice";
import {useDispatch, useSelector} from "react-redux";

const ReviewsForm = ({product}) => {
    const [review, setReview] = useState({});

    const dispatch = useDispatch();

    const {data, loading, error} = useSelector(state => state.postReview)

    const handleChangeStar = (e) => {
        const {name, value} = e.target;
        setReview({...review, [name]: value, productId: product._id});
    }

    const submitReview = (e) => {
        e.preventDefault();
        dispatch(postReviewData(review));
    };

    if (data) {
        toast.success("Your review saved successfully");
    }

    if (loading) {
        toast.loading("Loading...");
    }

    if (error) {
        toast.error(error.message);
    }

    return (
        <div id="reviews-form" className="reviews-form">
            <h4 className="reviews-form__title">Write a
                review</h4>
            <div className="reviews-form__rating">
                <p className="reviews-form__quest">
                    Are you satisfied enough?
                </p>
                <div className="rate-this">
                    <input
                        onChange={(e) => handleChangeStar(e)}
                        className="rate-this__input"
                        type="radio"
                        name="star"
                        id="star5"
                        value={5}
                    />
                    <label htmlFor="star5"
                           className="rate-this__label"><i
                        className="ri-star-fill"></i></label>

                    <input
                        onChange={(e) => handleChangeStar(e)}
                        className="rate-this__input"
                        type="radio"
                        name="star"
                        id="star4"
                        value={4}
                    />
                    <label htmlFor="star4"
                           className="rate-this__label"><i
                        className="ri-star-fill"></i></label>

                    <input
                        onChange={(e) => handleChangeStar(e)}
                        className="rate-this__input"
                        type="radio"
                        name="star"
                        id="star3"
                        value={3}
                    />
                    <label htmlFor="star3"
                           className="rate-this__label"><i
                        className="ri-star-fill"></i></label>

                    <input
                        onChange={(e) => handleChangeStar(e)}
                        className="rate-this__input"
                        type="radio"
                        name="star"
                        id="star2"
                        value={2}
                    />
                    <label htmlFor="star2"
                           className="rate-this__label"><i
                        className="ri-star-fill"></i></label>

                    <input
                        onChange={(e) => handleChangeStar(e)}
                        className="rate-this__input"
                        type="radio"
                        name="star"
                        id="star1"
                        value={1}
                    />
                    <label htmlFor="star1"
                           className="rate-this__label">
                        <i className="ri-star-fill"></i>
                    </label>
                </div>
            </div>
            <form onSubmit={submitReview}
                  className="reviews-form__form">
                <p className="reviews-form__item">
                    <label
                        htmlFor="title"
                        className="reviews-form__label">
                        Title</label>
                    <input
                        onChange={(e) => handleChangeStar(e)}
                        id="title"
                        className="reviews-form__textarea"
                        name="title"
                        value={review.title}
                    />
                </p>
                <p className="reviews-form__item">
                    <label htmlFor="comment" className="reviews-form__label">
                        Review
                    </label>
                    <textarea
                        onChange={(e) => handleChangeStar(e)}
                        id="comment"
                        cols="30" rows="10"
                        className="reviews-form__textarea"
                        name="comment"
                        value={review.comment}
                    />
                </p>
                <p className="reviews-form__item">
                    <button
                        type="submit"
                        className="primary-button reviews-form__btn"
                    >
                        Submit Review
                    </button>
                </p>
            </form>
        </div>
    );
};

export default ReviewsForm;