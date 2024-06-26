import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ratings from "../Ratings/Ratings";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../features/wishList";
import toast from "react-hot-toast";
import { compareProductsActions } from "../../features/compareProducts";
import { Link } from "react-router-dom";

const MiniProductCart = ({ miniProduct, wishListLoading, wishListData, compareProducts }) => {

    const [isClicked, setIsClicked] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector(state => state.authMe);
    const navigate = useNavigate();

    const handleAddToWishlist = (productId) => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            setIsClicked(true);
            dispatch(addToWishList({ productId }))
                .then(() => {
                    toast.success("Product added to cart!")
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
                    toast.success("Product deleted from cart!")
                });
        }
    };

    const toggleCompareProduct = (product) => {
        dispatch(compareProductsActions.setCompareProducts(product))
    };

    useEffect(() => {
        const productId = miniProduct._id
        const isProductInWishlist = wishListData.findIndex(data => data._id === productId);
        if (isProductInWishlist === -1) {
            setIsClicked(false)
        } else {
            setIsClicked(true)
        }
    }, [wishListData, miniProduct._id]);

    useEffect(() => {
        const productId = miniProduct._id
        const isProductCompared = compareProducts?.findIndex(data => data._id === productId);
        if (isProductCompared === -1) {
            setIsCompared(false)
        } else {
            setIsCompared(true)
        }
    }, [compareProducts, miniProduct._id]);
    return (
        <div className="products__item products__mini-item">
            <div className="products__media products__media-mini">
                <div className="thumbnail">
                    <Link to={`/catalog/${miniProduct._id}`} className="products__link">
                        <img className="products__image"
                            src={miniProduct.variants[0].images[0].url}
                            alt="" />
                    </Link>
                </div>
                <div className="products__hover-able">
                    <ul className="products__hover-list">
                        <li className="products__hover-item active">
                            <button
                                onClick={isClicked ? () => handleDeleteToWishlist(miniProduct._id) : () => handleAddToWishlist(miniProduct._id)}
                                className="products__hover-link"
                                disabled={wishListLoading}
                            >
                                <span className={isClicked ? "products__icons color" : "products__icons"}>
                                    <i className={isClicked ? "ri-heart-fill" : "ri-heart-line"}></i>
                                </span>
                            </button>
                        </li>
                        <li className="products__hover-item">
                            <button onClick={() => toggleCompareProduct(miniProduct)} className="products__hover-link">
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
                            <Link to={`/catalog/${miniProduct._id}`} className="products__hover-link"><i
                                className="ri-shuffle-line"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="products__discount circle">
                    <span className="products__percentage">
                        {miniProduct?.salePercentage}%
                    </span>
                </div>
            </div>
            <div className="products__content content">
                <h3 className="content__main-links">
                    <Link to={`/catalog/${miniProduct._id}`} className="content__link">{miniProduct?.name}</Link>
                </h3>
                <div className="content__rating">
                    <div className="content__stars">
                        <Ratings rating={miniProduct.totalRating} />
                    </div>
                    <span className="content__text mini-text">
                        ({miniProduct?.reviews.length})
                    </span>
                </div>
                <div className="content__price price">
                    <span className="price__current">
                        ${miniProduct?.variants[0].discountPrice}
                    </span>
                    <span className="price__old mini-text">
                        ${miniProduct?.variants[0].originalPrice}
                    </span>
                </div>
                <div className="content__info info mini-text">
                    <p className="info__sold">{miniProduct?.totalSold} sold</p>
                    <p className="info__shipping">Free Shipping</p>
                </div>
            </div>
        </div>
    );
};

export default MiniProductCart;