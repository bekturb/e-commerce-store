import React, {useEffect, useState} from 'react';

const EachReview = ({review}) => {

    const [formattedString, setFormattedString] = useState("");

    useEffect(() => {

        const reviewDate = review?.postedDate
        const originalDate = new Date(reviewDate);

        const formattedDateString = `${originalDate.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit',
        })}`;

        setFormattedString(formattedDateString);
    }, [review]);

    return (
        <li className="reviews__item">
            <div className="reviews__form">
                <p className="reviews__owner">Review
                    by {review?.postedBy.lastName}</p>
                <p className="reviews__date mini-text">On {formattedString}
                </p>
            </div>
            <div
                className="reviews__rating content__rating">
                <div className="content__stars">

                </div>
            </div>
            <div className="reviews__title">
                <p className="reviews__title-item">
                    {review.title}
                </p>
            </div>
            <div className="reviews__text">
                <p className="reviews__text-item">
                    {review.comment}
                </p>
            </div>
        </li>
    );
};

export default EachReview;