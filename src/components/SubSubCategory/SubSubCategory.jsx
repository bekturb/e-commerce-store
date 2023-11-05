import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import SecTop from "../SecTop/SecTop";
import Ratings from "../Ratings/Ratings";
import useBrandCounts from "../../customHooks/useBrandCounts";
import useProductsColor from "../../customHooks/UseProductsColor";
import useGetProductsSeller from "../../customHooks/useGetProductsSeller";
import useFilteredCategoryProducts from "../../customHooks/useFilteredCategoryProducts";
import "./subsubcategory.scss";

const SubSubCategory = ({categorySlug, products, category, currentPage, sortedItem, productColor, productPrice, perPage, setProductPrice, paginateProducts, handlePerPageChange, handleSort, handleColorCheckboxChange, handleBrandCheckboxChange, productBrand, shops}) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [open, setOpen] = useState("");

    const {data: brands, loading: brandLoading, error: brandErr} = useSelector(state => state.brands);

    const categoryProducts = useFilteredCategoryProducts({
        filteredProducts,
        categorySlug,
        productBrand,
        productColor,
        productPrice,
        sortedItem,
    });
    const brandCounts = useBrandCounts(filteredProducts, brands);
    const uniqueColors = useProductsColor(filteredProducts);
    const productsShop  = useGetProductsSeller(filteredProducts, shops);

    useEffect(() => {
        if (products?.length > 0) {
            const catProducts = products.filter(pro => pro.category === category._id);
            setFilteredProducts(catProducts)
        }
    }, [products, category]);

    const handleOpenDrop = (openDrop) => {
        if (open === openDrop) {
            setOpen("");
        } else {
            setOpen(openDrop)
        }
    }

    return (
        <div className="subcat">
            <div className="container">
                <div className="subcat__wrapper">
                    <div className="column subcat__column">
                        <div className="subcat__head">
                            <div className="breadcrumb">
                                <ul className="breadcrumb__list flexitem">
                                    <li className="breadcrumb__item">
                                        <Link to="/" className="breadcrumb__link">Home</Link>
                                    </li>
                                    <li className="breadcrumb__item">
                                        <Link to="/" className="breadcrumb__link">Women</Link>
                                    </li>
                                    <li className="breadcrumb__item">
                                        <Link to="/" className="breadcrumb__link">Accessories</Link>
                                    </li>
                                </ul>
                            </div>
                            <SecTop title="Accessories"/>
                            <div className="dropdown flexitem">
                                {
                                    brandCounts.length > 0 && (
                                        <div className="dropdown__sort">
                                            <button className="dropdown__button" onClick={() => handleOpenDrop("brands")}>
                                                <span className="dropdown__select">Brands</span>
                                                {
                                                    open === "brands" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                                }
                                            </button>
                                            <div
                                                className={open === "brands" ? "dropdown__filter open" : "dropdown__filter"}>
                                                <div className="down">
                                                    <div className="down__form desktop-hide">
                                                        <label>
                                                            <input className="down__input" type="text"/>
                                                        </label>
                                                    </div>
                                                    <ul className="down__list">
                                                        {
                                                            brandCounts.map(brand => (
                                                                <li key={brand.id} className="down__item">
                                                                    <div className="checkbox-with-text">
                                                                        <input
                                                                            onChange={handleBrandCheckboxChange}
                                                                            name={brand.name}
                                                                            checked={productBrand[brand.id]}
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
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    uniqueColors.length > 0 && (
                                        <div className="dropdown__sort">
                                            <button className="dropdown__button" onClick={() => handleOpenDrop("colors")}>
                                                <span className="dropdown__select">Colors</span>
                                                {
                                                    open === "colors" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                                }
                                            </button>
                                            <div
                                                className={open === "colors" ? "dropdown__filter open" : "dropdown__filter"}>
                                                <div className="down">
                                                    <div className="down__form desktop-hide">
                                                        <label>
                                                            <input className="down__input" type="text"/>
                                                        </label>
                                                    </div>
                                                    <ul className="down__list">
                                                        {
                                                            uniqueColors.map((color, idx) => (
                                                                <li key={idx} className="down__item">
                                                                    <div className="checkbox-with-text">
                                                                        <input
                                                                            onChange={handleColorCheckboxChange}
                                                                            name={color.color}
                                                                            checked={productColor[color.color]}
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
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    productsShop.length > 0 && (
                                        <div className="dropdown__sort">
                                            <button className="dropdown__button" onClick={() => handleOpenDrop("seller")}>
                                                <span className="dropdown__select">Sellers</span>
                                                {
                                                    open === "seller" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                                }
                                            </button>
                                            <div
                                                className={open === "seller" ? "dropdown__filter open" : "dropdown__filter"}>
                                                <div className="down">
                                                    <div className="down__form desktop-hide">
                                                        <label>
                                                            <input className="down__input" type="text"/>
                                                        </label>
                                                    </div>
                                                    <ul className="down__list">
                                                        {
                                                            productsShop.map(shop => (
                                                                <li key={shop.id} className="down__item">
                                                                    <div className="checkbox-with-text">
                                                                        <input
                                                                            name={shop.name}
                                                                            // checked={productsShop[brand.id]}
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
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="dropdown__sort">
                                    <button className="dropdown__button" onClick={() => handleOpenDrop("filter")}>
                                        <span className="dropdown__select">{sortedItem}</span>
                                        {
                                            open === "filter" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                        }
                                    </button>
                                    <div className={open === "filter" ? "dropdown__filter open" : "dropdown__filter"}>
                                        <div className="down">
                                            <div className="down__form desktop-hide">
                                                <label>
                                                    <input className="down__input" type="text"/>
                                                </label>
                                            </div>
                                            <ul className="down__list">
                                                <li className="down__item">
                                                    <div className="radio-with-text">
                                                        <input
                                                            onChange={(e) => handleSort(e.target.value)}
                                                            name="filter"
                                                            className="radio-with-text__input"
                                                            value="Popularity"
                                                            type="radio"
                                                            id="popularity"
                                                        />
                                                        <label htmlFor="popularity" className="radio-with-text__label">
                                                            <span className="radio-with-text__decor">

                                                            </span>
                                                            <span className="radio-with-text__text">
                                                            Popularity
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="down__item">
                                                    <div className="radio-with-text">
                                                        <input
                                                            onChange={(e) => handleSort(e.target.value)}
                                                            name="filter"
                                                            className="radio-with-text__input"
                                                            value="Product Name"
                                                            type="radio"
                                                            id="name"
                                                        />
                                                        <label htmlFor="name" className="radio-with-text__label">
                                                            <span className="radio-with-text__decor">

                                                            </span>
                                                            <span className="radio-with-text__text">
                                                            Product Name
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="down__item">
                                                    <div className="radio-with-text">
                                                        <input
                                                            onChange={(e) => handleSort(e.target.value)}
                                                            name="filter"
                                                            className="radio-with-text__input"
                                                            value="Ascending Price"
                                                            type="radio"
                                                            id="ascending"
                                                        />
                                                        <label htmlFor="ascending" className="radio-with-text__label">
                                                            <span className="radio-with-text__decor">

                                                            </span>
                                                            <span className="radio-with-text__text">
                                                            Ascending Price
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="down__item">
                                                    <div className="radio-with-text">
                                                        <input
                                                            onChange={(e) => handleSort(e.target.value)}
                                                            name="filter"
                                                            className="radio-with-text__input"
                                                            value="Descending Price"
                                                            type="radio"
                                                            id="descending"
                                                        />
                                                        <label htmlFor="descending" className="radio-with-text__label">
                                                            <span className="radio-with-text__decor">

                                                            </span>
                                                            <span className="radio-with-text__text">
                                                            Descending Price
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="down__item">
                                                    <div className="radio-with-text">
                                                        <input
                                                            onChange={(e) => handleSort(e.target.value)}
                                                            name="filter"
                                                            className="radio-with-text__input"
                                                            value="Rating"
                                                            type="radio"
                                                            id="rating"
                                                        />
                                                        <label htmlFor="rating" className="radio-with-text__label">
                                                            <span className="radio-with-text__decor">

                                                            </span>
                                                            <span className="radio-with-text__text">
                                                            Rating
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="down__item">
                                                    <div className="radio-with-text">
                                                        <input
                                                            onChange={(e) => handleSort(e.target.value)}
                                                            name="filter"
                                                            className="radio-with-text__input"
                                                            type="radio"
                                                            value="New"
                                                            id="new"
                                                        />
                                                        <label htmlFor="new" className="radio-with-text__label">
                                                            <span className="radio-with-text__decor">

                                                            </span>
                                                            <span className="radio-with-text__text">
                                                            New
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="subcat__body">
                            <div className="products pro flexwrap">
                                {
                                    categoryProducts?.map(product => (
                                        <div key={product._id} className="products__item item">
                                            <div className="products__media media">
                                                <div className="products__thumbnail thumbnail">
                                                    <a className="products__link" href="">
                                                        <img className="products__image"
                                                             src={product.variants[0].images[0].url} alt=""/>
                                                    </a>
                                                </div>
                                                <div className="products__hover-able">
                                                    <ul className="products__hover-list">
                                                        <li className="products__hover-item active">
                                                            <a className="products__hover-link" href=""><i
                                                                className="ri-heart-line"></i>
                                                            </a>
                                                        </li>
                                                        <li className="products__hover-item">
                                                            <a className="products__hover-link" href=""><i
                                                                className="ri-eye-line"></i>
                                                            </a>
                                                        </li>
                                                        <li className="products__hover-item">
                                                            <a className="products__hover-link" href=""><i
                                                                className="ri-shuffle-line"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="products__content content">
                                                <div className="content__rating">
                                                    <div className="content__stars">
                                                        <Ratings rating={product.totalRating}/>
                                                    </div>
                                                    <span className="content__text mini-text">
                                                ({product.reviews.length})
                                            </span>
                                                </div>
                                                <h3 className="content__main-links">
                                                    <a className="content__link" href="">{product.name}</a>
                                                </h3>
                                                <div className="content__price price">
                                                    {
                                                        product.variants[0].discountPrice ?
                                                            <span className="price__current">
                                                ${product.variants[0].discountPrice}
                                            </span> : <span className="price__current">
                                                ${product.variants[0].originalPrice}
                                            </span>
                                                    }
                                                    {product.variants[0].discountPrice &&
                                                        <span className="price__old mini-text">
                                                ${product.variants[0].originalPrice}
                                            </span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubSubCategory;