import React from 'react';

const SingleProductStockBar = ({totalSold, totalQuantity}) => {
    const percentageSold = (totalSold / totalQuantity) * 100;

    const barStyle = {
        width: `${percentageSold}%`,
    };
    return (
        <div className="one__stock stock mini-text">
            <div className="stock__qty">
                <span className="qty__span">Stock:
                    <strong
                        className="qty__available">{totalQuantity}
                    </strong>
                </span>
                <span className="qty__span qty__span-color">Sold:
                    <strong
                        className="qty__sold">{totalSold}
                    </strong>
                </span>
            </div>
            <div className="stock__bar one__bar">
                <div className="bar__available bar__available-offer" style={barStyle}></div>
            </div>
        </div>
    );
};

export default SingleProductStockBar;