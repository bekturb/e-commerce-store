import React, {useState} from 'react';
import Search from "../Search/Search";
import useFilteredCategoryProducts from "../../customHooks/useFilteredCategoryProducts";
import "./filter-mobile.scss";

const FiltersMobile = ({
                           setShowMobileFilter,
                           showMobileFilter,
                           filteredProducts,
                           setFilteredCategoryProducts
                       }) => {

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const categoryProducts = useFilteredCategoryProducts({
        filteredProducts:filteredProducts,
        productPrice:minPrice,
        productMaxPrice:maxPrice,
    });

    const handleGetMaxPrice = (query) => {
        setMaxPrice(query)
    }

    const handleGetMinPrice = (query) => {
        setMinPrice(query)
    }

    const handleSubmitAll = () => {
        setFilteredCategoryProducts(categoryProducts)
    }

    return (
        <div className={showMobileFilter ? "filters-mobile show" : "filters-mobile"}>
            <div className="filters-mobile__wrapper">
                <div className="filters-mobile__container">
                    <div className="filters-mobile__header">
                        <h3 className="filters-mobile__title">Filter</h3>
                        <div className="filters-mobile__buttons">
                            <button className="filters-mobile__reset-btn">Reset</button>
                            <button onClick={() => setShowMobileFilter(false)} className="filters-mobile__close-btn"></button>
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
                        <div className="filters-mobile__item">
                            <div className="filters-mobile__item-head">
                                <h3 className="filters-mobile__item-title">Brand</h3>
                                <button className="filters-mobile__reset-btn">Reset</button>
                                <button className="filters-mobile__btn-cat">All</button>
                            </div>
                            <div className="filter-fill">
                                <ul className="filter-fill__slide">
                                    <li className="filter-fill__slide-item">
                                        <button className="filter-fill__slide-btn">
                                            Блузка-боди
                                            <span className="filter-fill__slide-count">
                                            2024
                                        </span>
                                        </button>
                                    </li>
                                    <li className="filter-fill__slide-item">
                                        <button className="filter-fill__slide-btn">
                                            Блузка-боди
                                            <span className="filter-fill__slide-count">
                                            2024
                                        </span>
                                        </button>
                                    </li>
                                    <li className="filter-fill__slide-item">
                                        <button className="filter-fill__slide-btn">
                                            Блузка-боди
                                            <span className="filter-fill__slide-count">
                                            2024
                                        </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
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