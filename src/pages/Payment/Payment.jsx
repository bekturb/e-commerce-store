import React from 'react';
import Helmet from "../../layout/Helmet";
import PaymentComponent from "../../components/PaymentComponent/PaymentComponent";
import "../../styles/payment.scss";
import CheckoutSteps from "../../components/CheckoutItems/CheckoutSteps";

const Payment = () => {

    return (
        <Helmet title="PaymentComponent-page">
            <CheckoutSteps active={2}/>
            <PaymentComponent/>
        </Helmet>
    );
};

export default Payment;