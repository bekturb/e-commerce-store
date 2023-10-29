import React from 'react';
import Ratings from "../Ratings/Ratings";
import {useDispatch} from "react-redux";
import {addToWishList} from "../../features/wishList";

const CategoryProductsCart = ({product}) => {

    const dispatch = useDispatch()

    const handleAddToWishlist = (productId) => {
        dispatch(addToWishList({productId}));
    };

    return (
        <div key={product._id} className="products__item item">
            <div className="products__media media">
                <div className="products__thumbnail thumbnail">
                    <a className="products__link" href="">
                        <img className="products__image"
                             src={product.variants[0].images[0].url}
                             alt=""/>
                    </a>
                </div>
                <div className="products__hover-able">
                    <ul className="products__hover-list">
                        <>
                            <li onClick={() => handleAddToWishlist(product._id)} className="products__hover-item active">
                                <span className="products__hover-link">
                                    <i className="ri-heart-line"></i>
                                </span>
                            </li>
                            <li onClick={() => handleAddToWishlist(product._id)} className="products__hover-item active">
                                <span className="products__hover-link">
                                    <i className="ri-heart-fill"></i>
                                </span>
                            </li>
                        </>
                        <li className="products__hover-item">
                            <a className="products__hover-link"
                               href=""><i
                                className="ri-eye-line"></i>
                            </a>
                        </li>
                        <li className="products__hover-item">
                            <a className="products__hover-link"
                               href=""><i
                                className="ri-shuffle-line"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="products__discount circle">
                     <span className="products__percentage">
                          {product.salePercentage}%
                     </span>
                </div>
            </div>
            <div className="products__content content">
                <div className="content__rating">
                    <div className="content__stars">
                        <Ratings rating={product?.totalRating}/>
                    </div>
                    <span className="content__text mini-text">
                                                ({product?.reviews.length})
                                            </span>
                </div>
                <h3 className="content__main-links">
                    <a className="content__link"
                       href="">{product.name}</a>
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
                    {
                        product.variants[0].discountPrice &&
                        <span className="price__old mini-text">
                                                ${product.variants[0].originalPrice}
                                            </span>}
                </div>
            </div>
        </div>
    );
};

export default CategoryProductsCart;