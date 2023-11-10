import React, {useState} from 'react';
import Search from "../Search/Search";
import useFilteredCategoryProducts from "../../customHooks/useFilteredCategoryProducts";
import "./filter-mobile.scss";

const FiltersMobile = ({
                           setShowMobileFilter,
                           showMobileFilter,
                           filteredProducts,
                           filteredColors,
                           filteredBrands,
                           filteredShops,
                           brandCounts,
                           uniqueColors,
                           productsShop,
                           handleSearchBrands,
                           handleSearchColors,
                           handleSearchShops,
                           setFilteredCategoryProducts
                       }) => {

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [brandValue, setBrandValue] = useState([]);
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [colorValue, setColorValue] = useState([]);
    const [showAllColors, setShowAllColors] = useState(false);
    const [showAllShops, setShowAllShops] = useState(false);

    const categoryProducts = useFilteredCategoryProducts({
        filteredProducts: filteredProducts,
        productPrice: minPrice,
        productMaxPrice: maxPrice,
        productBrand: brandValue,
        productColor: colorValue,
    });

    const handleGetMaxPrice = (query) => {
        setMaxPrice(query)
    }

    const handleGetMinPrice = (query) => {
        setMinPrice(query)
    }

    const handleBrandCheckboxChange = (event) => {
        const {value} = event.target;
        const findBrand = brandValue.indexOf(value)

        if (findBrand !== -1) {
            setBrandValue(brandValue.filter((item) => item !== value));
        } else {
            setBrandValue([...brandValue, value]);
        }
    };

    const handleColorCheckboxChange = (event) => {
        const {value} = event.target;
        const findColor = colorValue.indexOf(value)

        if (findColor !== -1) {
            setColorValue(colorValue.filter((item) => item !== value));
        } else {
            setColorValue([...colorValue, value]);
        }
    };

    const handleSubmitAll = () => {
        setFilteredCategoryProducts(categoryProducts);
        setShowMobileFilter(false);
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
                                        <Search onSearch={handleGetMinPrice}/>
                                    </div>
                                    <div className="filter-fill__price-item">
                                        <h3 className="filter-fill__price-title">
                                            To
                                        </h3>
                                        <Search onSearch={handleGetMaxPrice}/>
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
                                        <button onClick={() => setShowAllBrands(true)} className="filters-mobile__btn-cat">All</button>
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
                                                                                onChange={handleBrandCheckboxChange}
                                                                                name={brand.name}
                                                                                checked={brandValue[brand.id]}
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
                                                            filteredBrands?.slice(0,2).map(brand => (
                                                                <li key={brand.id} className="filter-fill__slide-item">
                                                                    <button
                                                                        onClick={handleBrandCheckboxChange}
                                                                        className={`filter-fill__slide-btn ${
                                                                            brandValue.includes(brand.id) ? 'selected' : ''}`}
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
                                        <button onClick={() => setShowAllColors(true)} className="filters-mobile__btn-cat">All</button>
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
                                                                                onChange={handleColorCheckboxChange}
                                                                                name={color.color}
                                                                                checked={colorValue[color.color]}
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
                                                            filteredColors?.slice(0,2).map((color, idx) => (
                                                                <li key={idx} className="filter-fill__slide-item">
                                                                    <button
                                                                        onClick={handleColorCheckboxChange}
                                                                        className={`filter-fill__slide-btn ${
                                                                            colorValue.includes(color.color) ? 'selected' : ''}`}
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
                                        <button onClick={() => setShowAllShops(true)} className="filters-mobile__btn-cat">All</button>
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
                                                                filteredBrands.map(brand => (
                                                                    <li key={brand.id} className="down__item">
                                                                        <div className="checkbox-with-text">
                                                                            <input
                                                                                onChange={handle}
                                                                                name={brand.name}
                                                                                checked={brandValue[brand.id]}
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
                                                            filteredBrands?.slice(0,2).map(brand => (
                                                                <li key={brand.id} className="filter-fill__slide-item">
                                                                    <button
                                                                        onClick={handleBrandCheckboxChange}
                                                                        className={`filter-fill__slide-btn ${
                                                                            brandValue.includes(brand.id) ? 'selected' : ''}`}
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
                    </div>
                    <div className="filters-mobile__footer">
                        <div className="filters-mobile__btn-wrap">
                            <button onClick={handleSubmitAll} className="filters-mobile__btn-main">
                                Show {categoryProducts.length} products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FiltersMobile;