import React from 'react';

const SingleCheckout = () => {

    return (
        <div className="single-checkout">
            <div className="container">
                <div className="single-checkout__wrapper">
                    <div className="checkout flexwrap">
                        <div className="checkout__item left styled">
                            <h1 className="checkout__title">Shipping Address</h1>
                            <form action="" className="checkout__form">
                                <p className="checkout__field">
                                    <label className="checkout__label" htmlFor="email">Email Address <span></span></label>
                                    <input className="checkout__title__input" type="email" name="email" id="email" autoComplete="off" required/>
                                </p>
                                <p className="checkout__field">
                                    <label className="checkout__label" htmlFor="name">First Name <span></span></label>
                                    <input className="checkout__title__input" type="text" id="name" autoComplete="off" required/>
                                </p>
                                <p className="checkout__field">
                                    <label className="checkout__label" htmlFor="lname">Last Name <span></span></label>
                                    <input className="checkout__title__input" type="text" id="lname" autoComplete="off" required/>
                                </p>
                                <p className="checkout__field">
                                    <label className="checkout__label" htmlFor="cname">Company Name</label>
                                    <input className="checkout__title__input" type="text" id="cname" autoComplete="off" required/>
                                </p>
                                <p className="checkout__field">
                                    <label className="checkout__label" htmlFor="address">Street Address <span></span></label>
                                    <input className="checkout__title__input" type="text" id="address" autoComplete="off" required/>
                                </p>
                                <p className="checkout__field">
                                    <label className="checkout__label" htmlFor="city">City<span></span></label>
                                    <input className="checkout__title__input" type="text" id="city" autoComplete="off" required/>
                                </p>
                                <p className="checkout__field">
                                    <label className="checkout__label" htmlFor="state">State/Province<span></span></label>
                                    <input className="checkout__title__input" type="text" id="state" autoComplete="off" required/>
                                </p>
                                <p className="checkout__field">
                                    <label className="checkout__label" htmlFor="postal">Zip / Postal Code<span></span></label>
                                    <input className="checkout__title__input" type="number" id="postal" autoComplete="off" required/>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCheckout;