import React from 'react';
import {sortData} from "../../customData/sortData";
import "./popup.scss"

const Popup = ({show, setShow, setSortedItem, sortedItem}) => {

    const handleListItem = (value) => {
        setSortedItem(value)
    }

    return (
        <div className={`popup popup-sorting ${show && " slideUp"}`}>
            <div className="content">
                <div className="popup__content">
                    <ul className="popup-sorting__list">
                        {
                            sortData.map((el,idx) => (
                                <li key={idx} onClick={() => handleListItem(el.name)} className={`popup-sorting__item ${sortedItem === el.name && "popup-sorting__item-bg"}`}>
                                    {el.name}
                                </li>
                            ))
                        }
                    </ul>
                    <button onClick={() => setShow(false)} className="popup-sorting__btn popup__btn-main" type="button">Show</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;