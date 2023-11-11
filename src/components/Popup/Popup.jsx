import React from 'react';
import "./popup.scss"

const Popup = ({show}) => {

    return (
        <div className={`popup popup-sorting ${show && " slideUp"}`}>
            <div className="content">
                <div className="popup__content">
                    <ul className="popup-sorting__list">
                        <li className="popup-sorting__item">
                            Popularity
                        </li>
                        <li className="popup-sorting__item">
                            Ascending Price
                        </li>
                        <li className="popup-sorting__item">
                            Descending Price
                        </li>
                        <li className="popup-sorting__item">
                            New
                        </li>
                        <li className="popup-sorting__item">
                            Rating
                        </li>
                    </ul>
                    <button className="popup-sorting__btn popup__btn-main" type="button">Show</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;