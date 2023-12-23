import React from 'react';
import "./offer-product.scss"

const RemainingSaleTime = ({remainingTime}) => {
    return (
        <div className="offer one__offer">
            <p className="offer__end">Offer ends at</p>
            <ul className="offer__timeList">
                {
                    remainingTime?.days > 0 ? (
                        <li className="offer__time">{remainingTime?.days}</li>
                    ) : null
                }
                {
                    remainingTime?.hours > 0 ? (
                        <li className="offer__time">{remainingTime?.hours}</li>
                    ) : null
                }
                {
                    remainingTime?.minutes > 0 ? (
                        <li className="offer__time">{remainingTime?.minutes}</li>
                    ) : null
                }
                {
                    remainingTime?.seconds > 0 ? (
                        <li className="offer__time">{remainingTime?.seconds}</li>
                    ) : null
                }
            </ul>
        </div>
    );
};

export default RemainingSaleTime;