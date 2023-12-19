import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import CartData from "../../components/CartData/CartData";
import PaymentByCart from "../../components/PaymentTypes/PaymentByCart";
import PaymentByPaypal from "../../components/PaymentTypes/PaymentByPaypal";
import {useSelector} from "react-redux";
import "../../styles/payment.scss";

const Payment = () => {
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
        <Helmet title="Payment-page">
            <div className="payment">
                <div className="container">
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
                                    <button className="primary-button payment__btn">
                                        Pay ${orderData.totalPrice}
                                    </button>
                                )
                            }
                        </div>
                        <CartData />
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Payment;