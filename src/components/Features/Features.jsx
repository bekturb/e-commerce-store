import React from 'react';
import {useSelector} from "react-redux";
import "./features.scss";
import Ratings from "../Ratings";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";

const Features = ({title}) => {

    const {data: products, loading: productsLoad, error:productsErr} = useSelector(state => state.products);

    const sortedProducts = products ? [...products].sort((a, b) => b.totalRating - a.totalRating).slice(0, 8) : [];

    return (
        <div id="features" className="features">
            <div className="container">
                <div className="features__wrapper">
                    <div className="features__column">
                        <div className="secTop flexitem">
                            <h2 className="secTop__inner">
                                <span className="secTop__circle circle"></span>
                                <span className="secTop__title">{title}</span>
                            </h2>
                            <div className="secTop__second-links">
                                <a className="view-all" href="#">View all <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </div>
                        {
                            productsLoad && (
                                <div className="trending__loader">
                                    <Loader />
                                </div>
                            )
                        }
                        {
                            productsErr && (
                                <div className="trending__loader">
                                    <NotFound error={productsErr} />
                                </div>
                            )
                        }
                        <div className="products pro flexwrap">
                            {
                                sortedProducts?.map(product => (
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
    );
};

export default Features;