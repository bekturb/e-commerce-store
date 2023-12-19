import React from 'react';
import axios from "../../utils/axios-utils";
import {useNavigate} from "react-router-dom";

const CashPayment = ({ setOpen, order}) => {

    const navigate = useNavigate();

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
        <form className="form cart-payment__form" onSubmit={cashOnDeliveryHandler}>
            <div className="form__fields cart-payment__form-fields">
                <p className="form__field cart-payment__form-field">
                    <label className="form__label">
                        <button className="primary-button payment__btn" type="submit">
                            Confirm
                        </button>
                    </label>
                </p>
            </div>
        </form>
    );
};

export default CashPayment;