import React, {useState} from 'react';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import {useSelector} from "react-redux";
import "./payment-types.scss"
import {useNavigate} from "react-router-dom";
import axios from "../../utils/axios-utils";
import {toast} from "react-hot-toast";

const PaymentByCart = ({orderData, setOpen, order}) => {
    const {data: user} = useSelector(state => state.authMe);

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100),
    }

    const paymentHandler = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };

            const { data } = await axios.post("/api/payment/process", paymentData, config);

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method : {
                    card: elements.getElement(CardNumberElement),
                }
            });

            if (result.error) {
                toast.error(result.error.message);
            }else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                        type: "Credit Card",
                    };
                    await axios
                        .post("/api/orders/create-order", order, config)
                        .then((res) => {
                            setOpen(false);
                            navigate("/order/success");
                            localStorage.setItem("cart", JSON.stringify([]));
                            localStorage.setItem("latestOrder", JSON.stringify([]));
                            window.location.reload();
                        });
                }
            }
        } catch (error) {
            toast.error(error)
        }
    };

    return (
        <div className="cart-payment">
            <div className="cart-payment__wrapper">
                <form className="form cart-payment__form" onSubmit={paymentHandler}>
                    <div className="form__fields cart-payment__form-fields">
                        <p className="form__field cart-payment__form-field">
                            <label className="form__label">
                                Name on Card
                                <input
                                    // className={formErrors.email ? "form__input-color" : "form__input"}
                                    className="form__input"
                                    value={user && `${user.firstName} ${user.lastName}`}
                                    type="text"
                                    name="nameOnCard"
                                />
                            </label>
                        </p>
                        <p className="form__field cart-payment__form-field">
                            <label className="form__label">
                                Exp Date
                                <CardExpiryElement
                                    className="form__input"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "15px",
                                                color: "#444",
                                                backgroundColor: "white",
                                            }
                                        }
                                    }}
                                />
                            </label>
                        </p>
                        <p className="form__field cart-payment__form-field">
                            <label className="form__label">
                                Card Number
                                <CardNumberElement
                                    className="form__input"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "15px",
                                                color: "#444",
                                                backgroundColor: "white",
                                            }
                                        }
                                    }}
                                />
                            </label>
                        </p>
                        <p className="form__field cart-payment__form-field">
                            <label className="form__label">
                                CVV
                                <CardCvcElement
                                    className="form__input"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "15px",
                                                color: "#444",
                                                backgroundColor: "white",
                                            }
                                        }
                                    }}
                                />
                            </label>
                        </p>
                        <button className="primary-button cart-payment__btn" type="submit">
                            Pay ${orderData.totalPrice}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentByCart;