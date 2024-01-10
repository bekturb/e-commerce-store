import React from 'react';
import "./seller-sidebar.scss"
import {Link} from "react-router-dom";

const SellerSidebar = () => {
    return (
        <div className="sidebar">
            <aside className="off sidebar__off">
                <div className="off__canvas canvas">
                    <div className="canvas__head">
                        <div className="logo canvas__logo">
                            <a className="logo__link" href="">
                                <span className="logo__circle canvas__circle"></span>.Store
                            </a>
                        </div>
                        <div className="close canvas__close"><i className="ri-close-line"></i></div>
                    </div>
                    <div className="sidebar__item">
                        <div className="sidebar-list">
                            <ul className="sidebar-list__items">
                                <li className="sidebar-list__item">
                                    <Link to="/" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                           <i className="ri-shopping-bag-3-line"></i>
                                        </span>
                                        <h4 className="sidebar-list__title">All Products</h4>
                                    </Link>
                                </li>
                                <li className="sidebar-list__item">
                                    <Link to="/" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                           <i className="ri-shopping-bag-3-line"></i>
                                        </span>
                                        <h4 className="sidebar-list__title">All Products</h4>
                                    </Link>
                                </li>
                                <li className="sidebar-list__item">
                                    <Link to="/" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                           <i className="ri-shopping-bag-3-line"></i>
                                        </span>
                                        <h4 className="sidebar-list__title">All Products</h4>
                                    </Link>
                                </li>
                                <li className="sidebar-list__item">
                                    <Link to="/" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                           <i className="ri-shopping-bag-3-line"></i>
                                        </span>
                                        <h4 className="sidebar-list__title">All Products</h4>
                                    </Link>
                                </li>
                                <li className="sidebar-list__item">
                                    <Link to="/" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                           <i className="ri-shopping-bag-3-line"></i>
                                        </span>
                                        <h4 className="sidebar-list__title">All Products</h4>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default SellerSidebar;