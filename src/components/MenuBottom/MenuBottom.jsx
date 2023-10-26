import React from 'react';
import "./menu-bottom.scss"
import {cartActions} from "../../features/miniCartSlice";
import {useDispatch, useSelector} from "react-redux";

const MenuBottom = ({setShowSearchBottom}) => {

    const dispatch = useDispatch();

    function openCart () {
        setTimeout(() => {
            dispatch(cartActions.showCart())
        }, 250);

    }

    return (
        <div className="menu-bottom desktop-hide">
            <div className="container">
                <div className="menu-bottom__wrapper">
                    <nav className="menu-bottom__nav">
                        <ul className="menu-bottom__list flexitem">
                            <li className="menu-bottom__item">
                                <a href="" className="menu-bottom__link">
                                    <i className="ri-bar-chart-line"></i>
                                    <span className="menu-bottom__span">Trending</span>
                                </a>
                            </li>
                            <li className="menu-bottom__item">
                                <a href="" className="menu-bottom__link">
                                    <i className="ri-user-6-line"></i>
                                    <span className="menu-bottom__span">Account</span>
                                </a>
                            </li>
                            <li className="menu-bottom__item">
                                <a href="" className="menu-bottom__link">
                                    <i className="ri-heart-line"></i>
                                    <span className="menu-bottom__span">Wishlist</span>
                                </a>
                            </li>
                            <li className="menu-bottom__item">
                                <div className="menu-bottom__link" onClick={() => setShowSearchBottom(true)}>
                                    <i className="ri-search-line"></i>
                                    <span className="menu-bottom__span">Search</span>
                                </div>
                            </li>
                            <li className="menu-bottom__item">
                                <div onClick={openCart} className="menu-bottom__link">
                                    <i className="ri-shopping-cart-line"></i>
                                    <span className="menu-bottom__span">Cart</span>
                                    <div className="fly-item menu-bottom__fly-item">
                                         <span className="fly-item__number">
                                                0
                                            </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MenuBottom;