import React from 'react';
import "./PaymentByCart"
import axios from "../../utils/axios-utils";
import {useNavigate} from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import { RxCross1 } from "react-icons/rx";

const PaymentByPaypal = ({orderData, order, setOpen, open}) => {

    const navigate = useNavigate();

    const initialOptions = {
        clientId: `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
        currency: "USD",
        intent: "capture",
        components: "buttons"
    };

    const style = {"layout":"vertical"};

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

    return (
        <div className="paypal">
            <div className="paypal__wrapper">
                <div className="paypal__button">
                    <button
                        className="primary-button paypal__btn"
                        onClick={() => setOpen(true)}
                    >
                        Pay Now
                    </button>
                </div>
                {
                    open && (
                        <div className="form paypal__form">
                            <div className="form__fields paypal__form-fields">
                                <div className="paypal__close-icon" onClick={() => setOpen(false)}>
                                    <RxCross1/>
                                </div>
                                <PayPalScriptProvider  options={initialOptions}>
                                    <div className="paypal__custom-btn">
                                        <PayPalButtons
                                            style={style}
                                            disabled={false}
                                            forceReRender={[style]}
                                            fundingSource={undefined}
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                        />
                                    </div>
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default PaymentByPaypal;