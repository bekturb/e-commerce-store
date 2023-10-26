import React from 'react';
import "../../styles/offer-page.scss"
import Banners from "../../components/Banners/Banners";
import Helmet from "../../layout/Helmet";
import OfferProduct from "../../components/OfferProduct/OfferProduct";
import OfferRelated from "../../components/OfferRelated/OfferRelated";

const OfferPage = () => {
    return (
        <Helmet title="Offer-Page">
            <OfferProduct />
            <OfferRelated title="Related Products"/>
            <Banners />
        </Helmet>
    );
};

export default OfferPage;