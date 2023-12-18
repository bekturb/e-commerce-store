import React, {useState} from 'react';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    card,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import {useSelector} from "react-redux";
import "./payment-types.scss"
import {useNavigate} from "react-router-dom";
import axios from "../../utils/axios-utils";
import {toast} from "react-hot-toast";

const PaymentByCart = ({orderData}) => {
    const [open, setOpen] = useState(false)
    const {data: user} = useSelector(state => state.authMe);

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Sunflower",
                        amount: {
                            currency_code: "USD",
                            value: orderData?.totalPrice
                        },
                    },
                ],
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID)  => {
                return orderID
            })
    };

    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user && user,
        totalPrice: orderData?.totalPrice,
    }

    const onApprove = async (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { prayer } = details;

            let paymentInfo = prayer;

            if (paymentInfo !== undefined) {
                paypalPaymentHandler(paymentInfo)
            }
        })
    };

    const paypalPaymentHandler = async (paymentInfo) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        order.paymentInfo = {
            id: paymentInfo.payer_id,
            status: "succeeded",
            type: "Paypal",
        }

        await axios
            .post("/api/orders/create-order", order, config)
            .then((res) => {
                setOpen(false);
                navigate("/order/success");
                localStorage.setItem("cart", JSON.stringify([]));
                localStorage.setItem("latestOrder", JSON.stringify([]));
            });
    };

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

    const cashOnDeliveryHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        order.paymentInfo = {
            type: "Cash On Delivery",
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