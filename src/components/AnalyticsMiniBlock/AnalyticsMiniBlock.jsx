import React from 'react';
import  "./analytics-mini-block.scss"

const AnalyticsMiniBlock = ({title, subtitle, line, currency}) => {

    return (
        <div className="mini-block">
            <div className="mini-block__info">
                <h2 className="mini-block__title">{currency ? "$" : ""} {title > 0 ? title : 0}</h2>
                <p className="mini-block__subtitle">{subtitle}</p>
            </div>
            <div className="mini-block__statystic-line">
                <img src={line} alt="Line"/>
            </div>
        </div>
    );
};

export default AnalyticsMiniBlock;