import React, {useState} from 'react';
import Search from "../Search/Search";
import useOpenDrop from "../../customHooks/useOpenDrop";
import {useDispatch} from "react-redux";
import {filterProductsActions} from "../../features/productFilterSlice";

const FilterByBrand = ({brandCounts, productBrand, filteredBrands, handleSearchBrands}) => {

    const [showOtherBrands, setShowOtherBrands] = useState(false);
    const {handleOpenDrop, open} = useOpenDrop();

    const dispatch = useDispatch();

    return (
        <div
            className={open === "brands" ? "dropdown__sort open" : "dropdown__sort"}>
            <button className="dropdown__button"
                    onClick={() => handleOpenDrop("brands")}>
                <span className="dropdown__select">Brands</span>
                {
                    open === "brands" ? <span className="dropdown__icon">
                                                                <i className="ri-arrow-down-s-line"></i>
                                                            </span> : <span className="dropdown__icon">
                                                                <i className="ri-arrow-up-s-line"></i>
                                                            </span>
                }
            </button>
            {
                productBrand.length > 0 && (
                    <span className="dropdown__count">
                                                                {productBrand.length}
                                                            </span>
                )
            }
            <div
                className="dropdown__filter">
                <div className="down">
                    {
                        showOtherBrands && (
                            <Search onSearch={handleSearchBrands}/>
                        )
                    }
                    <ul className="down__list">
                        {
                            filteredBrands.slice(0, 7).map(brand => (
                                <li key={brand.id} className="down__item">
                                    <div className="checkbox-with-text">
                                        <input
                                            onChange={() => dispatch(filterProductsActions.setProductBrand(brand.id))}
                                            name={brand.name}
                                            checked={productBrand.includes(brand.id)}
                                            className="checkbox-with-text__input"
                                            type="checkbox"
                                            value={brand.id}
                                            id={brand.id}
                                        />
                                        <label htmlFor={brand.id}
                                               className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                            <span
                                                className="checkbox-with-text__text">
                                                                                {brand.name}
                                                <span
                                                    className="checkbox-with-text__count">{brand.count}</span>
                                                                                 </span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                        {
                            showOtherBrands && (
                                filteredBrands.slice(7).map(brand => (
                                    <li key={brand.id} className="down__item">
                                        <div className="checkbox-with-text">
                                            <input
                                                onChange={() => dispatch(filterProductsActions.setProductBrand(brand.id))}
                                                name={brand.name}
                                                checked={productBrand.includes(brand.id)}
                                                className="checkbox-with-text__input"
                                                type="checkbox"
                                                value={brand.id}
                                                id={brand.id}
                                            />
                                            <label htmlFor={brand.id}
                                                   className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor">
                                                                            </span>
                                                <span
                                                    className="checkbox-with-text__text">
                                                                                {brand.name}
                                                    <span
                                                        className="checkbox-with-text__count">{brand.count}</span>
                                                                                 </span>
                                            </label>
                                        </div>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                    {
                        brandCounts.length > 7 && (
                            <button onClick={() => setShowOtherBrands(true)}
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

export default FilterByBrand;