import React from 'react';
import "./single-checkout.scss"
// import {Link} from "react-router-dom";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const SingleCheckout = () => {

    return (
        <div className="single-checkout">
            <div className="container">
                <div className="single-checkout__wrapper">
                    <div className="register__glass register__glass-background">
                        <div className="register__head">
                            <h4 className='register__title'>Shipping Address</h4>
                        </div>
                        <form className="form">
                            <div className="form__fields">
                                <p className="form__field">
                                    <label>
                                        <input
                                            // className={formErrors.email ? "form__input-color" : "form__input"}
                                            className="form__input"
                                            type="text"
                                            // value={formData.email}
                                            name="email"
                                            placeholder='Full Name'
                                            // onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            // className={formErrors.email ? "form__input-color" : "form__input"}
                                            className="form__input"
                                            type="text"
                                            // value={formData.email}
                                            name="email"
                                            placeholder='Phone Number'
                                            // onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            // className={formErrors.email ? "form__input-color" : "form__input"}
                                            className="form__input"
                                            type="text"
                                            // value={formData.email}
                                            name="email"
                                            placeholder='Country'
                                            // onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            // className={formErrors.email ? "form__input-color" : "form__input"}
                                            className="form__input"
                                            type="text"
                                            // value={formData.email}
                                            name="email"
                                            placeholder='Email Addess'
                                            // onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            // className={formErrors.email ? "form__input-color" : "form__input"}
                                            className="form__input"
                                            type="text"
                                            // value={formData.email}
                                            name="email"
                                            placeholder='Zip Code'
                                            // onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            // className={formErrors.email ? "form__input-color" : "form__input"}
                                            className="form__input"
                                            type="text"
                                            // value={formData.email}
                                            name="email"
                                            placeholder='City'
                                            // onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            // className={formErrors.email ? "form__input-color" : "form__input"}
                                            className="form__input"
                                            type="text"
                                            // value={formData.email}
                                            name="email"
                                            placeholder='Address 1'
                                            // onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            // className={formErrors.email ? "form__input-color" : "form__input"}
                                            className="form__input"
                                            type="text"
                                            // value={formData.email}
                                            name="email"
                                            placeholder='Address 2'
                                            // onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <button className="form__button" type='submit'>
                                   Go to Payment
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleCheckout;