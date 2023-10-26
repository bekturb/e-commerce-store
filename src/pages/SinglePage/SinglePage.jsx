import React from 'react';
import "../../styles/single-page.scss"
import Helmet from "../../layout/Helmet";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import Features from "../../components/Features/Features";
import Banners from "../../components/Banners/Banners";

const SinglePage = () => {
    return (
        <Helmet title="Single-Page">
            <SingleProduct />
            <Features title="Related Products"/>
            <Banners />
        </Helmet>
    );
};

export default SinglePage;