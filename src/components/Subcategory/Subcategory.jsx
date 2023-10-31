import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import SubCategoryFilterBlock from "../SubCategoryFilterBlock/SubCategoryFilterBlock";
import SubCategoriesCart from "../SubCategoriesCart/SubCategoriesCart";
import "./subcategory.scss";

const Subcategory = ({category, allCategories, showMenu, showRef}) => {
    const [filteredCategories, setFilteredCategories] = useState([])

    useEffect(() => {
        const subCategories = allCategories?.filter(subCat => subCat.parentId === category._id);
        setFilteredCategories(subCategories)
    }, [allCategories, category]);

    return (
        <Helmet title="Category Page">
            <div className="single-category">
                <div className="container">
                    <div className="single-category__wrapper">
                        <div className="column single-category__column">
                            <div className="single-category__holder">
                                <div className="row single-category__sidebar">
                                    <div ref={showRef} className="single-category__filter filter">
                                        <div className="filter__block">
                                            <h4 className="filter__title">Category</h4>
                                            <ul className="filter__list">
                                                {
                                                    filteredCategories?.map(subCategory => (
                                                        <SubCategoryFilterBlock key={subCategory._id}
                                                                                category={category}
                                                                                subCategory={subCategory}
                                                        />
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="section single-category__section">
                                    <div className="row section__row">
                                        <div className="cat-head">
                                            <div className="breadcrumb">
                                                <ul className="breadcrumb__list flexitem">
                                                    <li className="breadcrumb__item">
                                                        <a className="breadcrumb__link" href="#">Home</a>
                                                    </li>
                                                    <li className="breadcrumb__item">
                                                        <a className="breadcrumb__link" href="#">{category?.name}</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="cat-head__page">
                                                <h1 className="cat-head__title">
                                                    {category?.name}
                                                </h1>
                                            </div>
                                            <div className="cat-navigation flexitem">
                                                <div className="cat-navigation__filter desktop-hide">
                                                    <div className="cat-navigation__filter-trigger" onClick={showMenu}>
                                                        <i className="ri-menu-2-line ri-2x"></i>
                                                        <span className="cat-navigation__filter-title">filter</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="subcategories">
                                        {
                                            filteredCategories?.map(subCategories => (
                                                <SubCategoriesCart
                                                    key={subCategories._id}
                                                    subCategories={subCategories}
                                                    category={category}
                                                    allCategories={allCategories}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Subcategory;