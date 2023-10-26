import React, {useState} from 'react';
import apparel4 from "../../assets/products/apparel4.jpg";
import "./aside-navigation.scss"
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const AsideNavigation = ({categoryId, toggleSidebar}) => {

    const {data: categories} = useSelector(state => state.categories);

    const [categoriesToExclude] = useState(["Shop", "Women", "Men", "Sports"]);
    const filteredCategories = categories ? categories.filter(category => categoriesToExclude.includes(category.name)).sort((a,b) => categoriesToExclude.indexOf(a.name) - categoriesToExclude.indexOf(b.name)
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
                            <Link to={`/${category.slug}`} className="navigations__link">{category.name}
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
                                                                <h4 className="mega__title">{subcategory.name}</h4>
                                                                {
                                                                    subcategory.children.length > 0 && (
                                                                        <ul className="mega__list mega__list-brands">
                                                                            {
                                                                                subcategory.children.map(subSubcategory => (
                                                                                    <li key={subSubcategory._id} className="mega__item mega__item-width">
                                                                                        <a className="mega__link" href="">{subSubcategory.name}</a>
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
                                                            <h4 key={subcategory._id} className="mega__title">{subcategory.name}</h4>
                                                            {
                                                                subcategory.children.length > 0 && (
                                                                    <ul className="mega__list">
                                                                        {
                                                                            subcategory.children.map(subSubcategory => (
                                                                                <li key={subSubcategory._id} className="mega__item">
                                                                                    <a className="mega__link" href="">{subSubcategory.name}</a>
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="products mega__products">
                                                    <div className="products__row">
                                                        <div className="products__media">
                                                            <div className="products__thumbnail">
                                                                <a className="products__image-cover" href="">
                                                                    <img className="products__img" src={apparel4} alt="apparel4"/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="products__text-content">
                                                            <h4 className="products__pop">Most Wanted!</h4>
                                                            <a className="primary-button products__button" href="">Order Now</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </li>
                    ))
                }
                {/*<li className="navigations__item">*/}
                {/*    <a className="navigations__link" href="#">Sports*/}
                {/*        <div className="fly-item navigations__fly-item">*/}
                {/*            <span className="fly-item__span">New!</span>*/}
                {/*        </div>*/}
                {/*    </a>*/}
                {/*</li>*/}
            </ul>
        </nav>
    );
};

export default AsideNavigation;