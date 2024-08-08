import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Ratings from "../Ratings/Ratings";
import StockBar from "../StockBar";
import { useDispatch, useSelector } from "react-redux";
import useCalculateSaleTime from "../../customHooks/useCalculateSaleTime";
import { addToWishList } from "../../features/wishList";
import { compareProductsActions } from "../../features/compareProducts";
import toast from "react-hot-toast";
import RemainingSaleTime from "../RemainingSaleTime/RemainingSaleTime";

const BigProduct = ({ bigItem }) => {
    const { data: wishListData, loading: wishListLoading } = useSelector(state => state.wishlist);
    const { data: compareProducts } = useSelector(state => state.compareProducts);
    const { isAuthenticated } = useSelector(state => state.authMe);

    const [isClicked, setIsClicked] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const dispatch = useDispatch();

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
        const productId = bigItem._id
        const isProductInWishlist = wishListData.findIndex(data => data._id === productId);
        if (isProductInWishlist === -1) {
            setIsClicked(false)
        } else {
            setIsClicked(true)
        }
    }, [wishListData]);

    useEffect(() => {
        const productId = bigItem._id
        const isProductCompared = compareProducts.findIndex(data => data._id === productId);
        if (isProductCompared === -1) {
            setIsCompared(false)
        } else {
            setIsCompared(true)
        }
    }, [compareProducts]);

    return (
        <div className="products big" key={bigItem._id}>
            <div className="products__item big__item" key={bigItem._id}>
                <RemainingSaleTime product={bigItem} />
                <div className=" products__media big__media">
                    <div className="media__image image">
                        <Link to={`/catalog/${bigItem._id}`} className="products__link">
                            <img className="products__image"
                                src={bigItem.variants[0].images[0].url} alt="" />
                        </Link>
                    </div>
                    <div className="products__hover-able">
                        <ul className="products__hover-list">
                            <li className="products__hover-item active">
                                <button
                                    onClick={isClicked ? () => handleDeleteToWishlist(bigItem._id) : () => handleAddToWishlist(bigItem._id)}
                                    className="products__hover-link"
                                    disabled={wishListLoading}
                                >
                                    <span className={isClicked ? "products__icons color" : "products__icons"}>
                                        <i className={isClicked ? "ri-heart-fill" : "ri-heart-line"}></i>
                                    </span>
                                </button>
                            </li>
                            <li className="products__hover-item">
                                <button onClick={() => toggleCompareProduct(bigItem)} className="products__hover-link">
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
                                <Link to={`/catalog/${bigItem._id}`} className="products__hover-link"><i
                                    className="ri-shuffle-line"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="products__discount circle">
                        <span className="products__percentage">
                            {bigItem.salePercentage}%
                        </span>
                    </div>
                </div>
                <div className="products__content content">
                    <div className="content__rating">
                        <div className="content__stars">
                            <Ratings rating={bigItem.totalRating} />
                        </div>
                        <span className="content__text mini-text">
                            ({bigItem.reviews.length})
                        </span>
                    </div>
                    <h3 className="content__main-links">
                        <Link to={`/catalog/${bigItem._id}`} className="content__link">{bigItem.name}</Link>
                    </h3>
                    <div className="content__price price">
                        <span className="price__current">
                            ${bigItem.variants[0].discountPrice}
                        </span>

                        {bigItem.variants[0].discountPrice &&
                            <span className="price__old mini-text">
                                ${bigItem.variants[0].originalPrice}
                            </span>
                        }
                    </div>
                    <StockBar totalQuantity={bigItem.totalQuantity} totalSold={bigItem.totalSold} />
                </div>
            </div>
        </div>
    );
};

export default BigProduct;