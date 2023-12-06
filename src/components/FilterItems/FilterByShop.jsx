import React, {useState} from 'react';
import Search from "../Search/Search";
import useOpenDrop from "../../customHooks/useOpenDrop";
import {useDispatch} from "react-redux";
import {filterProductsActions} from "../../features/productFilterSlice";

const FilterByShop = ({productShop, productsShop, filteredShops, handleSearchShops}) => {

    const [showOtherShops, setShowOtherShops] = useState(false);
    const {handleOpenDrop, open} = useOpenDrop();

    const dispatch = useDispatch();

    return (
        <div
            className={open === "seller" ? "dropdown__sort open" : "dropdown__sort"}>
            <button className="dropdown__button"
                    onClick={() => handleOpenDrop("seller")}>
                <span className="dropdown__select">Seller</span>
                {
                    open === "seller" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                }
            </button>
            {
                productShop.length > 0 && (
                    <span className="dropdown__count">
                                                                {productShop.length}
                                                            </span>
                )
            }
            <div
                className="dropdown__filter">
                <div className="down">
                    {
                        showOtherShops && (
                            <Search onSearch={handleSearchShops}/>
                        )
                    }
                    <ul className="down__list">
                        {
                            filteredShops.slice(0, 7).map(shop => (
                                <li key={shop.id} className="down__item">
                                    <div className="checkbox-with-text">
                                        <input
                                            onChange={() => dispatch(filterProductsActions.setProductShop(shop.id))}
                                            name={shop.name}
                                            checked={productShop.includes(shop.id)}
                                            className="checkbox-with-text__input"
                                            type="checkbox"
                                            value={shop.id}
                                            id={shop.id}
                                        />
                                        <label htmlFor={shop.id}
                                               className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                            <span
                                                className="checkbox-with-text__text">
                                                                                {shop.name}
                                                <span
                                                    className="checkbox-with-text__count">{shop.count}</span>
                                                                                 </span>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                        {
                            showOtherShops && (
                                filteredShops.slice(7).map(shop => (
                                    <li key={shop.id} className="down__item">
                                        <div className="checkbox-with-text">
                                            <input
                                                onChange={() => dispatch(filterProductsActions.setProductShop(shop.id))}
                                                name={shop.name}
                                                checked={productShop.includes(shop.id)}
                                                className="checkbox-with-text__input"
                                                type="checkbox"
                                                value={shop.id}
                                                id={shop.id}
                                            />
                                            <label htmlFor={shop.id}
                                                   className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                                <span
                                                    className="checkbox-with-text__text">
                                                                                {shop.name}
                                                    <span
                                                        className="checkbox-with-text__count">{shop.count}</span>
                                                                                 </span>
                                            </label>
                                        </div>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                    {
                        productsShop.length > 7 && (
                            <button onClick={() => setShowOtherShops(true)}
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

export default FilterByShop;