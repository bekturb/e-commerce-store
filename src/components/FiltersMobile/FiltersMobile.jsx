import React from 'react';
import Search from "../Search/Search";
import "./filter-mobile.scss"

const FiltersMobile = () => {
    return (
        <div className="filters-mobile">
            <div className="filters-mobile__wrapper">
                <div className="filters-mobile__container">
                    <div className="filters-mobile__header">
                        <h3 className="filters-mobile__title">Filter</h3>
                        <div className="filters-mobile__buttons">
                            <button className="filters-mobile__reset-btn">Reset</button>
                            <button className="filters-mobile__close-btn"></button>
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
                                        <Search/>
                                    </div>
                                    <div className="filter-fill__price-item">
                                        <h3 className="filter-fill__price-title">
                                            From
                                        </h3>
                                        <Search/>
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
                            <button className="filters-mobile__btn-main">
                                Show 22222 products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FiltersMobile;