import React from 'react';
import {Link} from "react-router-dom";
import {cartProductsActions} from "../../features/cartSlice";
import {useDispatch} from "react-redux";

const HoverMiniCart = ({cartProducts, roundedTotalPrice}) => {

    const dispatch = useDispatch();
    const handleDelete = (proId) => {
       dispatch(cartProductsActions.deleteCartProduct(proId))
    }

    return (
        <div className="mini-cart iscart-mini">
            <div className="mini-cart__content">
                <div className="cart-head mini-cart__head">
                    {cartProducts?.length} items in cart
                </div>
                <div className="cart-body mini-cart__body">
                    {
                        cartProducts?.length > 0 ? (
                            <ul className="products mini">
                                {
                                    cartProducts?.map(pro => (
                                        <li key={pro.variantId} className="products__item mini-cart__item">
                                            <div className="thumbnail">
                                                <Link to={`/catalog/${pro.productId}`} className="products__link">
                                                    <img className="products__image mini-cart__img" src={pro.images[0].url}
                                                         alt=""/>
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
                                            <span className="item-remove" onClick={() => handleDelete(pro.variantId)}>
                                                <i className="ri-close-line"></i>
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : <div>
                            No Data
                        </div>
                    }
                </div>
                <div className="cart-footer">
                    {
                        roundedTotalPrice && (
                            <div className="cart-footer__subtotal">
                                <p className="cart-footer__title">Subtotal</p>
                                <p className="cart-footer__total"><strong>${roundedTotalPrice}</strong></p>
                            </div>
                        )
                    }
                    <div className="cart-footer__actions">
                        {
                            cartProducts.length > 0 && (
                                <Link to="/checkout" className="primary-button cart-footer__btn">Checkout</Link>
                            )
                        }
                        <Link to="/cart-page" className="secondary-button cart-footer__btn">View Cart</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoverMiniCart;