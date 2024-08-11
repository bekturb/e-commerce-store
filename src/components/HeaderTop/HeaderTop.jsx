import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "../../assets/profile.png"
import {getPersonalWishlist} from "../../features/wishList";
import {cartProductsActions} from "../../features/cartSlice";
import ListTitleSkeleton from "../Skeletons/ListTitleSkeleton/ListTitleSkeleton";
import {fetchProducts} from "../../features/productsSlice";
import {fetchPages} from "../../features/pageSlice";
import Skeleton from "react-loading-skeleton";
import "./header-top.scss";

const HeaderTop = () => {

    const {data, isAuthenticated, loading: authLoading} = useSelector(state => state.authMe);
    const {loading: productsLoading} = useSelector(state => state.products);
    const {isAuthenticated: isSeller, loading: myShopLoading} = useSelector(state => state.myShop);
    const { loading: wishListLoading} = useSelector(state => state.wishlist);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(getPersonalWishlist());
        dispatch(cartProductsActions.getCartProducts())
        dispatch(fetchPages())
    }, [dispatch]);

    return (
        <div className="top">
            <div className="container">
                <div className="top__wrapper">
                    <div className="top__left">
                        <ul className="top__links">
                            {
                                productsLoading ? (
                                    <>
                                        <ListTitleSkeleton/>
                                        <ListTitleSkeleton/>
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
                                    <ListTitleSkeleton/>
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
                                    Array.from({ length: 3 }).map((id, idx) => (
                                        <li className="top__item" key={idx}>
                                            <Skeleton width={50} height={15} style={{ margin: "10px"}}/>
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
                                                <Link to={"/user/dashboard"} className="account top__account">
                                                    {
                                                        data?.profilePicture ? <img className="account__image" src={data?.profilePicture} alt=""/> :
                                                            <img className="account__image" src={Avatar} alt=""/>
                                                    }
                                                </Link>
                                            </li>
                                        </>
                                )
                            }
                            {
                                myShopLoading ? (
                                    <ListTitleSkeleton/>
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
                            {
                                productsLoading ? (
                                    <ListTitleSkeleton/>
                                ) : (
                                    <li className="currency top__item">
                                        <Link className="top__link" to="/">
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
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;