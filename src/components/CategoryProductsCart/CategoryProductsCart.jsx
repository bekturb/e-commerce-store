import React, {useEffect, useState} from 'react';
import Ratings from "../Ratings/Ratings";
import {useDispatch, useSelector} from "react-redux";
import {addToWishList} from "../../features/wishList";
import {fetchAuthMe} from "../../features/authMeSlice";

const CategoryProductsCart = ({product}) => {
    const dispatch = useDispatch();
    const {
        data: userData,
        loading: userLoading,
        error: userError,
        isAuthenticated
    } = useSelector(state => state.authMe);
    const {data: wishListData, loading: wishListLoading, error: wishListErr} = useSelector(state => state.wishlist);
    const [oldUserData, setOldUserData] = useState(userData);

    const isProductInWishlist = oldUserData?.wishList.includes(product._id);

    const handleAddToWishlist = (productId) => {
        dispatch(addToWishList({productId}))
    };

    const handleDeleteToWishlist = (productId) => {
        console.log(productId)
        // dispatch(addToWishList({productId}));
    };

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [wishListData]);


    useEffect(() => {
        if (userData) {
            setOldUserData(userData);
        }
    }, [userData]);


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
                            {
                                isProductInWishlist ? (
                                    <li onClick={() => handleDeleteToWishlist(product._id)}
                                        className="products__hover-item active">
                                <span className="products__hover-link">
                                    <i className="ri-heart-fill"></i>
                                </span>
                                    </li>
                                ) : (
                                    <li onClick={() => handleAddToWishlist(product._id)}
                                        className="products__hover-item active">
                                <span className="products__hover-link">
                                    <i className="ri-heart-line"></i>
                                </span>
                                    </li>
                                )
                            }
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