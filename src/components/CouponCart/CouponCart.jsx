import React from 'react';

const CouponCart = ({cartProducts}) => {

    const totalPrice = cartProducts?.reduce((asc, rec) => {
        return asc + (rec.price * rec.quantity)
    }, 0);

    const roundedTotalPrice = totalPrice?.toFixed(2);

    return (
        <div className="cart__summary summary styled">
            <div className="summary__item">
                <div className="summary__coupon coupon">
                    <input type="text" placeholder="Enter coupon" className="coupon__input"/>
                    <button className="coupon__btn">Apply</button>
                </div>
                <div className="cart-total">
                    <table className="cart-total__table">
                        <tbody className="cart-total__tbody">
                        <tr className="cart-total__item">
                            <th className="cart-total__title">Subtotal</th>
                            <td className="cart-total__subtitle">$2155.95</td>
                        </tr>
                        <tr className="cart-total__item">
                            <th className="cart-total__title">Discount</th>
                            <td className="cart-total__subtitle">$100.00</td>
                        </tr>
                        <tr className="cart-total__item">
                            <th className="cart-total__title">Shipping <span className="mini-text">(Flat)</span></th>
                            <td className="cart-total__subtitle">$10.00</td>
                        </tr>
                        <tr className="cart-total__item">
                            <th className="cart-total__title">TOTAL</th>
                            <td className="cart-total__subtitle-grand"><strong>${roundedTotalPrice}</strong></td>
                        </tr>
                        </tbody>
                    </table>
                    <a href="/checkout" className="secondary-button cart-total__btn">Checkout</a>
                </div>
            </div>
        </div>
    );
};

export default CouponCart;