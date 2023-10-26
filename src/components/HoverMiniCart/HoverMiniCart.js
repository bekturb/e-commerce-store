import React from 'react';
import product1 from "../../assets/products/home1.jpg";
import product2 from "../../assets/products/home2.jpg";
import product3 from "../../assets/products/home3.jpg";
import product4 from "../../assets/products/home4.jpg";
import product5 from "../../assets/products/home5.jpg";

const HoverMiniCart = () => {
    return (
        <div  className="mini-cart iscart-mini">
            <div className="mini-cart__content">
                <div className="cart-head mini-cart__head">
                    5 items in cart
                </div>
                <div className="cart-body mini-cart__body">
                    <ul className="products mini">
                        <li className="products__item mini-cart__item">
                            <div className="thumbnail">
                                <a className="products__link" href="">
                                    <img className="products__image mini-cart__img" src={product1} alt=""/>
                                </a>
                            </div>
                            <div className="item-content">
                                <p className="item-content__title">
                                    <a href="" className="item-content__link">
                                        Dimmable Ceiling Light Modern
                                    </a>
                                </p>
                                <span className="mini-cart__price price">
                                <span>
                                    $279.99
                                </span>
                                <span className="mini-cart__fly-item fly-item">
                                    <span>
                                        2x
                                    </span>
                                </span>
                            </span>
                            </div>
                            <a href="" className="item-remove"><i className="ri-close-line"></i></a>
                        </li>
                        <li className="products__item mini-cart__item">
                            <div className="thumbnail">
                                <a className="products__link" href="">
                                    <img className="products__image mini-cart__img" src={product2} alt=""/>
                                </a>
                            </div>
                            <div className="item-content">
                                <p className="item-content__title">
                                    <a href="" className="item-content__link">
                                        Dimmable Ceiling Light Modern
                                    </a>
                                </p>
                                <span className="mini-cart__price price">
                                <span>
                                    $279.99
                                </span>
                                <span className="mini-cart__fly-item fly-item">
                                    <span>
                                        2x
                                    </span>
                                </span>
                            </span>
                            </div>
                            <a href="" className="item-remove"><i className="ri-close-line"></i></a>
                        </li>
                        <li className="products__item mini-cart__item">
                            <div className="thumbnail">
                                <a className="products__link" href="">
                                    <img className="products__image mini-cart__img" src={product3} alt=""/>
                                </a>
                            </div>
                            <div className="item-content">
                                <p className="item-content__title">
                                    <a href="" className="item-content__link">
                                        Modern Storage Cabinet with Door & 3 Drawers
                                    </a>
                                </p>
                                <span className="mini-cart__price price">
                                <span>
                                    $129.99
                                </span>
                                <span className="mini-cart__fly-item fly-item">
                                    <span>
                                        1x
                                    </span>
                                </span>
                            </span>
                            </div>
                            <a href="" className="item-remove"><i className="ri-close-line"></i></a>
                        </li>
                        <li className="products__item mini-cart__item">
                            <div className="thumbnail">
                                <a className="products__link" href="">
                                    <img className="products__image mini-cart__img" src={product4} alt=""/>
                                </a>
                            </div>
                            <div className="item-content">
                                <p className="item-content__title">
                                    <a href="" className="item-content__link">
                                        Vosanda Velvet Sofa Couch
                                    </a>
                                </p>
                                <span className="mini-cart__price price">
                                <span>
                                    $352.99
                                </span>
                                <span className="mini-cart__fly-item fly-item">
                                    <span>
                                        1x
                                    </span>
                                </span>
                            </span>
                            </div>
                            <a href="" className="item-remove"><i className="ri-close-line"></i></a>
                        </li>
                        <li className="products__item mini-cart__item">
                            <div className="thumbnail">
                                <a className="products__link" href="">
                                    <img className="products__image mini-cart__img" src={product5} alt=""/>
                                </a>
                            </div>
                            <div className="item-content">
                                <p className="item-content__title">
                                    <a href="" className="item-content__link">
                                        Awesome Bed For a Couple
                                    </a>
                                </p>
                                <span className="mini-cart__price price">
                                <span>
                                    $579.99
                                </span>
                                <span className="mini-cart__fly-item fly-item">
                                    <span>
                                        1x
                                    </span>
                                </span>
                            </span>
                            </div>
                            <a href="" className="item-remove"><i className="ri-close-line"></i></a>
                        </li>
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