import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {cartProductsActions} from "../../features/cartSlice";

const CartProduct = ({pro}) => {

    const dispatch = useDispatch();

    const handleDelete = (proId) => {
        dispatch(cartProductsActions.deleteCartProduct(proId))
    }

    const totalPrice = pro?.price * pro?.quantity;

    return (
        <tr className="cart__contents">
            <td className="flexitem cart__content-item">
                <div className="thumbnail cart__thumbnail">
                    <Link to={`/catalog/${pro.productId}`} className="products__link">
                        <img className="products__image cart__img" src={pro.images[0].url} alt=""/>
                    </Link>
                </div>
                <div className="content">
                    <strong>
                        <Link to={`/catalog/${pro.productId}`} className="content__link">{pro.name}</Link>
                    </strong>
                    <p className="content__color">Color: {pro.color}</p>
                </div>
            </td>
            <td className="cart__content-item">${pro.price}</td>
            <td className="cart__content-item">
                <div className="cart__qty-control qty-control flexitem">
                    <button className="cart__minus">-</button>
                    <input className="cart__input" type="text" value={pro.quantity} min="1"/>
                    <button className="cart__plus">+</button>
                </div>
            </td>
            <td className="cart__content-item">
                ${totalPrice}
            </td>
            <td className="cart__content-item">
                <span className="item-remove" onClick={() => handleDelete(pro.variantId)}>
                    <i className="ri-close-line"></i>
                </span>
            </td>
        </tr>
    );
};

export default CartProduct;