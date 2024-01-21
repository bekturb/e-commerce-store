import React, {useState} from 'react';
import Search from "../Search/Search";
import useOpenDrop from "../../customHooks/useOpenDrop";
import {useDispatch} from "react-redux";
import {filterProductsActions} from "../../features/productFilterSlice";

const FilterByColors = ({uniqueColors, productColor, filteredColors, handleSearchColors}) => {

    const [showOtherColors, setShowOtherColors] = useState(false);
    const {handleOpenDrop, open} = useOpenDrop();

    const dispatch = useDispatch();

    return (
        <div
            className={open === "colors" ? "dropdown__sort open" : "dropdown__sort"}>
            <button className="dropdown__button"
                    onClick={() => handleOpenDrop("colors")}>
                <span className="dropdown__select">Colors</span>
                {
                    open === "colors" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                }
            </button>
            {
                productColor.length > 0 && (
                    <span className="dropdown__count">
                      {productColor.length}
                    </span>
                )
            }
            <div
                className="dropdown__filter">
                <div className="down">
                    {
                        showOtherColors && (
                            <Search onSearch={handleSearchColors}/>
                        )
                    }
                    <ul className="down__list">
                        {
                            filteredColors?.slice(0, 7).map((color, idx) => (
                                <li key={idx} className="down__item">
                                    <div className="checkbox-with-text">
                                        <input
                                            onChange={() => dispatch(filterProductsActions.setProductColor(color.name))}
                                            name={color.name}
                                            checked={productColor.includes(color.name)}
                                            className="checkbox-with-text__input"
                                            type="checkbox"
                                            value={color.name}
                                            id={color.name}
                                        />
                                        <label htmlFor={color.name}
                                               className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                            <span
                                                className="checkbox-with-text__text">
                                                                            <span
                                                                                className="checkbox-with-text__circle circle"
                                                                                style={{'--color': `${color.hex}`}}
                                                                            >

                                                                            </span>
                                                {color.name}
                                                <span
                                                    className="checkbox-with-text__count">{color.count}</span>
                                                                                 </span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                        {
                            showOtherColors && (
                                filteredColors?.slice(7).map((color, idx) => (
                                    <li key={idx} className="down__item">
                                        <div className="checkbox-with-text">
                                            <input
                                                onChange={() => dispatch(filterProductsActions.setProductColor(color.name))}
                                                name={color.name}
                                                checked={productColor.includes(color.name)}
                                                className="checkbox-with-text__input"
                                                type="checkbox"
                                                value={color.name}
                                                id={color.name}
                                            />
                                            <label htmlFor={color.name}
                                                   className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                                <span
                                                    className="checkbox-with-text__text">
                                                                            <span
                                                                                className="checkbox-with-text__circle circle"
                                                                                style={{'--color': `${color.hex}`}}
                                                                            >

                                                                            </span>
                                                    {color.name}
                                                    <span
                                                        className="checkbox-with-text__count">{color.count}</span>
                                                                                 </span>
                                            </label>
                                        </div>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                    {
                        uniqueColors.length > 7 && (
                            <button onClick={() => setShowOtherColors(true)}
                                    className="view-all down__view-all">View all
                                <i className="ri-arrow-right-line"></i>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default FilterByColors;