import React from 'react';
import {Link} from "react-router-dom";

const SubCategoryFilterBlock = ({category, subCategory}) => {
    return (
        <li
            className="filter__item">
            <Link
                to={`/category/${category.slug}/${subCategory.slug}`}>
                <div
                    className="filter__box">
                    <div
                        className="filter__label">
                        <span
                            className="filter__category">{subCategory.name}
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default SubCategoryFilterBlock;