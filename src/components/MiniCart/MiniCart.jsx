import React, {useEffect, useRef} from 'react';
import product1 from "../../assets/products/home1.jpg";
import product2 from "../../assets/products/home2.jpg";
import product3 from "../../assets/products/home3.jpg";
import product4 from "../../assets/products/home4.jpg";
import product5 from "../../assets/products/home5.jpg";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../features/miniCartSlice";
import "./mini-cart.scss";
import categoryProducts from "../CategoryProducts/CategoryProducts";
import {Link} from "react-router-dom";
import {cartProductsActions} from "../../features/cartSlice";

const MiniCart = ({cartProducts, roundedTotalPrice}) => {
    const showRef = useRef(null);
    const dispatch = useDispatch();
    const {showCart} = useSelector(state => state.showCart);
    const handleDelete = (proId) => {
        dispatch(cartProductsActions.deleteCartProduct(proId))
    }

    const handleOutsideClick = (e) => {
        if (showRef.current && !showRef.current.contains(e.target)) {
            dispatch(cartActions.closeCart());
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <>
            {showCart && (
                <div ref={showRef} className="mini-cart show">
                    <div className="mini-cart__content">
                        <div className="cart-head mini-cart__head">
                            {cartProducts?.length} items in cart
                        </div>
                        <div className="cart-body mini-cart__body">
                            {
                                cartProducts?.length > 0 ? (
                                    <ul className="products mini">
                                        {
                                            categoryProducts?.map(pro => (
                                                <li key={pro.variantId} className="products__item mini-cart__item">
                                                    <div className="thumbnail">
                                                        <Link to={`/catalog/${pro.productId}`} className="products__link">
                                                            <img className="products__image mini-cart__img"
                                                                 src={pro.images[0].url} alt=""/>
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
                                ) :
                                    <div>
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
            )}
        </>
    );
};

export default MiniCart;