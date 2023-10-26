import React from 'react';
import Helmet from "../../layout/Helmet";
import SingleCheckout from "../../components/SingleCheckout/SingleCheckout";

const Checkout = () => {
    return (
        <Helmet title="Checkout">
            <SingleCheckout />
        </Helmet>
    );
};

export default Checkout;