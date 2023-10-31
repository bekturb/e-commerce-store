import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import SecTop from "../SecTop/SecTop";
import "./subsubcategory.scss"
import Ratings from "../Ratings/Ratings";

const SubSubCategory = ({products, category}) => {
    const [filteredProducts , setFilteredProducts] = useState([])

    useEffect(() => {
        if (products?.length > 0) {
            const catProducts = products.filter(pro => pro.category === category._id);
            setFilteredProducts(catProducts)
        }
    }, [products, category]);

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
                            <div className="cat-navigation flexitem">
                                {/*<div className="cat-navigation__filter desktop-hide">*/}
                                {/*    <div className="cat-navigation__filter-trigger">*/}
                                {/*        <i className="ri-menu-2-line ri-2x"></i>*/}
                                {/*        <span className="cat-navigation__filter-title">filter</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="cat-navigation__sort">
                                    <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        Sort by default
                                                    </span>
                                        <div className="desktop-hide"></div>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                    <ul className="cat-navigation__list">
                                        <li
                                            className="cat-navigation__item">Default
                                        </li>
                                        <li
                                            className="cat-navigation__item">Product Name
                                        </li>
                                        <li
                                            className="cat-navigation__item">Price
                                        </li>
                                    </ul>
                                </div>
                                <div className="cat-navigation__sort">
                                    <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        Sort by default
                                                    </span>
                                        <div className="desktop-hide"></div>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                    <ul className="cat-navigation__list">
                                        <li
                                            className="cat-navigation__item">Default
                                        </li>
                                        <li
                                            className="cat-navigation__item">Product Name
                                        </li>
                                        <li
                                            className="cat-navigation__item">Price
                                        </li>
                                    </ul>
                                </div>
                                <div className="cat-navigation__sort">
                                    <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        Sort by default
                                                    </span>
                                        <div className="desktop-hide"></div>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                    <ul className="cat-navigation__list">
                                        <li
                                            className="cat-navigation__item">Default
                                        </li>
                                        <li
                                            className="cat-navigation__item">Product Name
                                        </li>
                                        <li
                                            className="cat-navigation__item">Price
                                        </li>
                                    </ul>
                                </div>
                                <div className="cat-navigation__sort">
                                    <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        Sort by default
                                                    </span>
                                        <div className="desktop-hide"></div>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                    <ul className="cat-navigation__list">
                                        <li
                                            className="cat-navigation__item">Default
                                        </li>
                                        <li
                                            className="cat-navigation__item">Product Name
                                        </li>
                                        <li
                                            className="cat-navigation__item">Price
                                        </li>
                                    </ul>
                                </div>
                                <div className="cat-navigation__sort">
                                    <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        Sort by default
                                                    </span>
                                        <div className="desktop-hide"></div>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                    <ul className="cat-navigation__list">
                                        <li
                                            className="cat-navigation__item">Default
                                        </li>
                                        <li
                                            className="cat-navigation__item">Product Name
                                        </li>
                                        <li
                                            className="cat-navigation__item">Price
                                        </li>
                                    </ul>
                                </div>
                                <div className="cat-navigation__sort">
                                    <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        Sort by default
                                                    </span>
                                        <div className="desktop-hide"></div>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                    <ul className="cat-navigation__list">
                                        <li
                                            className="cat-navigation__item">Default
                                        </li>
                                        <li
                                            className="cat-navigation__item">Product Name
                                        </li>
                                        <li
                                            className="cat-navigation__item">Price
                                        </li>
                                    </ul>
                                </div>
                                <div className="cat-navigation__sort">
                                    <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        Sort by default
                                                    </span>
                                        <div className="desktop-hide"></div>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                    <ul className="cat-navigation__list">
                                        <li
                                            className="cat-navigation__item">Default
                                        </li>
                                        <li
                                            className="cat-navigation__item">Product Name
                                        </li>
                                        <li
                                            className="cat-navigation__item">Price
                                        </li>
                                    </ul>
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
                                                {product.reviews.length}
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