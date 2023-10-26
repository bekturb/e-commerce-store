import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../features/productsSlice";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import Photo from "../../assets/products/apparel2.jpg"
import "./header-main.scss"

const HeaderMain = () => {
    const [showCat, setShowCat] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const {pathname} = useLocation();
    const dispatch = useDispatch();

    const {data: categories, loading: catLoad, error: catErr} = useSelector(state => state.categories);
    const {data: products} = useSelector(state => state.products);

    const [categoriesToExclude] = useState(["Shop", "Women", "Men"]);
    const filteredCategories = categories ? categories.filter(category => !categoriesToExclude.includes(category.name)) : [];

    const handleSearchChange = (e) => {
        const term = e.target.value
        setSearchTerm(term)

        if (term === "") {
            setSearchData(null)
        }else {
            const filteredProducts =
                products &&
                products.filter((product) =>
                    product.name.toLowerCase().includes(term.toLowerCase())
                );
            setSearchData(filteredProducts);
        }
    };

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, []);

    return (
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
                                    catLoad && (
                                        <Loader />
                                    )
                                }

                                {
                                    catErr && (
                                        <NotFound error={catErr}/>
                                    )
                                }
                                <ul className="menu__list">
                                    {
                                        filteredCategories?.length > 0 && filteredCategories.map(category => (
                                            <li key={category._id} className="menu__item child">
                                                <a className="menu__link" href="">
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
                                                </a>
                                                {
                                                    category.children.length > 0 && (
                                                        category.children.filter(subcategory => subcategory.children.length > 0).length > 0  ? (
                                                                <div className="kit child__kit">
                                                                    <img className="kit__image" src={category.categoryImage} alt=""/>
                                                                    <div className="kit__wrapper">
                                                                        {
                                                                            chunkArray(category.children, 2).map((rowSubcategories, rowIndex) => (
                                                                                <div key={rowIndex} className="kit__inner flexcol">
                                                                                    {rowSubcategories.map(subcategory => (
                                                                                        <div  key={subcategory._id} className="kit__row">
                                                                                            <h4 className="kit__main-title">
                                                                                                <a className="kit__main-link" href="">{subcategory.name}</a>
                                                                                            </h4>
                                                                                            {
                                                                                                subcategory.children.length > 0 && (
                                                                                                    <ul className='kit__list'>
                                                                                                        {
                                                                                                            subcategory.children.map(subsubcategory => (
                                                                                                                <li key={subsubcategory._id} className="kit__category">
                                                                                                                    <a className="kit__link"
                                                                                                                    href="#">{subsubcategory.name}</a>
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
                                                                    <img className="child__image" src={category.categoryImage} alt=""/>
                                                                    <ul className="child__list">
                                                                        {
                                                                            category.children.map(subcategory => (
                                                                                <li key={subcategory._id} className="child__category">
                                                                                    <a className="child__link" href="#">{subcategory.name}</a>
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
                            </div>
                        </div>
                    </div>
                    <div className="right categories__right">
                        <div className="search">
                            <div className="search__form">
                                <span className="search__icon icon-lg "><i className="ri-search-line"></i></span>
                                <input
                                    onChange={handleSearchChange}
                                    className="search__input"
                                    type="search"
                                    value={searchTerm}
                                    placeholder="Search for products"
                                />
                                <button className="search__btn" type="submit">Search</button>
                            </div>
                            {
                                searchData && searchData.length !== 0 ? (
                                    <div className="panel">
                                        <ul className="panel__products">
                                            {
                                                searchData &&
                                                    searchData.map((i) => {
                                                        return (
                                                            <li key={i._id} className="panel__product">
                                                                <img className="panel__img" src={i.variants[0]?.images[0]?.url} alt=""/>
                                                                <p className="panel__title">{i.name}</p>
                                                            </li>
                                                        )
                                                    })
                                            }
                                        </ul>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMain;