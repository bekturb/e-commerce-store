import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import CategoryProducts from "../CategoryProducts/CategoryProducts";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import "./main-category.scss";
import CategoryFilterBlock from "../CategoryFilterBlock/CategoryFilterBlock";

const MainCategory = ({category, categorySlug, filteredCategories, filteredProducts, uniqueColors, brandCounts}) => {
    const showRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedItem, setSortedItem] = useState("");
    const [perPage, setPerPage] = useState("10");
    const [categoryProducts, setCategoryProducts] = useState([]);

    const [productBrand, setProductBrand] = useState([]);
    const [productColor, setProductColor] = useState("");
    const [productPrice, setProductPrice] = useState(0);

    const {loading: catsLoading, error: catsErr} = useSelector(state => state.categories);
    const {loading: productsLoad, error: productsErr} = useSelector(state => state.products);
    const {loading: brandLoading, error: brandErr} = useSelector(state => state.brands);

    useEffect(() => {
        if (filteredProducts?.length > 0 && categorySlug) {
            const updatedFilteredProducts = filteredProducts?.filter(product => {
                if (
                    (productBrand?.length === 0 || productBrand?.includes(product.brand)) &&
                    (!productColor || product.variants.some(variant => variant.color === productColor)) &&
                    (!productPrice || product.variants.some(variant => variant.originalPrice >= productPrice))
                ) {
                    return true;
                }
                return false;
            });

            const sortedProducts = sortProducts(updatedFilteredProducts, sortedItem);
            setCategoryProducts(sortedProducts);
        } else {
            setCategoryProducts([]);
        }
    }, [filteredProducts, categorySlug, productBrand, productColor, productPrice, sortedItem]);

    useEffect(() => {
        const handleDocumentClick = (e) => {
            const isClosest = e.target.closest(".filter");
            if (!isClosest && showRef.current && showRef.current.classList.contains("show")) {
                showRef.current.classList.remove("show");
            }
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    function sortProducts(products, sortedItem) {
        return [...products].sort((a, b) => {
            if (sortedItem === 'Product Name') {
                return a.name.localeCompare(b.name);
            } else if (sortedItem === 'Price') {
                return Math.floor(b.variants[0].originalPrice) - Math.floor(a.variants[0].originalPrice);
            }
            return 0;
        });
    }

    function paginateProducts(products, currentPage, perPage) {
        if (perPage === 'All') {
            return products;
        }

        const startIndex = (currentPage - 1) * +perPage;
        const endIndex = startIndex + +perPage;
        return products.slice(startIndex, endIndex);
    }

    function handlePerPageChange(page) {
        setPerPage(page);
        setCurrentPage(1);
    }

    function loadMoreProducts() {
        const plusToPerPage = +perPage + 10
        setPerPage(plusToPerPage);
    }

    const paginatedProducts = paginateProducts(categoryProducts, currentPage, perPage);

    const handleCheckboxChange = (event) => {
        const {value, checked} = event.target;

        if (checked) {
            setProductBrand([...productBrand, value]);
        } else {
            setProductBrand(productBrand.filter((item) => item !== value));
        }
    };

    const handleSort = (value) => {
        setSortedItem(value)
    }

    const showMenu = () => {
        setTimeout(() => {
            showRef.current.classList.add("show")
        }, 250);
    }

    return (
        <div className="single-category">
            <div className="container">
                <div className="single-category__wrapper">
                    <div className="column single-category__column">
                        <div className="single-category__holder">
                            <div className="row single-category__sidebar">
                                <div ref={showRef} className="single-category__filter filter">
                                    {catsLoading || productsLoad || brandLoading ? (
                                        <div className="filter__active">
                                            <Loader/>
                                        </div>
                                    ) : (
                                        <>
                                            {
                                                catsErr || productsErr || brandErr ? (
                                                    <div className="filter__active">
                                                        <NotFound/>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {
                                                            filteredCategories?.length > 0 && (
                                                                <CategoryFilterBlock filteredCategories={filteredCategories}/>
                                                            )
                                                        }
                                                        {
                                                            brandCounts?.length > 0 && (
                                                                <div className="filter__block">
                                                                    <h4 className="filter__title">Brands</h4>
                                                                    <ul className="filter__list">
                                                                        {brandCounts?.map(brand => (
                                                                            <li key={brand.id} className="filter__item">
                                                                                <div className="filter__box">
                                                                                    <input
                                                                                        name={brand.name}
                                                                                        checked={productBrand[brand.id]}
                                                                                        onChange={handleCheckboxChange}
                                                                                        className="filter__input"
                                                                                        type="checkbox"
                                                                                        value={brand.id}
                                                                                        id={brand.id}
                                                                                    />
                                                                                    <label className="filter__label"
                                                                                           htmlFor={brand.id}>
                                                                                        <span
                                                                                            className="filter__checked"></span>
                                                                                        <span
                                                                                            className="filter__category">{brand.name}</span>
                                                                                    </label>
                                                                                    <span className="filter__count">
                                                            {brand.count}
                                                        </span>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            uniqueColors?.length > 0 && (
                                                                <div className="filter__block colors">
                                                                    <h4 className="filter__title">Color</h4>
                                                                    <ul className="filter__list colors__variant flexitem">
                                                                        {
                                                                            uniqueColors?.map((color, idx) => (
                                                                                <li key={idx} className="filter__item">
                                                                                    <input
                                                                                        onChange={(e) => setProductColor(e.target.value)}
                                                                                        className="filter__input colors__input"
                                                                                        type="radio"
                                                                                        name="color"
                                                                                        value={color}
                                                                                        id={color}
                                                                                    />
                                                                                    <label className="colors__circle circle"
                                                                                           style={{'--color': `${color}`}}
                                                                                           htmlFor={color}>
                                                                                    </label>
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            filteredProducts?.length > 0 && (
                                                                <div className="filter__block">
                                                                    <h4 className="filter__title">Price</h4>
                                                                    <div className="filter__byprice byprice">
                                                                        <div className="byprice__range-track">
                                                                            <input
                                                                                type="range"
                                                                                min="0"
                                                                                max="100000"
                                                                                className="byprice__input"
                                                                                onChange={e => setProductPrice(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className="byprice__price-range">
                                                                            <span
                                                                                className="byprice__form">${productPrice}</span>
                                                                            <span className="byprice__to">$500</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                    }
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
                                            <div className="cat-navigation__sort">
                                                <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        {sortedItem ? sortedItem : "Sort by default"}
                                                    </span>
                                                    <div className="desktop-hide">{sortedItem}</div>
                                                    <i className="ri-arrow-down-s-line"></i>
                                                </div>
                                                <ul className="cat-navigation__list">
                                                    <li onClick={() => handleSort("Default")}
                                                        className="cat-navigation__item">Default
                                                    </li>
                                                    <li onClick={() => handleSort("Product Name")}
                                                        className="cat-navigation__item">Product Name
                                                    </li>
                                                    <li onClick={() => handleSort("Price")}
                                                        className="cat-navigation__item">Price
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="cat-navigation__perpage mobile-hide">
                                                <div className="cat-navigation__label">
                                                    Items {perPage} perpage
                                                </div>
                                                <div className="desktop-hide">{perPage}</div>
                                            </div>
                                            <div className="cat-navigation__options options">
                                                <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">Show {`${perPage}`} perpage</span>
                                                    <div className="desktop-hide">{perPage}</div>
                                                    <i className="ri-arrow-down-s-line"></i>
                                                </div>
                                                <ul className="cat-navigation__list">
                                                    <li onClick={() => handlePerPageChange(10)}
                                                        className="cat-navigation__item">10
                                                    </li>
                                                    <li onClick={() => handlePerPageChange(20)}
                                                        className="cat-navigation__item">20
                                                    </li>
                                                    <li onClick={() => handlePerPageChange(30)}
                                                        className="cat-navigation__item">30
                                                    </li>
                                                    <li onClick={() => handlePerPageChange("All")}
                                                        className="cat-navigation__item">All
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CategoryProducts productsLoad={productsLoad} productsErr={productsErr}
                                                  paginatedProducts={paginatedProducts}/>
                                {
                                    filteredProducts?.length > 0 && (
                                        <LoadMoreButton loadMoreProducts={loadMoreProducts}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainCategory;