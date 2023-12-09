import React from 'react';
import product1 from "../../assets/products/home1.jpg";
import product2 from "../../assets/products/home2.jpg";
import product3 from "../../assets/products/home3.jpg";
import product4 from "../../assets/products/home4.jpg";
import product5 from "../../assets/products/home5.jpg";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const HoverMiniCart = () => {
    const {data: cartProducts} = useSelector(state => state.cart);

    return (
        <div  className="mini-cart iscart-mini">
            <div className="mini-cart__content">
                <div className="cart-head mini-cart__head">
                    {cartProducts?.length} items in cart
                </div>
                <div className="cart-body mini-cart__body">
                    <ul className="products mini">
                        {
                            cartProducts?.length > 0 && (
                                cartProducts?.map(pro => (
                                    <li className="products__item mini-cart__item">
                                        <div className="thumbnail">
                                            <Link to={`/catalog/${pro.productId}`} className="products__link">
                                                <img className="products__image mini-cart__img" src={pro.images[0].url} alt=""/>
                                            </Link>
                                        </div>
                                        <div className="item-content">
                                            <p className="item-content__title">
                                                <Link to={`/catalog/${pro.productId}`} className="item-content__link">
                                                    {pro.name}
                                                </Link>
                                            </p>
                                            <span className="mini-cart__price price">
                                             <span>
                                                 ${pro.price}
                                            </span>
                                            <span className="mini-cart__fly-item fly-item">
                                                <span>
                                                    {pro.quantity}x
                                                </span>
                                            </span>
                                        </span>
                                        </div>
                                        <a href="" className="item-remove"><i className="ri-close-line"></i></a>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </div>
                <div className="cart-footer">
                    <div className="cart-footer__subtotal">
                        <p className="cart-footer__title">Subtotal</p>
                        <p className="cart-footer__total"><strong>$1.622.05</strong></p>
                    </div>
                    <div className="cart-footer__actions">
                        <a href="" className="primary-button cart-footer__btn">Checkout</a>
                        <a href="" className="secondary-button cart-footer__btn">View Cart</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoverMiniCart;