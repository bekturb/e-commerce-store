import React, {useEffect, useState} from 'react';

const CartData = () => {
    const [orderData, setOrderData] = useState([])

    const subTotal = orderData?.subTotalPrice?.toFixed(2);

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(orderData);
    },[])

    return (
        <div className="cart__summary summary styled">
            <div className="summary__item">
                <div className="cart-total">
                    <table className="cart-total__table">
                        <tbody className="cart-total__tbody">
                        <tr className="cart-total__item">
                            <th className="cart-total__title">Subtotal</th>
                            <td className="cart-total__subtitle">${subTotal}</td>
                        </tr>
                        <tr className="cart-total__item">
                            <th className="cart-total__title">Discount</th>
                            <td className="cart-total__subtitle">${orderData?.discountPrice}</td>
                        </tr>
                        <tr className="cart-total__item">
                            <th className="cart-total__title">Shipping <span className="mini-text">({orderData?.shippingName})</span></th>
                            <td className="cart-total__subtitle">${orderData?.shipping}</td>
                        </tr>
                        <tr className="cart-total__item">
                            <th className="cart-total__title">TOTAL</th>
                            <td className="cart-total__subtitle-grand"><strong>${orderData?.totalPrice}</strong></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CartData;