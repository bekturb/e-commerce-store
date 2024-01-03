import React from 'react';
import {Link} from "react-router-dom";
import "./aside-top.scss"
import {useSelector} from "react-redux";

const AsideTopNav = () => {

    const {isAuthenticated} = useSelector(state => state.authMe);

    return (
        <div className="nav-top top">
            <div className="top__wrapper">
                <div className="top__left">
                    <ul className="top__links">
                        <li className="top__item"><Link className="top__link" to="/">Blog</Link></li>
                        <li className="top__item"><Link className="top__link" to="/catalog/featured-products">Featured Products</Link></li>
                        <li className="top__item"><Link className="top__link" to="/catalog/Wishlist">Wishlist</Link></li>
                    </ul>
                </div>
                <div className="top__right">
                    <ul className="top__links">
                        {
                            isAuthenticated === false && (
                                <li className="top__item"><Link className="top__link" to="/register">Sign Up</Link></li>
                            )
                        }
                        {
                            isAuthenticated === false && (
                                <li className="top__item"><Link className="top__link" to="/login">Sign In</Link></li>
                            )
                        }
                        {
                            isAuthenticated && (
                                <li className="top__item"><Link className="top__link" to="/">My Account</Link></li>
                            )
                        }
                        <li className="top__item"><Link className="top__link" to="/">Become Seller</Link></li>
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