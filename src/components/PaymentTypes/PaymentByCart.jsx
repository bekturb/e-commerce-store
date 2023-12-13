import React from 'react';
import "./payment-types.scss"

const PaymentByCart = () => {
    return (
        <div className="cart-payment">
            <div className="cart-payment__wrapper">
                <form className="form cart-payment__form">
                    <div className="form__fields cart-payment__form-fields">
                        <p className="form__field cart-payment__form-field">
                            <label>
                                <input
                                    // className={formErrors.email ? "form__input-color" : "form__input"}
                                    className="form__input"
                                    type="text"
                                    name="email"
                                    placeholder='Email*'
                                />
                            </label>
                        </p>
                        <p className="form__field cart-payment__form-field">
                            <label>
                                <input
                                    // className={formErrors.email ? "form__input-color" : "form__input"}
                                    className="form__input"
                                    type="text"
                                    name="email"
                                    placeholder='Email*'
                                />
                            </label>
                        </p>

                        <p className="form__field cart-payment__form-field">
                            <label>
                                <input
                                    // className={formErrors.email ? "form__input-color" : "form__input"}
                                    className="form__input"
                                    type="text"
                                    name="email"
                                    placeholder='Email*'
                                />
                            </label>
                        </p>
                        <p className="form__field cart-payment__form-field">
                            <label>
                                <input
                                    // className={formErrors.email ? "form__input-color" : "form__input"}
                                    className="form__input"
                                    type="text"
                                    name="email"
                                    placeholder='Email*'
                                />
                            </label>
                        </p>
                        <button className="primary-button cart-payment__btn">
                            Pay $1024
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentByCart;