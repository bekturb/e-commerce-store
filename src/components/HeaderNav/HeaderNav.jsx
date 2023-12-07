import React, {useEffect, useState} from 'react';
import apparel4 from "../../assets/products/apparel4.jpg";
import {useDispatch, useSelector} from "react-redux";
import {menuActions} from "../../features/menuSlice";
import {Link} from "react-router-dom";
import {fetchCategories} from "../../features/categoriesSlice";
import {getPersonalWishlist} from "../../features/wishList";
import {compareProductsActions} from "../../features/compareProducts";
import MiniCart from "../MiniCart/MiniCart";
import HoverMiniCart from "../HoverMiniCart/HoverMiniCart";
import HeaderNavSkeleton from "../Skeletons/HeaderNavSkeleton/HeaderNavSkeleton";
import NotFound from "../NotFound/NotFound";
import "./header-nav.scss";
import MegaProductCart from "../MegaProductCart/MegaProductCart";
import {cartProductsActions} from "../../features/cartSlice";
import {fetchAllCategories} from "../../features/allCategories";

const HeaderNav = () => {

    const dispatch = useDispatch();
    const {data: categories, loading: catLoading, error: catErr} = useSelector(state => state.categories);
    const {data: wishListData} = useSelector(state => state.wishlist);
    const {data: compareProducts} = useSelector(state => state.compareProducts);
    const {data: cartProducts} = useSelector(state => state.cart);

    const [categoriesToExclude] = useState(["Shop", "Women", "Men", "Sports"]);
    const filteredCategories = categories ? categories.filter(category => categoriesToExclude.includes(category.name)).sort((a,b) => categoriesToExclude.indexOf(a.name) - categoriesToExclude.indexOf(b.name)
    ) : [];

    function openMenu() {
        dispatch(menuActions.showMenu());
    }

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(getPersonalWishlist());
        dispatch(fetchAllCategories());
        dispatch(compareProductsActions.getCompareProducts());
        dispatch(cartProductsActions.getCartProducts())
    }, [dispatch]);

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
                                                                                        <Link to={`/category/${category?.slug}/${subcategory?.slug}`}>
                                                                                            <h4 className="mega__title">{subcategory.name}</h4>
                                                                                        </Link>
                                                                                        {
                                                                                            subcategory.children.length > 0 && (
                                                                                                <ul className="mega__list mega__list-brands">
                                                                                                    {
                                                                                                        subcategory.children.map(subSubcategory => (
                                                                                                            <li key={subSubcategory._id}
                                                                                                                className="mega__item mega__item-width">
                                                                                                                <Link to={`/category/${category?.slug}/${subcategory?.slug}/${subSubcategory?.slug}`} className="mega__link">
                                                                                                                    {subSubcategory.name}
                                                                                                            </Link>
                                                                                                            </li>
                                                                                                        ))
                                                                                                    }
                                                                                                </ul>
                                                                                            )
                                                                                        }
                                                                                        <a className="view-all" href="">View all
                                                                                            brands <i
                                                                                                className="ri-arrow-right-line"></i></a>
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
                                                                                                            <li key={subSubcategory._id}
                                                                                                                className="mega__item">
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
                                                                        ))
                                                                        }
                                                                        <MegaProductCart category={category.slug}/>
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
                                                {wishListData?.length}
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
                                                {cartProducts?.length}
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