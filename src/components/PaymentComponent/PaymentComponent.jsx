import React, {useEffect, useState} from 'react';
import PaymentByCart from "../PaymentTypes/PaymentByCart";
import PaymentByPaypal from "../PaymentTypes/PaymentByPaypal";
import CashPayment from "../PaymentTypes/CashPayment";
import CartData from "../CartData/CartData";
import {useSelector} from "react-redux";

const PaymentComponent = () => {

    const [paymentType, setPaymentType] = useState(1);
    const [orderData, setOrderData] = useState([]);
    const [open, setOpen] = useState(false);
    const {data: user} = useSelector(state => state.authMe);

    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user && user,
        totalPrice: orderData?.totalPrice,
    }

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(orderData);
    },[])

    return (
        <div className="payment">
            <div className="container">
                <div className="payment__into">
                    <div className="secTop secTop-position flexitem">
                        <h2 className="secTop__inner">
                            <span className="secTop__circle circle"></span>
                            <span className="secTop__title">Payment</span>
                        </h2>
                    </div>
                    <div className="payment__wrapper flexwrap">
                        <div className="payment__types">
                            <div className="variety payment__variety">
                                <div className="variety__head">
                                    <div className="radio-with-text">
                                        <input
                                            name="filter"
                                            className="radio-with-text__input"
                                            type="radio"
                                            checked={paymentType === 1}
                                            id="cart"
                                            onChange={() => setPaymentType(1)}
                                        />
                                        <label htmlFor="cart" className="radio-with-text__label">
                                            <span className="radio-with-text__decor"></span>
                                            <span className="radio-with-text__text">
                                                Pay by Cart
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                {
                                    paymentType === 1 && (
                                        <PaymentByCart orderData={orderData} setOpen={setOpen} order={order} />
                                    )
                                }
                            </div>
                            <div className="variety payment__variety">
                                <div className="variety__head">
                                    <div className="radio-with-text">
                                        <input
                                            name="filter"
                                            className="radio-with-text__input"
                                            type="radio"
                                            checked={paymentType === 2}
                                            id="paypal"
                                            onChange={() => setPaymentType(2)}
                                        />
                                        <label htmlFor="paypal" className="radio-with-text__label">
                                            <span className="radio-with-text__decor"></span>
                                            <span className="radio-with-text__text">
                                                Pay by Email
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                {
                                    paymentType === 2 && (
                                        <PaymentByPaypal
                                            orderData={orderData}
                                            setOpen={setOpen}
                                            order={order}
                                            open={open}/>
                                    )
                                }
                            </div>
                            <div className="variety payment__variety">
                                <div className="variety__head">
                                    <div className="radio-with-text">
                                        <input
                                            name="filter"
                                            className="radio-with-text__input"
                                            type="radio"
                                            checked={paymentType === 3}
                                            id="cash"
                                            onChange={() => setPaymentType(3)}
                                        />
                                        <label htmlFor="cash" className="radio-with-text__label">
                                            <span className="radio-with-text__decor"></span>
                                            <span className="radio-with-text__text">
                                                Pay by Cash
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                paymentType === 3 && (
                                    <CashPayment
                                        setOpen={setOpen}
                                        order={order}
                                    />
                                )
                            }
                        </div>
                        <CartData />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;