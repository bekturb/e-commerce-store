import React from 'react';
import Helmet from "../../layout/Helmet";
import Slider from "../../components/Slider";
import Brands from "../../components/Brands/Brands";
import Trending from "../../components/Trending/Trending";
import Features from "../../components/Features/Features";

const Home = () => {
    return (
        <Helmet title="Home">
            <Slider />
            <Brands />
            <Trending />
            <Features title="Features Products"/>
        </Helmet>
    );
};

export default Home;