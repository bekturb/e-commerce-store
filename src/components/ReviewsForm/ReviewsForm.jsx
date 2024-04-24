import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postReviewData } from "../../features/getAllReviewSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const ReviewsForm = ({ productId }) => {
    const [star, setStar] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const { postReviewLoading, postReviewError } = useSelector(state => state.allReviewsReducer);
    const { isAuthenticated } = useSelector(state => state.authMe);
    const navigate = useNavigate();

    const submitReview = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate("/login");
            setStar(0)
            setTitle("")
            setComment("")
        } else {
            dispatch(postReviewData({ star, title, comment, productId }));
            setStar(0)
            setTitle("")
            setComment("")
        }
    };

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
                        onChange={(e) => setStar(e.target.value)}
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
                        onChange={(e) => setStar(e.target.value)}
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
                        onChange={(e) => setStar(e.target.value)}
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
                        onChange={(e) => setStar(e.target.value)}
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
                        onChange={(e) => setStar(e.target.value)}
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
                        onChange={(e) => setTitle(e.target.value)}
                        id="title"
                        className="reviews-form__textarea"
                        name="title"
                        value={title}
                    />
                </p>
                <p className="reviews-form__item">
                    <label htmlFor="comment" className="reviews-form__label">
                        Review
                    </label>
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        id="comment"
                        cols="30" rows="10"
                        className="reviews-form__textarea"
                        name="comment"
                        value={comment}
                    />
                    {postReviewError &&
                        <span className="error reviews-form__error">*{postReviewError.message}</span>}
                </p>
                <p className="reviews-form__item">
                    <button
                        type="submit"
                        className="primary-button reviews-form__btn"
                        disabled={postReviewLoading}
                    >
                        {postReviewLoading ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : "Submit Review"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default ReviewsForm;