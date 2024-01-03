import React from 'react';
import {sortData} from "../../customData/sortData";
import "./popup.scss"
import {filterProductsActions} from "../../features/productFilterSlice";
import {useDispatch, useSelector} from "react-redux";

const Popup = ({show, setShow}) => {

    const {productSort} = useSelector(state => state.filterProducts);

    const dispatch = useDispatch();

    return (
        <div className={`popup popup-sorting ${show && " slideUp"}`}>
            <div className="content">
                <div className="popup__content">
                    <ul className="popup-sorting__list">
                        {
                            sortData.map((el,idx) => (
                                <li key={idx} onClick={() => dispatch(filterProductsActions.setProductSort(el.name))} className={`popup-sorting__item ${productSort === el.name && "popup-sorting__item-bg"}`}>
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