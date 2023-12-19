import React from 'react';
import Helmet from "../../layout/Helmet";
import SingleCheckout from "../../components/SingleCheckout/SingleCheckout";
import CheckoutSteps from "../../components/CheckoutItems/CheckoutSteps";

const Checkout = () => {
    return (
        <Helmet title="Checkout">
            <CheckoutSteps active={1}/>
            <SingleCheckout/>
        </Helmet>
    );
};

export default Checkout;