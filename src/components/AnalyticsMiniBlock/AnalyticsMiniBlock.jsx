import React from 'react';
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import "./analytics-mini-block.scss";

const AnalyticsMiniBlock = ({ title, loading, error, subtitle, line, currency }) => {

    return (
        <div className="mini-block">
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <NotFound error={error} />
                ) : (
                    <>
                        <div className="mini-block__info">
                            <h2 className="mini-block__title">{currency ? "$" : ""} {title > 0 ? title : 0}</h2>
                            <p className="mini-block__subtitle">{subtitle}</p>
                        </div>
                        <div className="mini-block__statystic-line">
                            <img src={line} alt="Line" />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default AnalyticsMiniBlock;