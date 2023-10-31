import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const SubCategoriesCart = ({subCategories}) => {

    return (
        <div className="subcategories__item">
            <div className="subcategories__thumbnail thumbnail">
                <Link to={`${subCategories.slug}`}>
                    <div className="subcategories__images">
                        <img className="subcategories__img" src={subCategories.categoryImage} alt=""/>
                    </div>
                    <h3 className="subcategories__title">{subCategories.name}</h3>
                </Link>
            </div>
        </div>
    );
};

export default SubCategoriesCart;