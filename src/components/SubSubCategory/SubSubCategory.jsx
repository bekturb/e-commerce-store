import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import SecTop from "../SecTop/SecTop";
import Ratings from "../Ratings/Ratings";
import "./subsubcategory.scss";

const SubSubCategory = ({products, category, brands}) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [uniqueColors, setUniqueColors] = useState([]);
    const [brandCounts, setBrandCounts] = useState([]);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (products?.length > 0) {
            const catProducts = products.filter(pro => pro.category === category._id);
            setFilteredProducts(catProducts)
        }
    }, [products, category]);

    useEffect(() => {
        if (filteredProducts) {
            const colors = new Set();
            filteredProducts.forEach(product => {
                product.variants.forEach(variant => {
                    colors.add(variant.color);
                });
            });
            setUniqueColors([...colors]);
        }
    }, [products]);

    useEffect(() => {
        if (filteredProducts && brands) {
            const brandCounts = {};

            filteredProducts.forEach(product => {
                const brand = brands.find(brand => brand._id === product.brand);
                if (brand) {
                    const brandName = brand.name;
                    const brandId = brand._id;
                    if (!brandCounts[brandName]) {
                        brandCounts[brandName] = {
                            id: brandId,
                            count: 1,
                        };
                    } else {
                        brandCounts[brandName].count += 1;
                    }
                }
            });

            const brandCountsArray = [];
            for (const brandName in brandCounts) {
                brandCountsArray.push({
                    name: brandName,
                    id: brandCounts[brandName].id,
                    count: brandCounts[brandName].count,
                });
            }

            setBrandCounts(brandCountsArray);
        }
    }, [filteredProducts, brands]);

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
                                <div className="dropdown__sort">
                                    <button className="dropdown__button" onClick={() => setOpen(!open)}>
                                        <span className="dropdown__select">Brands</span>
                                        {
                                            open ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                        }
                                    </button>
                                    <div className={open ? "dropdown__filter open" : "dropdown__filter"}>
                                        <div className="down">
                                            <div className="down__form desktop-hide">
                                                <label>
                                                    <input className="down__input" type="text"/>
                                                </label>
                                            </div>
                                            <ul className="down__list">
                                                <li className="down__item">
                                                    <div className="checkbox-with-text">
                                                        <input
                                                            className="checkbox-with-text__input"
                                                            type="checkbox"
                                                            id="Nike"
                                                        />
                                                        <label htmlFor="Nike" className="checkbox-with-text__label">
                                                            <span className="checkbox-with-text__decor">

                                                            </span>
                                                            <span className="checkbox-with-text__text">
                                                            Nike
                                                                <span className="checkbox-with-text__count">
                                                                    1200
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown__sort">
                                    <button className="dropdown__button" onClick={() => setOpen(!open)}>
                                        <span className="dropdown__select">Brands</span>
                                        {
                                            open ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                        }
                                    </button>
                                    <div className={open ? "dropdown__filter open" : "dropdown__filter"}>
                                        <div className="down">
                                            <div className="down__form desktop-hide">
                                                <label>
                                                    <input className="down__input" type="text"/>
                                                </label>
                                            </div>
                                            <ul className="down__list">
                                                <li className="down__item">
                                                    <div className="checkbox-with-text">
                                                        <input
                                                            className="checkbox-with-text__input"
                                                            type="checkbox"
                                                            id="Nike"
                                                        />
                                                        <label htmlFor="Nike" className="checkbox-with-text__label">
                                                            <span className="checkbox-with-text__decor">

                                                            </span>
                                                            <span className="checkbox-with-text__text">
                                                            Nike
                                                                <span className="checkbox-with-text__count">
                                                                    1200
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown__sort">
                                    <button className="dropdown__button" onClick={() => setOpen(!open)}>
                                        <span className="dropdown__select">Brands</span>
                                        {
                                            open ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                        }
                                    </button>
                                    <div className={open ? "dropdown__filter open" : "dropdown__filter"}>
                                        <div className="down">
                                            <div className="down__form desktop-hide">
                                                <label>
                                                    <input className="down__input" type="text"/>
                                                </label>
                                            </div>
                                            <ul className="down__list">
                                                <li className="down__item">
                                                    <div className="checkbox-with-text">
                                                        <input
                                                            className="checkbox-with-text__input"
                                                            type="checkbox"
                                                            id="Nike"
                                                        />
                                                        <label htmlFor="Nike" className="checkbox-with-text__label">
                                                            <span className="checkbox-with-text__decor">

                                                            </span>
                                                            <span className="checkbox-with-text__text">
                                                            Nike
                                                                <span className="checkbox-with-text__count">
                                                                    1200
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown__sort">
                                    <button className="dropdown__button" onClick={() => setOpen(!open)}>
                                        <span className="dropdown__select">Brands</span>
                                        {
                                            open ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                        }
                                    </button>
                                    <div className={open ? "dropdown__filter open" : "dropdown__filter"}>
                                        <div className="down">
                                            <div className="down__form desktop-hide">
                                                <label>
                                                    <input className="down__input" type="text"/>
                                                </label>
                                            </div>
                                            <ul className="down__list">
                                                <li className="down__item">
                                                    <div className="checkbox-with-text">
                                                        <input
                                                            className="checkbox-with-text__input"
                                                            type="checkbox"
                                                            id="Nike"
                                                        />
                                                        <label htmlFor="Nike" className="checkbox-with-text__label">
                                                            <span className="checkbox-with-text__decor">

                                                            </span>
                                                            <span className="checkbox-with-text__text">
                                                            Nike
                                                                <span className="checkbox-with-text__count">
                                                                    1200
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown__sort">
                                    <button className="dropdown__button" onClick={() => setOpen(!open)}>
                                        <span className="dropdown__select">Brands</span>
                                        {
                                            open ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                        }
                                    </button>
                                    <div className={open ? "dropdown__filter open" : "dropdown__filter"}>
                                        <div className="down">
                                            <div className="down__form desktop-hide">
                                                <label>
                                                    <input className="down__input" type="text"/>
                                                </label>
                                            </div>
                                            <ul className="down__list">
                                                <li className="down__item">
                                                    <div className="checkbox-with-text">
                                                        <input
                                                            className="checkbox-with-text__input"
                                                            type="checkbox"
                                                            id="Nike"
                                                        />
                                                        <label htmlFor="Nike" className="checkbox-with-text__label">
                                                            <span className="checkbox-with-text__decor">

                                                            </span>
                                                            <span className="checkbox-with-text__text">
                                                            Nike
                                                                <span className="checkbox-with-text__count">
                                                                    1200
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown__sort">
                                    <button className="dropdown__button" onClick={() => setOpen(!open)}>
                                        <span className="dropdown__select">Brands</span>
                                        {
                                            open ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                        }
                                    </button>
                                    <div className={open ? "dropdown__filter open" : "dropdown__filter"}>
                                        <div className="down">
                                            <div className="down__form desktop-hide">
                                                <label>
                                                    <input className="down__input" type="text"/>
                                                </label>
                                            </div>
                                            <ul className="down__list">
                                                <li className="down__item">
                                                    <div className="checkbox-with-text">
                                                        <input
                                                            className="checkbox-with-text__input"
                                                            type="checkbox"
                                                            id="Nike"
                                                        />
                                                        <label htmlFor="Nike" className="checkbox-with-text__label">
                                                            <span className="checkbox-with-text__decor">

                                                            </span>
                                                            <span className="checkbox-with-text__text">
                                                            Nike
                                                                <span className="checkbox-with-text__count">
                                                                    1200
                                                                </span>
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
                                    filteredProducts?.map(product => (
                                        <div className="products__item item" key={product._id}>
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