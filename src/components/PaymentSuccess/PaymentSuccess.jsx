import React from 'react';
import "./payment-success.scss";

const PaymentSuccess = () => {
    return (
        <div className="success">
            <div className="container">
                <div className="success__wrapper">
                    <div className="success__popup">
                        <div className="success__icon">
                            <span className="success__check">
                                < i className="ri-check-line"></i>
                            </span>
                        </div>
                        <div className="success__title">
                            Success!!
                        </div>
                        <div className="success__description">
                            Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit.
                            Autem culpa illum laborum rem vel!
                        </div>
                        <div className="success__btn">
                            <button className="primary-button success__button">
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;