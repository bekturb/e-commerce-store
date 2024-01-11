import React from 'react';
import CouponCart from "../../CouponCart/CouponCart";
import {Link} from "react-router-dom";
import Pro from "../../../assets/products/apparel1.jpg"
import "./seller-products.scss"

const SellerAllProducts = () => {
    return (
        <div className="products one cart">
            <div className="cart__wrapper">
                <form className="cart__form" action="">
                    <div className="products__item">
                        <table className="cart__table">
                            <thead className="cart__thead">
                            <tr>
                                <th className="cart__list-item">Item</th>
                                <th className="cart__list-item">Price</th>
                                <th className="cart__list-item">Qty</th>
                                <th className="cart__list-item">Subtotal</th>
                                <th className="cart__list-item"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="cart__contents">
                                <td className="flexitem cart__content-item">
                                    <div className="thumbnail cart__thumbnail">
                                        <Link to={`/catalog/:id`} className="products__link">
                                            <img className="products__image cart__img" src={Pro} alt=""/>
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <strong>
                                            <Link to={`/catalog/product`} className="content__link">Name</Link>
                                        </strong>
                                        <p className="content__color">Color: red</p>
                                    </div>
                                </td>
                                <td className="cart__content-item">$222</td>
                                <td className="cart__content-item">
                                    <div className="cart__qty-control qty-control flexitem">
                                        <button className="cart__minus" >-</button>
                                        <input className="cart__input" type="text"  min="1"/>
                                        <button className="cart__plus">+</button>
                                    </div>
                                </td>
                                <td className="cart__content-item">
                                    129
                                </td>
                                <td className="cart__content-item">
                                    <span className="item-remove">
                                        <i className="ri-close-line"></i>
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellerAllProducts;