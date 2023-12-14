import React from 'react';
import "./offer-product.scss"

const RemainingSaleTime = ({remainingTime}) => {
    return (
        <div className="offer one__offer">
            <p className="offer__end">Offer ends at</p>
            <ul className="offer__timeList">
                <li className="offer__time">{remainingTime.days}</li>
                <li className="offer__time">{remainingTime.hours}</li>
                <li className="offer__time">{remainingTime.minutes}</li>
                <li className="offer__time">{remainingTime.seconds}</li>
            </ul>
        </div>
    );
};

export default RemainingSaleTime;