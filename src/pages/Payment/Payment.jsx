import React from 'react';
import Helmet from "../../layout/Helmet";
import "../../styles/payment.scss";
import CartData from "../../components/CartData/CartData";

const Payment = () => {
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
                                            id="cart"
                                        />
                                        <label htmlFor="cart" className="radio-with-text__label">
                                            <span className="radio-with-text__decor"></span>
                                            <span className="radio-with-text__text">
                                                Pay by Cart
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="variety payment__variety">
                                <div className="variety__head">
                                    <div className="radio-with-text">
                                        <input
                                            name="filter"
                                            className="radio-with-text__input"
                                            type="radio"
                                            id="email"
                                        />
                                        <label htmlFor="email" className="radio-with-text__label">
                                            <span className="radio-with-text__decor"></span>
                                            <span className="radio-with-text__text">
                                                Pay by Email
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="variety payment__variety">
                                <div className="variety__head">
                                    <div className="radio-with-text">
                                        <input
                                            name="filter"
                                            className="radio-with-text__input"
                                            type="radio"
                                            id="cash"
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
                            <button className="primary-button payment__btn">
                                Pay $1024
                            </button>
                        </div>
                        <CartData />
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Payment;