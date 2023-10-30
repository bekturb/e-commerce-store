import React, {useState} from 'react';
import {Link} from "react-router-dom";
import SubSubCategoriesFilter from "../SubSubCategoriesFilter/SubSubCategoriesFilter";
import SubCategoryFilterBlock from "../SubCategoryFilterBlock/SubCategoryFilterBlock";

const CategoryFilterBlock = ({filteredCategories}) => {
    const [showId, setShowId] = useState("");

    const handleToggle = (id) => {
        if (id === showId) {
            setShowId("")
        } else {
            setShowId(id)
        }
    };

    return (
        <div className="filter__block">
            <h4 className="filter__title">Category</h4>
            <ul className="filter__list">
                {
                    filteredCategories?.map(category => (
                        category.children.length > 0 && (
                            category.children.map(subCategory => (
                                subCategory.children.length > 0 ? (
                                    <li key={subCategory._id}
                                        className="filter__item"
                                        onClick={() => handleToggle(subCategory._id)}>
                                        <div
                                            className="filter__box">
                                            <div
                                                className="filter__label">
                                                <Link to={`/category/${category.slug}/${subCategory.slug}`}>
                                                    <span
                                                        className="filter__category">
                                                        {subCategory.name}
                                                    </span>
                                                </Link>
                                            </div>
                                            <span
                                                className="filter__count icon-sm">
                                                {
                                                    subCategory._id === showId ?
                                                        <i className="ri-arrow-down-s-line"></i>
                                                        :
                                                        <i className="ri-arrow-right-s-line"></i>
                                                }
                                            </span>
                                        </div>
                                        {
                                            subCategory.children.length > 0 && (
                                                <div
                                                    className={subCategory._id === showId ? "filter__drop children show-drop" : "filter__drop children"}>
                                                    <ul className="children__list">
                                                        {
                                                            subCategory.children.map(subSubCategory => (
                                                                <SubSubCategoriesFilter
                                                                    key={subSubCategory?._id}
                                                                    category={category}
                                                                    subSubCategory={subSubCategory}
                                                                    subCategory={subCategory}
                                                                />
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </li>
                                ) : (
                                    <SubCategoryFilterBlock category={category} subCategory={subCategory} />
                                )
                            ))
                        )
                    ))
                }
            </ul>
        </div>
    );
};

export default CategoryFilterBlock;