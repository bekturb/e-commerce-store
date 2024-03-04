import React from 'react';
import "./analytic-big-block.scss";
import AreaChartComponent from "../AreaChartComponent/AreaChartComponent";

const AnalyticsBigBlock = () => {
    return (
        <div className="big-block big-block--position">
            <div className="big-block__header">
                <h2 className="big-block__title">Listing Board</h2>
                <span className="big-block__dots">
                    <i className="ri-more-2-line"></i>
                </span>
            </div>
            <div className="big-block__average">
                <ul className="avarege-list">
                    <li className="average-list__item">
                        <div className="average-list__dot"></div>
                        <p className="avarage-list__title">Sale</p>
                    </li>
                    <li className="average-list__item">
                        <div className="average-list__dot average-list__dot_color_green"></div>
                        <p className="average-list__title">Rent</p>
                    </li>
                    <li className="average-list__item">
                        <div className="average-list__dot average-list__dot_color_blue"></div>
                        <p className="average-list__title">Auction</p>
                    </li>
                </ul>
                <div className="big-block__buttons">
                    <button className="big-block__button">
                        Total
                    </button>
                    <button className="big-block__button">
                        Average
                    </button>
                </div>
            </div>
            <div className="big-block__area-chart">
                <AreaChartComponent/>
            </div>
        </div>
    );
};

export default AnalyticsBigBlock;