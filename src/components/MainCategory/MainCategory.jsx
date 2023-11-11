import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import CategoryProducts from "../CategoryProducts/CategoryProducts";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import CategoryFilterBlock from "../CategoryFilterBlock/CategoryFilterBlock";
import useFilteredCategoryProducts from "../../customHooks/useFilteredCategoryProducts";
import useBrandCounts from "../../customHooks/useBrandCounts";
import useProductsColor from "../../customHooks/UseProductsColor";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import {useLocation} from "react-router-dom";
import "./main-category.scss";

const MainCategory = ({category, products, categorySlug, currentPage, sortedItem, productColor, productBrand, productPrice, productMaxPrice, setProductPrice, perPage, paginateProducts, handlePerPageChange, loadMoreProducts, handleBrandCheckboxChange, handleColorCheckboxChange, handleSort, showRef, showMenu}) => {
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const location = useLocation();

    const {data: categories, loading: catsLoading, error: catsErr} = useSelector(state => state.categories);
    const {loading: productsLoad, error: productsErr} = useSelector(state => state.products);
    const {data: brands, loading: brandLoading, error: brandErr} = useSelector(state => state.brands);

    const categoryProducts = useFilteredCategoryProducts({
        filteredProducts,
        categorySlug,
        productBrand,
        productColor,
        productPrice,
        productMaxPrice,
        sortedItem,
    });
    const brandCounts = useBrandCounts(filteredProducts, brands);
    const uniqueColors = useProductsColor(filteredProducts);

    useEffect(() => {
        if (categorySlug && categories) {
            const newFilteredCategories = categories.filter(categoryItem => categoryItem.slug === categorySlug);
            setFilteredCategories(newFilteredCategories);
        } else {
            setFilteredCategories([]);
        }
    }, [categorySlug, categories]);

    useEffect(() => {
        if (categorySlug && products) {
            const newFilteredProducts = products.filter(product => product.tags.includes(categorySlug));
            setFilteredProducts(newFilteredProducts);
        } else {
            setFilteredProducts([]);
        }
    }, [categorySlug, products]);

    const paginatedProducts = paginateProducts(categoryProducts, currentPage, perPage);

    return (
        <div className="single-category">
            <div className="container">
                <div className="single-category__wrapper">
                    <div className="column single-category__column">
                        <div className="single-category__holder">
                            <div className="row single-category__sidebar">
                                <div ref={showRef} className="single-category__filter filter">
                                    {catsLoading || productsLoad || brandLoading ? (
                                        <div className="filter__active">
                                            <Loader/>
                                        </div>
                                    ) : (
                                        <>
                                            {
                                                catsErr || productsErr || brandErr ? (
                                                    <div className="filter__active">
                                                        <NotFound/>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {
                                                            filteredCategories?.length > 0 && (
                                                                <CategoryFilterBlock
                                                                    filteredCategories={filteredCategories}/>
                                                            )
                                                        }
                                                        {
                                                            brandCounts?.length > 0 && (
                                                                <div className="filter__block">
                                                                    <h4 className="filter__title">Brands</h4>
                                                                    <ul className="filter__list">
                                                                        {brandCounts?.map(brand => (
                                                                            <li key={brand.id} className="filter__item">
                                                                                <div className="filter__box">
                                                                                    <input
                                                                                        name={brand.name}
                                                                                        checked={productBrand[brand.id]}
                                                                                        onChange={handleBrandCheckboxChange}
                                                                                        className="filter__input"
                                                                                        type="checkbox"
                                                                                        value={brand.id}
                                                                                        id={brand.id}
                                                                                    />
                                                                                    <label className="filter__label"
                                                                                           htmlFor={brand.id}>
                                                                                        <span
                                                                                            className="filter__checked"></span>
                                                                                        <span
                                                                                            className="filter__category">{brand.name}</span>
                                                                                    </label>
                                                                                    <span className="filter__count">
                                                                                        {brand.count}
                                                                                    </span>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            uniqueColors?.length > 0 && (
                                                                <div className="filter__block colors">
                                                                    <h4 className="filter__title">Color</h4>
                                                                    <ul className="filter__list colors__variant flexitem">
                                                                        {
                                                                            uniqueColors?.map((color, idx) => (
                                                                                <li key={idx} className="filter__item">
                                                                                    <input
                                                                                        onChange={handleColorCheckboxChange}
                                                                                        className="filter__input colors__input"
                                                                                        type="checkbox"
                                                                                        name={color.color}
                                                                                        value={color.color}
                                                                                        id={color.color}
                                                                                    />
                                                                                    <label className="colors__circle circle"
                                                                                           style={{'--color': `${color.color}`}}
                                                                                           htmlFor={color.color}>
                                                                                    </label>
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            filteredProducts?.length > 0 && (
                                                                <div className="filter__block">
                                                                    <h4 className="filter__title">Price</h4>
                                                                    <div className="filter__byprice byprice">
                                                                        <div className="byprice__range-track">
                                                                            <input
                                                                                type="range"
                                                                                min="0"
                                                                                max="100000"
                                                                                className="byprice__input"
                                                                                defaultValue={productPrice}
                                                                                onChange={e => setProductPrice(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className="byprice__price-range">
                                                                            <span
                                                                                className="byprice__form">${productPrice}</span>
                                                                            <span className="byprice__to">$100000</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                            <div className="section single-category__section">
                                <div className="row section__row">
                                    <div className="cat-head">
                                        <Breadcrumb location={location}/>
                                        <div className="cat-head__page">
                                            <h1 className="cat-head__title">
                                                {category?.name}
                                            </h1>
                                        </div>
                                        <div className="cat-navigation flexitem">
                                            <div className="cat-navigation__filter desktop-hide">
                                                <div className="cat-navigation__filter-trigger" onClick={showMenu}>
                                                    <i className="ri-menu-2-line ri-2x"></i>
                                                    <span className="cat-navigation__filter-title">filter</span>
                                                </div>
                                            </div>
                                            <div className="cat-navigation__sort">
                                                <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        {sortedItem ? sortedItem : "Sort by default"}
                                                    </span>
                                                    <div className="desktop-hide">{sortedItem}</div>
                                                    <i className="ri-arrow-down-s-line"></i>
                                                </div>
                                                <ul className="cat-navigation__list">
                                                    <li onClick={() => handleSort("Popularity")}
                                                        className="cat-navigation__item">Popularity
                                                    </li>
                                                    <li onClick={() => handleSort("Product Name")}
                                                        className="cat-navigation__item">Product Name
                                                    </li>
                                                    <li onClick={() => handleSort("Ascending Price")}
                                                        className="cat-navigation__item">Ascending Price
                                                    </li>
                                                    <li onClick={() => handleSort("Descending Price")}
                                                        className="cat-navigation__item">Descending Price
                                                    </li>
                                                    <li onClick={() => handleSort("Rating")}
                                                        className="cat-navigation__item">Rating
                                                    </li>
                                                    <li onClick={() => handleSort("New")}
                                                        className="cat-navigation__item">New
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="cat-navigation__perpage mobile-hide">
                                                <div className="cat-navigation__label">
                                                    Items {perPage} perpage
                                                </div>
                                                <div className="desktop-hide">{perPage}</div>
                                            </div>
                                            <div className="cat-navigation__options options">
                                                <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">Show {`${perPage}`} perpage</span>
                                                    <div className="desktop-hide">{perPage}</div>
                                                    <i className="ri-arrow-down-s-line"></i>
                                                </div>
                                                <ul className="cat-navigation__list">
                                                    <li onClick={() => handlePerPageChange(10)}
                                                        className="cat-navigation__item">10
                                                    </li>
                                                    <li onClick={() => handlePerPageChange(20)}
                                                        className="cat-navigation__item">20
                                                    </li>
                                                    <li onClick={() => handlePerPageChange(30)}
                                                        className="cat-navigation__item">30
                                                    </li>
                                                    <li onClick={() => handlePerPageChange("All")}
                                                        className="cat-navigation__item">All
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CategoryProducts productsLoad={productsLoad} productsErr={productsErr}
                                                  paginatedProducts={paginatedProducts}/>
                                {
                                    filteredProducts?.length > 0 && (
                                        <LoadMoreButton loadMoreProducts={loadMoreProducts}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainCategory;