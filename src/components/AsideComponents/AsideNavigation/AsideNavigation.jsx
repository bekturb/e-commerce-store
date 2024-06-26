import React, { useState } from 'react';
import apparel4 from "../../../assets/products/apparel4.jpg";
import "./aside-navigation.scss"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AsideNavigation = ({ categoryId, toggleSidebar }) => {

    const { data: categories } = useSelector(state => state.categories);

    const [categoriesToExclude] = useState(["Shop", "Women", "Men", "Sports"]);
    const filteredCategories = categories ? categories.filter(category => categoriesToExclude.includes(category.name)).sort((a, b) => categoriesToExclude.indexOf(a.name) - categoriesToExclude.indexOf(b.name)
    ) : [];

    return (
        <nav className="canvas-nav navigations">
            <ul className="navigations__links">
                <li className="navigations__item">
                    <Link to="/" className="navigations__link">Home</Link>
                </li>
                {
                    filteredCategories.map(category => (
                        <li key={category._id} onClick={() => toggleSidebar(category._id)} className={categoryId === category._id ? "navigations__item child expand" : "navigations__item child"}>
                            <Link to={`/category/${category.slug}`} className="navigations__link">{category.name}
                                {
                                    category.children.length > 0 &&
                                    <span className="navigations__icon icon-sm">
                                        <i className="ri-arrow-down-s-line"></i>
                                    </span>
                                }
                            </Link>
                            {
                                category.children.length > 0 && (
                                    <div className="mega canvas-nav__mega">
                                        <div className="container">
                                            <div className="mega__wrapper">
                                                {category.children.map(subcategory => (
                                                    subcategory.name === "Top Brands" ?
                                                        <div key={subcategory._id} className="mega__col">
                                                            <div className="mega__row">
                                                                <Link to={`/category/${category?.slug}/${subcategory?.slug}`}>
                                                                    <h4 className="mega__title">{subcategory.name}</h4>
                                                                </Link>
                                                                {
                                                                    subcategory.children.length > 0 && (
                                                                        <ul className="mega__list mega__list-brands">
                                                                            {
                                                                                subcategory.children.map(subSubcategory => (
                                                                                    <li key={subSubcategory._id} className="mega__item mega__item-width">
                                                                                        <Link className="mega__link" to={`/category/${category?.slug}/${subcategory?.slug}/${subSubcategory?.slug}`}>
                                                                                            {subSubcategory.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    )
                                                                }
                                                                <a className="mega__view-all" href="">View all brands <i className="ri-arrow-right-line"></i></a>
                                                            </div>
                                                        </div> :
                                                        <div key={subcategory._id} className="mega__col">
                                                            <div className="mega__row">
                                                                <Link to={`/category/${category?.slug}/${subcategory?.slug}`}>
                                                                    <h4 key={subcategory._id} className="mega__title">{subcategory.name}</h4>
                                                                </Link>
                                                                {
                                                                    subcategory.children.length > 0 && (
                                                                        <ul className="mega__list">
                                                                            {
                                                                                subcategory.children.map(subSubcategory => (
                                                                                    <li key={subSubcategory._id} className="mega__item">
                                                                                        <Link to={`/category/${category?.slug}/${subcategory?.slug}/${subSubcategory?.slug}`}
                                                                                            className="mega__link">
                                                                                            {subSubcategory.name}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default AsideNavigation;