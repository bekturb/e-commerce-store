import React from 'react';
import Banners from "../../components/Banners/Banners";
import Helmet from "../../layout/Helmet";
import SingleCategory from "../../components/SingleCategory/SingleCategory";

const CategoryPage = () => {

    return (
        <Helmet title="Category-Page">
            <SingleCategory />
            <Banners />
        </Helmet>
    );
};

export default CategoryPage;