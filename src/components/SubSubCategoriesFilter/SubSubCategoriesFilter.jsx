import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const SubSubCategoriesFilter = ({subSubCategory, subCategory, category}) => {
    const [productCount, setProductCount] = useState(0);

    const {data: products} = useSelector(state => state.products);

    useEffect(() => {
        const categoryProducts = products?.filter(product => product.category === subSubCategory._id);
        setProductCount(categoryProducts.length);
    }, [products]);

    return (
        <li
            className="children__item">
            <Link to={`/category/${category.slug}/${subCategory.slug}/${subSubCategory.slug}`}
                className="children__link">
                <p className="children__title">{subSubCategory.name}</p>
                <span
                    className="children__count">
                      {
                          productCount
                      }
                </span>
            </Link>
        </li>
    );
};

export default SubSubCategoriesFilter;