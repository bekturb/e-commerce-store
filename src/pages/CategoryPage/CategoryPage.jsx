import React from 'react';
import Helmet from "../../layout/Helmet";
import SingleCategory from "../../components/SingleCategory/SingleCategory";

const CategoryPage = () => {

    return (
        <Helmet title="Category-Page">
            <SingleCategory />
        </Helmet>
    );
};

export default CategoryPage;