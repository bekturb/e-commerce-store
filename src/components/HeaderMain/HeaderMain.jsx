import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../features/productsSlice";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import "./header-main.scss"
import Skeleton from "react-loading-skeleton";

const HeaderMain = () => {
    const [showCat, setShowCat] = useState(false);
    const {pathname} = useLocation();

    const {data: categories, loading: catLoad, error: catErr} = useSelector(state => state.categories);
    const {data: products, loading: productsLoading} = useSelector(state => state.products);

    const [categoriesToExclude] = useState(["Shop", "Women", "Men"]);
    const filteredCategories = categories ? categories.filter(category => !categoriesToExclude.includes(category.name)) : [];

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    return (
        <>
            {
                productsLoading ? (
                    <Skeleton width={`${100}%`} height={100}/>
                ) : (
                    <div className="main header__main">
                        <div className="container">
                            <div className="categories">
                                <div className="category categories__left">
                                    <div className="category__cat">
                                        <div className="category__head">
                                            <div className="category__text">
                                                All Departments
                                            </div>
                                            <div className="mini-text category__mini-text">
                                                Total {products?.length} Products
                                            </div>
                                            <div onClick={() => setShowCat(!showCat)}
                                                 className={pathname === '/' ? "category__trigger visible" : "category__trigger"}>
                                                {showCat ? <i className="ri-close-line ri-xl"></i> :
                                                    <i className="ri-menu-3-line ri-xl"></i>
                                                }
                                            </div>
                                        </div>
                                        <div className={pathname !== "/" && showCat === false ? "menu show" : "menu"}>
                                            {
                                                catLoad ? (
                                                    <ul className="menu__list">
                                                        <Skeleton width={300} height={800}/>
                                                    </ul>
                                                ) : catErr ? (
                                                    <NotFound error={catErr}/>
                                                ) : (
                                                    <ul className="menu__list">
                                                        {
                                                            filteredCategories?.length > 0 && filteredCategories.map(category => (
                                                                <li key={category._id} className="menu__item child">
                                                                    <Link to={`/category/${category.slug}`}
                                                                          className="menu__link">
                                                                            <span className="menu__icon  icon-lg">
                                                                                <i className={category.icon}></i>
                                                                            </span>
                                                                        {category.name}
                                                                        {
                                                                            category.children.length > 0 &&
                                                                                    <span className="menu__icon icon-sm">
                                                                                        <i className="ri-arrow-right-s-line"></i>
                                                                                    </span>
                                                                        }
                                                                    </Link>
                                                                    {
                                                                        category.children.length > 0 && (
                                                                            category.children.filter(subcategory => subcategory.children.length > 0).length > 0 ? (
                                                                                <div className="kit child__kit">
                                                                                    <img className="kit__image"
                                                                                         src={category.categoryImage} alt=""/>
                                                                                    <div className="kit__wrapper">
                                                                                        {
                                                                                            chunkArray(category.children, 2).map((rowSubcategories, rowIndex) => (
                                                                                                <div key={rowIndex}
                                                                                                     className="kit__inner flexcol">
                                                                                                    {rowSubcategories.map(subcategory => (
                                                                                                        <div
                                                                                                            key={subcategory._id}
                                                                                                            className="kit__row">
                                                                                                            <h4 className="kit__main-title">
                                                                                                                <Link
                                                                                                                    to={`/category/${category?.slug}/${subcategory?.slug}`}
                                                                                                                    className="kit__main-link">
                                                                                                                    {subcategory.name}
                                                                                                                </Link>
                                                                                                            </h4>
                                                                                                            {
                                                                                                                subcategory.children.length > 0 && (
                                                                                                                    <ul className='kit__list'>
                                                                                                                        {
                                                                                                                            subcategory.children.map(subsubcategory => (
                                                                                                                                    <li key={subsubcategory._id}
                                                                                                                                        className="kit__category">
                                                                                                                                        <Link
                                                                                                                                            to={`/category/${category?.slug}/${subcategory?.slug}/${subsubcategory?.slug}`}
                                                                                                                                            className="kit__link"
                                                                                                                                            href="#">{subsubcategory.name}
                                                                                                                                        </Link>
                                                                                                                                    </li>
                                                                                                                                )
                                                                                                                            )
                                                                                                                        }
                                                                                                                    </ul>
                                                                                                                )
                                                                                                            }
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            ))
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="child__item">
                                                                                    <img className="child__image"
                                                                                         src={category.categoryImage} alt=""/>
                                                                                    <ul className="child__list">
                                                                                        {
                                                                                            category.children.map(subcategory => (
                                                                                                <li key={subcategory._id}
                                                                                                    className="child__category">
                                                                                                    <Link
                                                                                                        to={`/category/${category?.slug}/${subcategory?.slug}`}
                                                                                                        className="child__link"
                                                                                                        href="#">
                                                                                                        {subcategory.name}
                                                                                                    </Link>
                                                                                                </li>
                                                                                            ))
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                            )
                                                                        )
                                                                    }
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="right categories__right">
                                    <HeaderSearch/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default HeaderMain;