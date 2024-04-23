import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import ListTitleSkeleton from "../../Skeletons/ListTitleSkeleton/ListTitleSkeleton";
import "./aside-top.scss"

const AsideTopNav = () => {

    const {isAuthenticated, loading: authLoading} = useSelector(state => state.authMe);
    const {loading: productsLoading} = useSelector(state => state.products);
    const {isAuthenticated: isSeller, loading: myShopLoading} = useSelector(state => state.myShop);
    const { loading: wishListLoading} = useSelector(state => state.wishlist);

    return (
        <div className="nav-top top">
            <div className="top__wrapper">
                <div className="top__left">
                    <ul className="top__links">
                        {
                            productsLoading ? (
                                <>
                                    <ListTitleSkeleton />
                                    <ListTitleSkeleton />
                                </>
                            ) : (
                                <>
                                    <li className="top__item">
                                        <Link className="top__link" to="/cart-page">Cart</Link>
                                    </li>
                                    <li className="top__item">
                                        <Link className="top__link" to="/catalog/featured-products">Featured Products</Link>
                                    </li>
                                </>
                            )
                        }

                        {
                            wishListLoading ? (
                                <ListTitleSkeleton />
                            ) : (
                                <li className="top__item">
                                    <Link className="top__link" to="/catalog/Wishlist">Wishlist</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="top__right">
                    <ul className="top__links">
                        {
                            authLoading ? (
                                Array.from({ length: 3 }).map((idx) => (
                                    <li className="top__item" key={idx}>
                                        <Skeleton width={50} height={15} style={{ margin: "10px" }} />
                                    </li>
                                ))
                            ) : (
                                !isAuthenticated ?
                                    <>
                                        <li className="top__item">
                                            <Link className="top__link" to="/register">Sign Up</Link>
                                        </li>
                                        <li className="top__item">
                                            <Link className="top__link" to="/login">Sign In</Link>
                                        </li>
                                    </> : <>
                                        <li className="top__item">
                                            <Link className="top__link" to="/">My Account</Link>
                                        </li>
                                    </>
                            )
                        }
                        {
                            myShopLoading ? (
                                <ListTitleSkeleton />
                            ) : (
                                !isSeller ? (
                                    <li className="top__item">
                                        <Link className="top__link" to="/shop/login">Become Seller</Link>
                                    </li>
                                ) : (
                                    <li className="top__item">
                                        <Link className="top__link" to="/shop/dashboard">You're Seller</Link>
                                    </li>
                                )
                            )
                        }
                        <li className="currency top__item">
                            <Link className="top__link top__link--display" to="/">
                                USD
                                <span className="top__icon icon-sm">
                                    <i className="ri-arrow-down-s-line"></i>
                                </span>
                            </Link>
                            <ul className="currency__list">
                                <li className="currency__item">
                                    <Link to="/" className="currency__link current">USD</Link>
                                </li>
                                <li className="currency__item">
                                    <Link to="/" className="currency__link">KGZ</Link>
                                </li>
                                <li className="currency__item">
                                    <Link to="/" className="currency__link">EUR</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AsideTopNav;