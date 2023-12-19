import React from 'react';
import Helmet from "../../layout/Helmet";
import CheckoutSteps from "../../components/CheckoutItems/CheckoutSteps";
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess";

const Success = () => {
    return (
        <Helmet title="Payment-success">
            <CheckoutSteps active={3}/>
            <PaymentSuccess/>
        </Helmet>
    );
};

export default Success;