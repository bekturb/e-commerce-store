import React, {useState} from 'react';
import Search from "../Search/Search";
import "./filter-mobile.scss";
import {useDispatch, useSelector} from "react-redux";
import {filterProductsActions} from "../../features/productFilterSlice";

const FiltersMobile = ({
                           categoryProducts,
                           setShowMobileFilter,
                           showMobileFilter,
                           filteredColors,
                           filteredBrands,
                           filteredShops,
                           brandCounts,
                           uniqueColors,
                           productsShop,
                           handleSearchBrands,
                           handleSearchColors,
                           handleSearchShops,
                       }) => {

    const [showAllBrands, setShowAllBrands] = useState(false);
    const [showAllColors, setShowAllColors] = useState(false);
    const [showAllShops, setShowAllShops] = useState(false);

    const dispatch = useDispatch();

    const {productBrand, productColor, productMinPrice, productMaxPrice, productShop} = useSelector(state => state.filterProducts);

    const handleChangeMinPrice = (val) => {
        dispatch(filterProductsActions.setProductMinPrice(val))
    }

    const handleChangeMaxPrice = (val) => {
        dispatch(filterProductsActions.setProductMaxPrice(val))
    }

    const handleSubmitAll = () => {
        setShowMobileFilter(false)
    }

    return (
        <div className={showMobileFilter ? "filters-mobile show" : "filters-mobile"}>
            <div className="filters-mobile__wrapper">
                <div className="filters-mobile__container">
                    <div className="filters-mobile__header">
                        <h3 className="filters-mobile__title">Filter</h3>
                        <div className="filters-mobile__buttons">
                            <button className="filters-mobile__reset-btn">Reset</button>
                            <button onClick={() => setShowMobileFilter(false)}
                                    className="filters-mobile__close-btn"></button>
                        </div>
                    </div>
                    <div className="filters-mobile__list">
                        <div className="filters-mobile__item">
                            <div className="filters-mobile__item-head">
                                <h3 className="filters-mobile__item-title">Price</h3>
                            </div>
                            <div className="filter-fill">
                                <div className="filter-fill__price">
                                    <div className="filter-fill__price-item">
                                        <h3 className="filter-fill__price-title">
                                            From
                                        </h3>
                                        <Search onSearch={handleChangeMinPrice} value={productMinPrice}/>
                                    </div>
                                    <div className="filter-fill__price-item">
                                        <h3 className="filter-fill__price-title">
                                            To
                                        </h3>
                                        <Search onSearch={handleChangeMaxPrice} value={productMaxPrice}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            brandCounts?.length > 0 && (
                                <div className="filters-mobile__item">
                                    <div className="filters-mobile__item-head">
                                        <h3 className="filters-mobile__item-title">Brand</h3>
                                        <button className="filters-mobile__reset-btn">Reset</button>
                                        {
                                            brandCounts?.length > 7 && (
                                                <button onClick={() => setShowAllBrands(true)}
                                                        className="filters-mobile__btn-cat">All
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className="filter-fill">
                                        <div className="down">
                                            {
                                                showAllBrands && (
                                                    <Search onSearch={handleSearchBrands}/>
                                                )
                                            }
                                            {
                                                showAllBrands ? (
                                                    <ul className="down__list">
                                                        {
                                                            showAllBrands && (
                                                                filteredBrands.map(brand => (
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
                                                                                <span className="checkbox-with-text__text">
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
                                                ) : (
                                                    <ul className="filter-fill__slide">
                                                        {
                                                            filteredBrands?.slice(0, 5).map(brand => (
                                                                <li key={brand.id} className="filter-fill__slide-item">
                                                                    <button
                                                                        onClick={() => dispatch(filterProductsActions.setProductBrand(brand.id))}
                                                                        className={`filter-fill__slide-btn ${
                                                                            productBrand.includes(brand.id) ? 'selected' : ''}`}
                                                                        value={brand.id}
                                                                    >
                                                                        {brand.name}
                                                                        <span className="filter-fill__slide-count">
                                                                            {brand.count}
                                                                        </span>
                                                                    </button>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            uniqueColors?.length > 0 && (
                                <div className="filters-mobile__item">
                                    <div className="filters-mobile__item-head">
                                        <h3 className="filters-mobile__item-title">Color</h3>
                                        <button className="filters-mobile__reset-btn">Reset</button>
                                        {
                                            uniqueColors?.length > 7 && (
                                                <button onClick={() => setShowAllColors(true)}
                                                        className="filters-mobile__btn-cat">All
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className="filter-fill">
                                        <div className="down">
                                            {
                                                showAllColors && (
                                                    <Search onSearch={handleSearchColors}/>
                                                )
                                            }
                                            {
                                                showAllColors ? (
                                                    <ul className="down__list">
                                                        {
                                                            showAllColors && (
                                                                filteredColors.map((color, idx) => (
                                                                    <li key={idx} className="down__item">
                                                                        <div className="checkbox-with-text">
                                                                            <input
                                                                                onChange={() => dispatch(filterProductsActions.setProductColor(color.color))}
                                                                                name={color.color}
                                                                                checked={productColor.includes(color.color)}
                                                                                className="checkbox-with-text__input"
                                                                                type="checkbox"
                                                                                value={color.color}
                                                                                id={color.color}
                                                                            />
                                                                            <label htmlFor={color.color}
                                                                                   className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                                                                <span className="checkbox-with-text__text">
                                                                            <span
                                                                                className="checkbox-with-text__circle circle"
                                                                                style={{'--color': `${color.color}`}}
                                                                            >

                                                                            </span>
                                                                                    {color.color}
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
                                                ) : (
                                                    <ul className="filter-fill__slide">
                                                        {
                                                            filteredColors?.slice(0, 5).map((color, idx) => (
                                                                <li key={idx} className="filter-fill__slide-item">
                                                                    <button
                                                                        onClick={() => dispatch(filterProductsActions.setProductColor(color.color))}
                                                                        className={`filter-fill__slide-btn ${
                                                                            productColor.includes(color.color) ? 'selected' : ''}`}
                                                                        value={color.color}
                                                                    >
                                                                        {color.color}
                                                                        <span className="filter-fill__slide-count">
                                                                            {color.count}
                                                                        </span>
                                                                    </button>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            productsShop?.length > 0 && (
                                <div className="filters-mobile__item">
                                    <div className="filters-mobile__item-head">
                                        <h3 className="filters-mobile__item-title">Shop</h3>
                                        <button className="filters-mobile__reset-btn">Reset</button>
                                        {
                                            productsShop?.length > 7 && (
                                                <button onClick={() => setShowAllShops(true)}
                                                        className="filters-mobile__btn-cat">All
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className="filter-fill">
                                        <div className="down">
                                            {
                                                showAllShops && (
                                                    <Search onSearch={handleSearchShops}/>
                                                )
                                            }
                                            {
                                                showAllShops ? (
                                                    <ul className="down__list">
                                                        {
                                                            showAllShops && (
                                                                filteredShops.map(shop => (
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
                                                                                <span className="checkbox-with-text__text">
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
                                                ) : (
                                                    <ul className="filter-fill__slide">
                                                        {
                                                            filteredShops?.slice(0, 5).map(shop => (
                                                                <li key={shop.id} className="filter-fill__slide-item">
                                                                    <button
                                                                        onClick={() => dispatch(filterProductsActions.setProductShop(shop.id))}
                                                                        className={`filter-fill__slide-btn ${
                                                                            productShop.includes(shop.id) ? 'selected' : ''}`}
                                                                        value={shop.id}
                                                                    >
                                                                        {shop.name}
                                                                        <span className="filter-fill__slide-count">
                                                                            {shop.count}
                                                                        </span>
                                                                    </button>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="filters-mobile__footer">
                        <div className="filters-mobile__btn-wrap">
                            <button onClick={handleSubmitAll} className="filters-mobile__btn-main">
                                Show {categoryProducts?.length} products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FiltersMobile;