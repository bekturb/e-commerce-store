import React, {useState} from 'react';
import Search from "../Search/Search";
import useOpenDrop from "../../customHooks/useOpenDrop";
import {useDispatch} from "react-redux";
import {filterProductsActions} from "../../features/productFilterSlice";

const FilterByCategory = ({categoryCounts, productCategory, filteredCategories, handleSearchCategories}) => {

    const [showOtherCategories, setShowOtherCategories] = useState(false);
    const {handleOpenDrop, open} = useOpenDrop();

    const dispatch = useDispatch();

    return (
        <div
            className={open === "category" ? "dropdown__sort open" : "dropdown__sort"}>
            <button className="dropdown__button"
                    onClick={() => handleOpenDrop("category")}>
                <span className="dropdown__select">Categories</span>
                {
                    open === "category" ?
                        <span className="dropdown__icon">
                           <i className="ri-arrow-down-s-line"></i>
                             </span> : <span className="dropdown__icon">
                           <i className="ri-arrow-up-s-line"></i>
                        </span>
                }
            </button>
            {
                productCategory.length > 0 && (
                    <span className="dropdown__count">
                       {productCategory.length}
                    </span>
                )
            }
            <div
                className="dropdown__filter">
                <div className="down">
                    {
                        showOtherCategories && (
                            <Search onSearch={handleSearchCategories}/>
                        )
                    }
                    <ul className="down__list">
                        {
                            filteredCategories.slice(0, 7).map(cat => (
                                <li key={cat.id} className="down__item">
                                    <div className="checkbox-with-text">
                                        <input
                                            onChange={() => dispatch(filterProductsActions.setProductCategory(cat.id))}
                                            name={cat.name}
                                            checked={productCategory.includes(cat.id)}
                                            className="checkbox-with-text__input"
                                            type="checkbox"
                                            value={cat.id}
                                            id={cat.id}
                                        />
                                        <label htmlFor={cat.id}
                                               className="checkbox-with-text__label">
                                            <span className="checkbox-with-text__decor"></span>
                                            <span className="checkbox-with-text__text">
                                               {cat.name}
                                                <span className="checkbox-with-text__count">{cat.count}</span>
                                            </span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                        {
                            showOtherCategories && (
                                filteredCategories.slice(7).map(cat => (
                                    <li key={cat.id} className="down__item">
                                        <div className="checkbox-with-text">
                                            <input
                                                onChange={() => dispatch(filterProductsActions.setProductCategory(cat.id))}
                                                name={cat.name}
                                                checked={productCategory.includes(cat.id)}
                                                className="checkbox-with-text__input"
                                                type="checkbox"
                                                value={cat.id}
                                                id={cat.id}
                                            />
                                            <label htmlFor={cat.id}
                                                   className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor">
                                                                            </span>
                                                <span
                                                    className="checkbox-with-text__text">
                                                                                {cat.name}
                                                    <span
                                                        className="checkbox-with-text__count">{cat.count}</span>
                                                                                 </span>
                                            </label>
                                        </div>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                    {
                        categoryCounts.length > 7 && (
                            <button onClick={() => setShowOtherCategories(true)}
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

export default FilterByCategory;