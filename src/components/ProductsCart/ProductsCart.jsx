import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ratings from "../Ratings/Ratings";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../features/wishList";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { compareProductsActions } from "../../features/compareProducts";

const ProductsCart = ({ product, wishListLoading, wishListData, compareProducts }) => {

    const [isClicked, setIsClicked] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.authMe);

    const dispatch = useDispatch();

    const handleAddToWishlist = (productId) => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            setIsClicked(true);
            dispatch(addToWishList({ productId }))
                .then(() => {
                    toast.success("Product added to wishlist!");
                })
        }
    };

    const handleDeleteToWishlist = (productId) => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            setIsClicked(false);
            dispatch(addToWishList({ productId }))
                .then(() => {
                    toast.success("Product deleted from wishlist!")
                });
        }
    };

    const toggleCompareProduct = (product) => {
        dispatch(compareProductsActions.setCompareProducts(product))
    };

    useEffect(() => {
        const productId = product._id
        const isProductInWishlist = wishListData.findIndex(data => data._id === productId);
        if (isProductInWishlist === -1) {
            setIsClicked(false)
        } else {
            setIsClicked(true)
        }
    }, [wishListData, product._id]);

    useEffect(() => {
        const productId = product._id
        const isProductCompared = compareProducts?.findIndex(data => data._id === productId);
        if (isProductCompared === -1) {
            setIsCompared(false)
        } else {
            setIsCompared(true)
        }
    }, [compareProducts, product._id]);

    return (
        <div className="products__item item">
            <div className="products__media media">
                <div className="products__thumbnail thumbnail">
                    <Link to={`/catalog/${product._id}`} className="products__link">
                        <img className="products__image"
                            src={product.variants[0].images[0].url} alt="" />
                    </Link>
                </div>
                <div className="products__hover-able">
                    <ul className="products__hover-list">
                        <li className="products__hover-item active">
                            <button
                                onClick={isClicked ? () => handleDeleteToWishlist(product._id) : () => handleAddToWishlist(product._id)}
                                className="products__hover-link"
                                disabled={wishListLoading}
                            >
                                <span className={isClicked ? "products__icons color" : "products__icons"}>
                                    <i className={isClicked ? "ri-heart-fill" : "ri-heart-line"}></i>
                                </span>
                            </button>
                        </li>
                        <li className="products__hover-item">
                            <button onClick={() => toggleCompareProduct(product)} className="products__hover-link">
                                <span className="products__icons" aria-disabled={wishListLoading}>
                                    {isCompared ?
                                        <i className="ri-eye-fill"></i>
                                        :
                                        <i className="ri-eye-line"></i>
                                    }
                                </span>
                            </button>
                        </li>
                        <li className="products__hover-item">
                            <Link to={`/catalog/${product._id}`} className="products__hover-link">
                                <i className="ri-shuffle-line"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="products__content content">
                <div className="content__rating">
                    <div className="content__stars">
                        <Ratings rating={product.totalRating} />
                    </div>
                    <span className="content__text mini-text">
                        ({product.reviews.length})
                    </span>
                </div>
                <h3 className="content__main-links">
                    <Link to={`/catalog/${product._id}`} className="content__link">{product.name}</Link>
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
    );
};

export default ProductsCart;