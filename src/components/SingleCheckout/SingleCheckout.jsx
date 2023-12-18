import React, {useEffect, useState} from 'react';
import CartData from "../CartData/CartData";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./single-checkout.scss"

const SingleCheckout = () => {

    const [userInfo, setUserInfo] = useState({
        address1: "",
        address2: "",
        country: "",
        city: "",
        zipCode: ""
    });
    const [userInfoErrors, setUserInfoErrors] = useState({});
    const [latestOrder, setLatestOrder] = useState([]);
    const {data: user} = useSelector(state => state.authMe);

    const navigate = useNavigate();

    const handleInputChange = async (event) => {
        const {name, value} = event.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(userInfo);
        setUserInfoErrors(errors);
        if (Object.keys(errors).length === 0) {
            const orderData = {
                cart: latestOrder?.cart,
                totalPrice: latestOrder?.totalPrice,
                subTotalPrice: latestOrder?.subTotalPrice,
                discountPrice: latestOrder?.subTotalPrice,
                shipping: latestOrder?.shipping,
                shippingName: latestOrder?.shippingName,
                shippingAddress: userInfo,
                user
            }

            localStorage.setItem("latestOrder",  JSON.stringify(orderData));
            navigate("/payment")
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (data.address1 === "") {
            errors.address1 = "Address 1 shouldn't be empty"
        }

        if (data.address2 === "") {
            errors.address2 = "Address 2 shouldn't be empty"
        }

        if (data.country === "") {
            errors.country = "Country shouldn't be empty"
        }

        if (data.city === "") {
            errors.city = "City shouldn't be empty"
        }

        if (data.zipCode === "") {
            errors.zipCode = "Zip code shouldn't be empty"
        }

        return errors
    };

    useEffect(() => {
        const storedCartProducts = localStorage.getItem('latestOrder');
        if (storedCartProducts) {
            setLatestOrder(JSON.parse(storedCartProducts))
        }
    }, []);

    return (
        <div className="single-checkout">
            <div className="container">
                <div className="single-checkout__wrapper flexwrap">
                    <div className="register__glass register__glass-background">
                        <div className="register__head">
                            <h4 className='register__title'>Shipping Address</h4>
                        </div>
                        <form className="form" onSubmit={onSubmit}>
                            <div className="form__fields">
                                <p className="form__field">
                                    <label>
                                        <input
                                            className="form__input"
                                            type="text"
                                            value={user && `${user.firstName} ${user.lastName}`}
                                            required
                                            disabled
                                            name="fullname"
                                            placeholder='Full Name'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className="form__input"
                                            type="text"
                                            value={user && user.phoneNumber}
                                            name="number"
                                            required
                                            disabled
                                            placeholder='Phone Number'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={userInfoErrors.country ? "form__input-color" : "form__input"}
                                            type="text"
                                            value={userInfo.country}
                                            name="country"
                                            placeholder='Country'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={userInfoErrors.email ? "form__input-color" : "form__input"}
                                            type="text"
                                            value={user && user.email}
                                            required
                                            name="email"
                                            disabled
                                            placeholder='Email Addess'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={userInfoErrors.zipCode ? "form__input-color" : "form__input"}
                                            type="text"
                                            value={userInfo.zipCode}
                                            name="zipCode"
                                            placeholder='Zip Code'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={userInfoErrors.city ? "form__input-color" : "form__input"}
                                            type="text"
                                            value={userInfo.city}
                                            name="city"
                                            placeholder='City'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={userInfoErrors.address1 ? "form__input-color" : "form__input"}
                                            type="text"
                                            value={userInfo.address1}
                                            name="address1"
                                            placeholder='Address 1'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={userInfoErrors.address2 ? "form__input-color" : "form__input"}
                                            type="text"
                                            value={userInfo.address2}
                                            name="address2"
                                            placeholder='Address 2'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                </p>
                                <button className="form__button" type='submit'>
                                   Go to Payment
                                </button>
                            </div>
                        </form>
                    </div>
                    <CartData/>
                </div>
            </div>
        </div>
    );
};

export default SingleCheckout;