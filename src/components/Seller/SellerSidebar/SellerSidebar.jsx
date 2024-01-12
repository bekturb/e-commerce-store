import React from 'react';
import {Link} from "react-router-dom";
import Avatar from "../../../assets/profile.png";
import "./seller-sidebar.scss";

const SellerSidebar = ({active, openSidebar, setOpenSidebar}) => {

    return (
        <div className="sidebar">
            <aside className={openSidebar ? "off sidebar__off sidebar__off--open" : "off sidebar__off"}>
                <div className="canvas">
                    <div className="sidebar-logo">
                        <div className="sidebar-logo__head">
                            <div className="logo sidebar-logo__logo">
                                <Link className="logo__link" to="/">
                                    <span className="logo__circle sidebar-logo__circle"></span>.Store
                                </Link>
                            </div>
                            <div className="close sidebar-logo__close" onClick={() => setOpenSidebar(false)}>
                                <i className="ri-close-line"></i>
                            </div>
                        </div>
                        <div className="sidebar__item">
                            <div className="sidebar-list">
                                <ul className="sidebar-list__items">
                                    <li className="sidebar-list__item">
                                        <Link to="/shop/dashboard" className={active === 1 ? "sidebar-list__link-active" : "sidebar-list__link"}>
                                        <span className="sidebar-list__icon">
                                           <i className="ri-dashboard-line"></i>
                                        </span>
                                            <h4 className="sidebar-list__title">Dashboard</h4>
                                        </Link>
                                    </li>
                                    <li className="sidebar-list__item">
                                        <Link to="/shop/all-products" className={active === 2 ? "sidebar-list__link-active" : "sidebar-list__link"}>
                                        <span className="sidebar-list__icon">
                                            <i className="ri-box-3-line"></i>
                                        </span>
                                            <h4 className="sidebar-list__title">All Products</h4>
                                        </Link>
                                    </li>
                                    <li className="sidebar-list__item">
                                        <Link to="/shop/all-orders" className={active === 3 ? "sidebar-list__link-active" : "sidebar-list__link"}>
                                        <span className="sidebar-list__icon">
                                           <i className="ri-shopping-bag-3-line"></i>
                                        </span>
                                            <h4 className="sidebar-list__title">All Orders</h4>
                                        </Link>
                                    </li>
                                    <li className="sidebar-list__item">
                                        <Link to="/shop/withdraw-money" className={active === 4 ? "sidebar-list__link-active" : "sidebar-list__link"}>
                                        <span className="sidebar-list__icon">
                                           <i className="ri-money-euro-box-line"></i>
                                        </span>
                                            <h4 className="sidebar-list__title">Withdraw Money</h4>
                                        </Link>
                                    </li>
                                    <li className="sidebar-list__item">
                                        <Link to="/shop/inbox" className={active === 5 ? "sidebar-list__link-active" : "sidebar-list__link"}>
                                        <span className="sidebar-list__icon">
                                             <i className="ri-message-2-line"></i>
                                        </span>
                                            <h4 className="sidebar-list__title">Shop Inbox</h4>
                                        </Link>
                                    </li>
                                    <li className="sidebar-list__item">
                                        <Link to="/shop/discount-codes" className={active === 6 ? "sidebar-list__link-active" : "sidebar-list__link"}>
                                        <span className="sidebar-list__icon">
                                             <i className="ri-gift-line"></i>
                                        </span>
                                            <h4 className="sidebar-list__title">Discount Codes</h4>
                                        </Link>
                                    </li>
                                    <li className="sidebar-list__item">
                                        <Link to="/shop/refunds" className={active === 7 ? "sidebar-list__link-active" : "sidebar-list__link"}>
                                        <span className="sidebar-list__icon">
                                             <i className="ri-refund-line"></i>
                                        </span>
                                            <h4 className="sidebar-list__title">Refunds</h4>
                                        </Link>
                                    </li>
                                    <li className="sidebar-list__item">
                                        <Link to="/shop/settings" className={active === 8 ? "sidebar-list__link-active" : "sidebar-list__link"}>
                                        <span className="sidebar-list__icon">
                                             <i className="ri-settings-2-line"></i>
                                        </span>
                                            <h4 className="sidebar-list__title">Settings</h4>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="account">
                        <img className="account__image" src={Avatar} alt=""/>
                        <h3 className="account__title">Baimamatov Bektursun</h3>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default SellerSidebar;