import React from 'react';
import {Link} from "react-router-dom";
import Pro from "../../../assets/products/apparel1.jpg"
import "./seller-products.scss"

const SellerAllProducts = () => {
    return (
        <div className="products one cart">
            <div className="cart__wrapper">
                <form className="cart__form--full" action="">
                    <div className="products__item">
                        <table className="cart__table">
                            <thead className="cart__thead">
                            <tr>
                                <th className="cart__list-item">Product</th>
                                <th className="cart__list-item">Vendor Code</th>
                                <th className="cart__list-item">Price</th>
                                <th className="cart__list-item">Stock</th>
                                <th className="cart__list-item">Sold</th>
                                <th className="cart__list-item"></th>
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
                                <td className="cart__content-item">23838832</td>
                                <td className="cart__content-item">$1239</td>
                                <td className="cart__content-item">
                                    129
                                </td>
                                <td className="cart__content-item">
                                    100
                                </td>
                                <td className="cart__content-item">
                                    <span className="item-remove">
                                        <i className="ri-close-line"></i>
                                    </span>
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