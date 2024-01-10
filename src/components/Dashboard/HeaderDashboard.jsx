import React from 'react';
import {Link} from "react-router-dom";
import Avatar from "../../assets/profile.png";
import "./header-dashboard.scss"

const HeaderDashboard = () => {
    return (
        <div className="header-dashboard">
            <div className="container">
                <div className="header-dashboard__wrapper">
                    <div className="nav header-dashboard__nav">
                        <div className="nav__left">
                            <div className="logo">
                                <Link to="/" className="logo__link">
                                    <span className="logo__circle"></span>.Store
                                </Link>
                            </div>
                        </div>
                        <div className="nav__right">
                            <ul className="package">
                                <li className="package__item mobile-hide">
                                    <Link to="/catalog/Wishlist" className="package__link">
                                        <span className="package__icon icon-lg">
                                            <i className="ri-shopping-bag-3-line"></i>
                                        </span>
                                        <span className="fly-item package__fly-item">
                                           <span className="package__number">
                                             1
                                           </span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="package__item mobile-hide">
                                    <Link to="/catalog/Wishlist" className="package__link">
                                        <span className="package__icon icon-lg">
                                            <i className="ri-box-3-line"></i>
                                        </span>
                                        <span className="fly-item package__fly-item">
                                           <span className="package__number">
                                             1
                                           </span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="package__item mobile-hide">
                                    <Link to="/catalog/Wishlist" className="package__link">
                                        <span className="package__icon icon-lg">
                                            <i className="ri-gift-line"></i>
                                        </span>
                                        <span className="fly-item package__fly-item">
                                           <span className="package__number">
                                             1
                                           </span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="package__item iscart">
                                    <div className="package__link">
                                        <div className="package__icon icon-lg">
                                            <i className="ri-message-2-line"></i>
                                            <span className="fly-item package__fly-item">
                                              <span className="package__number">
                                                  1
                                              </span>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="package__item iscart">
                                    <div className="account">
                                        <img className="account__image" src={Avatar} alt=""/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderDashboard;