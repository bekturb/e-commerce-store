import React, {useEffect, useState} from 'react';
import apparel4 from "../../assets/products/apparel4.jpg";
import {useDispatch, useSelector} from "react-redux";
import {menuActions} from "../../features/menuSlice";
import {Link} from "react-router-dom";
import {fetchCategories} from "../../features/categoriesSlice";
import MiniCart from "../MiniCart/MiniCart";
import HoverMiniCart from "../HoverMiniCart/HoverMiniCart";
import HeaderNavSkeleton from "../Skeletons/HeaderNavSkeleton/HeaderNavSkeleton";
import NotFound from "../NotFound/NotFound";
import "./header-nav.scss"

const HeaderNav = () => {

    const dispatch = useDispatch()
    const {data: categories, loading: catLoading, error: catErr} = useSelector(state => state.categories);

    const [categoriesToExclude] = useState(["Shop", "Women", "Men", "Sports"]);
    const filteredCategories = categories ? categories.filter(category => categoriesToExclude.includes(category.name)).sort((a,b) => categoriesToExclude.indexOf(a.name) - categoriesToExclude.indexOf(b.name)
    ) : [];

    function openMenu() {
        dispatch(menuActions.showMenu())
    }

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    return (
        <div className="nav">
            {
                catLoading && (
                    <HeaderNavSkeleton/>
                )
            }
            {
                catErr && (
                    <div className="container">
                        <div className="nav__inner">
                            <NotFound error={catErr}/>
                        </div>
                    </div>
                )
            }
            {
                filteredCategories?.length > 0 && (
                    <div className="container">
                        <div className="nav__inner">
                            <a onClick={openMenu} className="trigger nav__trigger" href="#"><span
                                className="trigger__icon icon-lg ri-menu-2-line"></span>
                            </a>
                            <div className="nav__left">
                                <div className="logo">
                                    <Link to="/" className="logo__link">
                                        <span className="logo__circle"></span>.Store
                                    </Link>
                                </div>
                                <nav className="navigations">
                                    <ul className="navigations__links">
                                        <li className="navigations__item">
                                            <Link to="/" className="navigations__link">Home</Link>
                                        </li>
                                        {
                                            filteredCategories.map(category => (
                                                <li key={category._id} className="navigations__item child">
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
                                                            <div className="mega">
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
                                                                                                            <li key={subSubcategory._id}
                                                                                                                className="mega__item mega__item-width">
                                                                                                                <a className="mega__link"
                                                                                                                   href="">{subSubcategory.name}</a>
                                                                                                            </li>
                                                                                                        ))
                                                                                                    }
                                                                                                </ul>
                                                                                            )
                                                                                        }
                                                                                        <a className="mega__view-all" href="">View all
                                                                                            brands <i
                                                                                                className="ri-arrow-right-line"></i></a>
                                                                                    </div>
                                                                                </div> :
                                                                                <div key={subcategory._id} className="mega__col">
                                                                                    <div className="mega__row">
                                                                                        <h4 key={subcategory._id}
                                                                                            className="mega__title">{subcategory.name}</h4>
                                                                                        {
                                                                                            subcategory.children.length > 0 && (
                                                                                                <ul className="mega__list">
                                                                                                    {
                                                                                                        subcategory.children.map(subSubcategory => (
                                                                                                            <li key={subSubcategory._id}
                                                                                                                className="mega__item">
                                                                                                                <a className="mega__link"
                                                                                                                   href="">{subSubcategory.name}</a>
                                                                                                            </li>
                                                                                                        ))
                                                                                                    }
                                                                                                </ul>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                        ))
                                                                        }
                                                                        <div className="products mega__products">
                                                                            <div className="products__row">
                                                                                <div className="products__media">
                                                                                    <div className="products__thumbnail">
                                                                                        <a className="products__image-cover"
                                                                                           href="">
                                                                                            <img className="products__img"
                                                                                                 src={apparel4} alt="apparel4"/>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="products__text-content">
                                                                                    <h4 className="products__pop">Most Wanted!</h4>
                                                                                    <a className="primary-button products__button"
                                                                                       href="">Order Now</a>
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
                                    </ul>
                                </nav>
                            </div>
                            <div className="right nav__right">
                                <ul className="package">
                                    <li className="package__item mobile-hide">
                                        <a className="package__link" href="">
                                        <span className="package__icon icon-lg">
                                            <i className="ri-heart-line"></i>
                                        </span>
                                            <span className="fly-item package__fly-item">
                                            <span className="package__number">
                                                0
                                            </span>
                                        </span>
                                        </a>
                                    </li>
                                    <li className="package__item iscart">
                                        <div className="package__link">
                                            <div className="package__icon icon-lg">
                                                <i className="ri-shopping-cart-line"></i>
                                                <span className="fly-item package__fly-item">
                                            <span className="package__number">
                                                5
                                            </span>
                                        </span>
                                            </div>
                                            <span className="package__text">
                                            <span className="package__total">Total</span>
                                            <span className="package__total-number">$1.622</span>
                                        </span>
                                        </div>
                                        <HoverMiniCart/>
                                        <MiniCart/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default HeaderNav;