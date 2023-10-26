import React from 'react';

const StockBar = ({totalQuantity, totalSold}) => {

    const percentageSold = (totalSold / totalQuantity) * 100;

    const barStyle = {
        width: `${percentageSold}%`,
    };

    return (
        <div className="content__stock stock mini-text">
            <div className="stock__qty">
               <span className="qty__span">Stock:
                   <strong className="qty__available">{totalQuantity}</strong>
               </span>
                <span className="qty__span">Sold:
                    <strong className="qty__sold">{totalSold}</strong>
                </span>
            </div>
            <div className="stock__bar bar">
                <div className="bar__available" style={barStyle}></div>
            </div>
        </div>
    );
};

export default StockBar;