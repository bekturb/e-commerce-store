import React from 'react';
import Helmet from "../../layout/Helmet";
import SingleCart from "../../components/SingleCart/SingleCart";

const Cart = () => {
    console.log(Beka);
    
    return (
        <Helmet title="Cart">
            <SingleCart />
        </Helmet>
    );
};

export default Cart;