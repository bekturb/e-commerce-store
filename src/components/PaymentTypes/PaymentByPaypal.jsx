import React from 'react';
import "./PaymentByCart"

const PaymentByPaypal = () => {
    return (
        <div className="paypal">
            <div className="paypal__wrapper">
                <form className="form paypal__form">
                    <div className="form__fields paypal__form-fields">
                        <p className="form__field paypal__form-field">
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
                        <button className="primary-button paypal__btn">
                            Pay $1024
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentByPaypal;