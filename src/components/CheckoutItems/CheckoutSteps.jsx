import React from 'react';
import "./checkout-items.scss"

const CheckoutSteps = ({active}) => {
    return (
        <div className="checkout-steps">
            <div className="container">
                <div className="checkout-steps__wrapper">
                    <div className="checkout-steps__steps">
                        <div className={active >= 1 ? "step shopping" : "step"}>
                            <div className="step__box">
                                1.Shopping
                            </div>
                        </div>
                        <div className={active >= 2 ? "checkout-steps__line  payments" : "checkout-steps__line"}>
                        </div>
                        <div className={active >= 2 ? "step payments" : "step"}>
                            <div className="step__box">
                                2.Payment
                            </div>
                        </div>
                        <div className={active >= 3 ? "checkout-steps__line success" : "checkout-steps__line"}>
                        </div>
                        <div className={active >= 3 ? "step success" : "step"}>
                            3.Success
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSteps;