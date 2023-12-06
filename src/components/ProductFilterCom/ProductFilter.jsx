import React from 'react';
import FilterByBrand from "../FilterItems/FilterByBrand";
import FilterByColors from "../FilterItems/FilterByColors";
import FilterByShop from "../FilterItems/FilterByShop";
import {useSelector} from "react-redux";
import SortByAdvantages from "../FilterItems/SortByAdvantages";
import useOpenDrop from "../../customHooks/useOpenDrop";

const ProductFilter = ({
                           setShowMobileFilter,
                           setShowMobileSort,
                           brandCounts,
                           uniqueColors,
                           productsShop,
                           filteredBrands,
                           handleSearchBrands,
                           filteredColors,
                           handleSearchColors,
                           filteredShops,
                           handleSearchShops
                       }) => {

    const {productBrand, productColor, productShop, productSort, productMinPrice, productMaxPrice, currentPage, perPage} = useSelector(state => state.filterProducts);
    const {handleOpenDrop, open} = useOpenDrop();
    const sumOfLengths = productBrand?.length + productColor?.length + productShop?.length;

    return (
        <div className="dropdown flexitem">
            <div className="sorter-mobile desktop-hide">
                <div className="sorter-mobile__wrapper flexitem">
                    <div onClick={() => setShowMobileFilter(true)}
                         className="dropdown__trigger">
                        <div className="sorter-mobile__trigger-item">
                            <i className="ri-menu-2-line ri-2x"></i>
                            <span className="sorter-mobile__trigger-title">filter</span>
                            {
                                sumOfLengths > 0 && (
                                    <span className="sorter-mobile__count">
                                        {sumOfLengths}
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    <button onClick={() => setShowMobileSort(true)}
                            className="sorter-mobile__btn">
                        {productSort}
                    </button>
                </div>
            </div>
            <div className="dropdown__items">
                {
                    brandCounts.length > 0 && (
                        <FilterByBrand
                            brandCounts={brandCounts}
                            productBrand={productBrand}
                            filteredBrands={filteredBrands}
                            handleSearchBrands={handleSearchBrands}
                        />
                    )
                }
                {
                    uniqueColors.length > 0 && (
                        <FilterByColors
                            uniqueColors={uniqueColors}
                            productColor={productColor}
                            filteredColors={filteredColors}
                            handleSearchColors={handleSearchColors}
                        />
                    )
                }
                {
                    productsShop.length > 0 && (
                        <FilterByShop
                            productShop={productShop}
                            productsShop={productsShop}
                            filteredShops={filteredShops}
                            handleSearchShops={handleSearchShops}
                        />
                    )
                }
                <SortByAdvantages
                    productSort={productSort}
                />
                <div className={open === "filter" ? "dropdown__sort open" : "dropdown__sort"}>
                    <button onClick={() => setShowMobileFilter(true)}
                            className="dropdown__button">
                                            <span className="dropdown__button-icon">
                                                <i className="ri-equalizer-line"></i>
                                            </span>
                        All Filter
                    </button>
                    {
                        sumOfLengths > 0 && (
                            <span className="dropdown__count">
                                                        {sumOfLengths}
                                                    </span>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;