import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import CartData from "../../components/CartData/CartData";
import PaymentByCart from "../../components/PaymentTypes/PaymentByCart";
import PaymentByPaypal from "../../components/PaymentTypes/PaymentByPaypal";
import "../../styles/payment.scss";

const Payment = () => {
    const [paymentType, setPaymentType] = useState(1);

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
                                        <PaymentByCart />
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
                                        <PaymentByPaypal />
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
                                        Pay $1024
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