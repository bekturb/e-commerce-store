import React, {useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategory} from "../../features/singleCategorySlice";
import {fetchBrands} from "../../features/brandSlice";
import "./single-category.scss";

const SingleCategory = () => {
    const showRef = useRef(null);
    const [showId, setShowId] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [uniqueColors, setUniqueColors] = useState([]);
    const [brandCounts, setBrandCounts] = useState([]);
    const [categoryProducts , setCategoryProducts] = useState([]);
    const [sortedItem, setSortedItem] = useState("");
    const [perPage, setPerPage] = useState("10");

    const [productBrand, setProductBrand] = useState([]);
    const [productColor, setProductColor] = useState("");
    const [productPrice, setProductPrice] = useState(0);

    const {categorySlug} = useParams();
    const dispatch = useDispatch();

    const {data: category, loading: catLoading, error: catErr} = useSelector(state => state.category);
    const {data: categories, loading: catsLoading, error: catsErr} = useSelector(state => state.categories);
    const {data: products, loading: productsLoad, error: productsErr} = useSelector(state => state.products);
    const {data: brands, loading, error} = useSelector(state => state.brands);

    useEffect(() => {
        if (categorySlug && categories) {
            const newFilteredCategories = categories.filter(categoryItem => categoryItem.slug === categorySlug);
            setFilteredCategories(newFilteredCategories);
        } else {
            setFilteredCategories([]);
        }


    }, [categorySlug, categories, products]);

    useEffect(() => {
        if (categorySlug && products) {
            const newFilteredProducts = products.filter(product => product.tags.includes(categorySlug));
            setFilteredProducts(newFilteredProducts);
        } else {
            setFilteredProducts([]);
        }
    }, [categorySlug, products])

    useEffect(() => {
        if (filteredProducts) {
            const colors = new Set();
            filteredProducts.forEach(product => {
                product.variants.forEach(variant => {
                    colors.add(variant.color);
                });
            });
            setUniqueColors([...colors]);
        }
    }, [filteredProducts]);

    useEffect(() => {
        if (filteredProducts && brands) {
            const brandCounts = {};

            filteredProducts.forEach(product => {
                const brand = brands.find(brand => brand._id === product.brand);
                if (brand) {
                    const brandName = brand.name;
                    const brandId = brand._id;
                    if (!brandCounts[brandName]) {
                        brandCounts[brandName] = {
                            id: brandId,
                            count: 1,
                        };
                    } else {
                        brandCounts[brandName].count += 1;
                    }
                }
            });

            const brandCountsArray = [];
            for (const brandName in brandCounts) {
                brandCountsArray.push({
                    name: brandName,
                    id: brandCounts[brandName].id,
                    count: brandCounts[brandName].count,
                });
            }

            setBrandCounts(brandCountsArray);
        }
    }, [filteredProducts, brands]);

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

    useEffect(() => {
        dispatch(fetchCategory(categorySlug));
        dispatch(fetchBrands());
    }, [categorySlug]);

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
        setPerPage(perPage + 10);
    }

    const paginatedProducts = paginateProducts(categoryProducts, currentPage, perPage);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

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

    const handleToggle = (id) => {
        if (id === showId) {
            setShowId("")
        } else {
            setShowId(id)
        }
    };

    return (
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
                                                filteredCategories?.map(category => (
                                                    category.children.length > 0 && (
                                                        category.children.map(subCategory => (
                                                            subCategory.children.length > 0 ? (
                                                                <li key={subCategory._id} className="filter__item"
                                                                    onClick={() => handleToggle(subCategory._id)}>
                                                                    <div className="filter__box">
                                                                        <div className="filter__label">
                                                                        <span
                                                                            className="filter__category">{subCategory.name}</span>
                                                                        </div>
                                                                        <span className="filter__count icon-sm">
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
                                                                                            <li key={subSubCategory._id}
                                                                                                className="children__item">
                                                                                                <Link to="/"
                                                                                                      className="children__link">
                                                                                                    <p className="children__title">{subSubCategory.name}</p>
                                                                                                    <span
                                                                                                        className="children__count">
                                                                                                        15
                                                                                                    </span>
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))
                                                                                    }
                                                                                </ul>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </li>
                                                            ) : (
                                                                <li key={subCategory._id} className="filter__item">
                                                                    <Link
                                                                        to={`/category/${category.name}/${subCategory._id}`}>
                                                                        <div className="filter__box">
                                                                            <div className="filter__label">
                                                                                <span
                                                                                    className="filter__category">{subCategory.name}</span>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        ))
                                                    )
                                                ))
                                            }
                                        </ul>
                                    </div>
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
                                                        <label className="filter__label" htmlFor={brand.id}>
                                                            <span className="filter__checked"></span>
                                                            <span className="filter__category">{brand.name}</span>
                                                        </label>
                                                        <span className="filter__count">
                                                            {brand.count}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="filter__block colors">
                                        <h4 className="filter__title">Color</h4>
                                        <ul className="filter__list colors__variant flexitem">
                                            {
                                                uniqueColors?.map((color, idx) => (
                                                    <li key={idx} className="filter__item">
                                                        <input onChange={(e) => setProductColor(e.target.value)}
                                                               className="filter__input colors__input"
                                                               type="radio"
                                                               name="color"
                                                               value={color}
                                                               id={color}
                                                        />
                                                        <label className="colors__circle circle" style={{ '--color':`${color}`}} htmlFor={color}>
                                                        </label>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
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
                                                <span className="byprice__form">${productPrice}</span>
                                                <span className="byprice__to">$500</span>
                                            </div>
                                        </div>
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
                                            <div className="cat-navigation__sort">
                                                <div className="cat-navigation__label label">
                                                    <span className="mobile-hide">
                                                        {sortedItem ? sortedItem : "Sort by default"}
                                                    </span>
                                                    <div className="desktop-hide">{sortedItem}</div>
                                                    <i className="ri-arrow-down-s-line"></i>
                                                </div>
                                                <ul className="cat-navigation__list">
                                                    <li onClick={() => handleSort("Default")} className="cat-navigation__item">Default</li>
                                                    <li onClick={() => handleSort("Product Name")} className="cat-navigation__item">Product Name</li>
                                                    <li onClick={() => handleSort("Price")} className="cat-navigation__item">Price</li>
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
                                                    <li onClick={() => handlePerPageChange(10)} className="cat-navigation__item">10</li>
                                                    <li onClick={() => handlePerPageChange(20)} className="cat-navigation__item">20</li>
                                                    <li onClick={() => handlePerPageChange(30)} className="cat-navigation__item">30</li>
                                                    <li onClick={() => handlePerPageChange("All")} className="cat-navigation__item">All</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="products pro flexwrap">
                                    {
                                        paginatedProducts?.map(product => (
                                            <div key={product._id} className="products__item item">
                                                <div className="products__media media">
                                                    <div className="products__thumbnail thumbnail">
                                                        <a className="products__link" href="">
                                                            <img className="products__image" src={product.variants[0].images[0].url} alt=""/>
                                                        </a>
                                                    </div>
                                                    <div className="products__hover-able">
                                                        <ul className="products__hover-list">
                                                            <li className="products__hover-item active">
                                                                <a className="products__hover-link" href=""><i
                                                                    className="ri-heart-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="products__hover-item">
                                                                <a className="products__hover-link" href=""><i
                                                                    className="ri-eye-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="products__hover-item">
                                                                <a className="products__hover-link" href=""><i
                                                                    className="ri-shuffle-line"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="products__discount circle">
                                            <span className="products__percentage">
                                                {product.salePercentage}%
                                            </span>
                                                    </div>
                                                </div>
                                                <div className="products__content content">
                                                    <div className="content__rating">
                                                        <div className="content__stars"></div>
                                                        <span className="content__text mini-text">
                                                {product?.reviews.length}
                                            </span>
                                                    </div>
                                                    <h3 className="content__main-links">
                                                        <a className="content__link" href="">{product.name}</a>
                                                    </h3>
                                                    <div className="content__price price">
                                                        {
                                                            product.variants[0].discountPrice ?
                                                                <span className="price__current">
                                                ${product.variants[0].discountPrice}
                                            </span> : <span className="price__current">
                                                ${product.variants[0].originalPrice}
                                            </span>
                                                        }
                                                        {
                                                            product.variants[0].discountPrice &&
                                                            <span className="price__old mini-text">
                                                ${product.variants[0].originalPrice}
                                            </span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="load-more flexcenter">
                                    <button onClick={loadMoreProducts} className="secondary-button load-more__btn">Load more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCategory;
