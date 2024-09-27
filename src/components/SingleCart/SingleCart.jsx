import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CartProduct from "../CartProduct/CartProduct";
import CouponCart from "../CouponCart/CouponCart";
import "./single-cart.scss"

const SingleCart = () => {

    const {data: cartProducts} = useSelector(state => state.cart);

    return (
        <div className="single-cart">
            <div className="container">
                <div className="single-cart__wrapper">
                    <div className="breadcrumb">
                        <ul className="breadcrumb__list flexitem">
                            <li className="breadcrumb__item">
                                <Link to="/" className="breadcrumb__link">Home</Link>
                            </li>
                            <li className="breadcrumb__item">
                                <Link to="/cart-page" className="breadcrumb__link">Cart</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="single-cart__page">
                        <h1 className="single-cart__title">Shopping Cart</h1>
                    </div>
                    {
                        cartProducts?.length > 0 ?(
                            <div className="products one cart">
                                <div className="flexwrap">
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
                                                {
                                                    cartProducts?.map(pro => (
                                                        <CartProduct key={pro.variantId} pro={pro}/>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </form>
                                    <CouponCart cartProducts={cartProducts}/>
                                </div>
                            </div>
                        ) : <div>Not found</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleCart;