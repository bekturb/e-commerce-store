import React from 'react';
import {sortData} from "../../customData/sortData";
import useOpenDrop from "../../customHooks/useOpenDrop";
import {useDispatch} from "react-redux";
import {filterProductsActions} from "../../features/productFilterSlice";

const SortByAdvantages = ({productSort}) => {

    const {handleOpenDrop, open} = useOpenDrop();
    const dispatch = useDispatch();

    return (
        <div className={open === "filter" ? "dropdown__sort open" : "dropdown__sort"}>
            <button className="dropdown__button"
                    onClick={() => handleOpenDrop("filter")}>
                <span className="dropdown__select">{productSort}</span>
                {
                    open === "filter" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                }
            </button>
            <div className="dropdown__filter">
                <div className="down">
                    <div className="down__form desktop-hide">
                        <label>
                            <input className="down__input" type="text"/>
                        </label>
                    </div>
                    <ul className="down__list">
                        {
                            sortData?.map((el, idx) => (
                                <li key={idx} className="down__item">
                                    <div className="radio-with-text">
                                        <input
                                            onClick={() => dispatch(filterProductsActions.setProductSort(el.name))}
                                            name="filter"
                                            checked={productSort === el.name}
                                            className="radio-with-text__input"
                                            value={el.name}
                                            type="radio"
                                            id={el.name}
                                        />
                                        <label htmlFor={el.name}
                                               className="radio-with-text__label">
                                                            <span className="radio-with-text__decor">

                                                            </span>
                                            <span className="radio-with-text__text">
                                                            {el.name}
                                                            </span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SortByAdvantages;