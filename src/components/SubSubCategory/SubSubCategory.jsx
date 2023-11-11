import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import SecTop from "../SecTop/SecTop";
import useBrandCounts from "../../customHooks/useBrandCounts";
import useProductsColor from "../../customHooks/UseProductsColor";
import useGetProductsSeller from "../../customHooks/useGetProductsSeller";
import useFilteredCategoryProducts from "../../customHooks/useFilteredCategoryProducts";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ProductsCart from "../ProductsCart/ProductsCart";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import FiltersMobile from "../FiltersMobile/FiltersMobile";
import Popup from "../Popup/Popup";
import {sortData} from "../../customData/sortData";
import "./subsubcategory.scss";

const SubSubCategory = ({
                            products,
                            category,
                            productPrice,
                            currentPage,
                            setCurrentPage,
                            sortedItem,
                            productColor,
                            perPage,
                            handleSort,
                            setSortedItem,
                            handleColorCheckboxChange,
                            handleBrandCheckboxChange,
                            handleShopCheckboxChange,
                            productMaxPrice,
                            setProductMaxPrice,
                            setProductPrice,
                            productBrand,
                            productShop,
                            shops
                        }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [open, setOpen] = useState("");
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [showMobileSort, setShowMobileSort] = useState(false);
    const [showOtherColors, setShowOtherColors] = useState(false);
    const [showOtherBrands, setShowOtherBrands] = useState(false);
    const [showOtherShops, setShowOtherShops] = useState(false);
    const [filteredColors, setFilteredColors] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const [pageItem, SetPageItem] = useState({
        start: 0,
        end: perPage
    });
    const location = useLocation();

    const {data: brands, loading: brandLoading, error: brandErr} = useSelector(state => state.brands);

    const categoryProducts = useFilteredCategoryProducts({
        filteredProducts:filteredProducts,
        productBrand:productBrand,
        productColor:productColor,
        productPrice:productPrice,
        productMaxPrice:productMaxPrice,
        productShop: productShop,
        sortedItem:sortedItem,
    });
    const brandCounts = useBrandCounts(filteredProducts, brands);
    const uniqueColors = useProductsColor(filteredProducts);
    const productsShop = useGetProductsSeller(filteredProducts, shops);

    const handleSearchColors = (query) => {
        const filteringColors = uniqueColors.filter((color) =>
            color.color.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredColors(filteringColors);
    };

    const handleSearchBrands = (query) => {
        const filteringBrands = brandCounts.filter((brand) =>
            brand.name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredBrands(filteringBrands);
    };

    const handleSearchShops = (query) => {
        const filteringShops = productsShop.filter((shop) =>
            shop.name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredShops(filteringShops);
    };

    useEffect(() => {
        setFilteredColors(uniqueColors);
        setFilteredBrands(brandCounts);
        setFilteredShops(productsShop);
    }, [uniqueColors, brandCounts, productsShop])

    useEffect(() => {
        if (products?.length > 0) {
            const catProducts = products.filter(pro => pro.category === category._id);
            setFilteredProducts(catProducts)
        }
    }, [products, category]);

    const handleOpenDrop = (openDrop) => {
        if (open === openDrop) {
            setOpen("");
        } else {
            setOpen(openDrop)
        }
    }

    return (
        <>
             <FiltersMobile
                 categoryProducts={categoryProducts}
                 setShowMobileFilter={setShowMobileFilter}
                 showMobileFilter={showMobileFilter}
                 filteredColors={filteredColors}
                 filteredBrands={filteredBrands}
                 filteredShops={filteredShops}
                 brandCounts={brandCounts}
                 uniqueColors={uniqueColors}
                 productsShop={productsShop}
                 handleSearchBrands={handleSearchBrands}
                 handleSearchColors={handleSearchColors}
                 handleSearchShops={handleSearchShops}
                 setProductMaxPrice={setProductMaxPrice}
                 setProductPrice={setProductPrice}
                 productPrice={productPrice}
                 productMaxPrice={productMaxPrice}
                 sortedItem={sortedItem}
                 productColor={productColor}
                 handleSort={handleSort}
                 handleColorCheckboxChange={handleColorCheckboxChange}
                 handleBrandCheckboxChange={handleBrandCheckboxChange}
                 handleShopCheckboxChange={handleShopCheckboxChange}
                 productBrand={productBrand}
                 productShop={productShop}
                 shops={shops}/>
            <Popup show={showMobileSort} setShow={setShowMobileSort} setSortedItem={setSortedItem} sortedItem={sortedItem}/>
            <div className="subcat">
                <div className={showMobileFilter || showMobileSort ? "overlay show" : "overlay"}></div>
                <div className="container">
                    <div className="subcat__wrapper">
                        <div className="subcat__column">
                            <div className="subcat__head">
                                <Breadcrumb location={location}/>
                                <SecTop title={category?.name}/>
                                <div className="dropdown flexitem">
                                    <div className="sorter-mobile desktop-hide">
                                        <div className="sorter-mobile__wrapper flexitem">
                                            <div onClick={() => setShowMobileFilter(true)} className="dropdown__trigger">
                                                <div className="sorter-mobile__trigger-item">
                                                    <i className="ri-menu-2-line ri-2x"></i>
                                                    <span className="sorter-mobile__trigger-title">filter</span>
                                                </div>
                                            </div>
                                            <button onClick={() => setShowMobileSort(true)} className="sorter-mobile__btn">
                                                {sortedItem}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="dropdown__items">
                                        {
                                            brandCounts.length > 0 && (
                                                <div className={open === "brands" ? "dropdown__sort open" : "dropdown__sort"}>
                                                    <button className="dropdown__button" onClick={() => handleOpenDrop("brands")}>
                                                        <span className="dropdown__select">Brands</span>
                                                        {
                                                            open === "brands" ? <span className="dropdown__icon">
                                                                <i className="ri-arrow-down-s-line"></i>
                                                            </span> : <span className="dropdown__icon">
                                                                <i className="ri-arrow-up-s-line"></i>
                                                            </span>
                                                        }
                                                    </button>
                                                    <div
                                                        className="dropdown__filter">
                                                        <div className="down">
                                                            {
                                                                showOtherBrands && (
                                                                    <Search onSearch={handleSearchBrands}/>
                                                                )
                                                            }
                                                            <ul className="down__list">
                                                                {
                                                                    filteredBrands.slice(0, 7).map(brand => (
                                                                        <li key={brand.id} className="down__item">
                                                                            <div className="checkbox-with-text">
                                                                                <input
                                                                                    onChange={handleBrandCheckboxChange}
                                                                                    name={brand.name}
                                                                                    checked={productBrand.includes(brand.id)}
                                                                                    className="checkbox-with-text__input"
                                                                                    type="checkbox"
                                                                                    value={brand.id}
                                                                                    id={brand.id}
                                                                                />
                                                                                <label htmlFor={brand.id}
                                                                                       className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                                                                    <span className="checkbox-with-text__text">
                                                                                {brand.name}
                                                                                        <span
                                                                                            className="checkbox-with-text__count">{brand.count}</span>
                                                                                 </span>
                                                                                </label>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }
                                                                {
                                                                    showOtherBrands && (
                                                                        filteredBrands.slice(7).map(brand => (
                                                                            <li key={brand.id} className="down__item">
                                                                                <div className="checkbox-with-text">
                                                                                    <input
                                                                                        onChange={handleBrandCheckboxChange}
                                                                                        name={brand.name}
                                                                                        checked={productBrand.includes(brand.id)}
                                                                                        className="checkbox-with-text__input"
                                                                                        type="checkbox"
                                                                                        value={brand.id}
                                                                                        id={brand.id}
                                                                                    />
                                                                                    <label htmlFor={brand.id}
                                                                                           className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                                                                        <span className="checkbox-with-text__text">
                                                                                {brand.name}
                                                                                            <span
                                                                                                className="checkbox-with-text__count">{brand.count}</span>
                                                                                 </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    )
                                                                }
                                                            </ul>
                                                            <button onClick={() => setShowOtherBrands(true)}
                                                                    className="view-all down__view-all">View all
                                                                <i className="ri-arrow-right-line"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            uniqueColors.length > 0 && (
                                                <div className={open === "colors" ? "dropdown__sort open" : "dropdown__sort"}>
                                                    <button className="dropdown__button" onClick={() => handleOpenDrop("colors")}>
                                                        <span className="dropdown__select">Colors</span>
                                                        {
                                                            open === "colors" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                                        }
                                                    </button>
                                                    <div
                                                        className="dropdown__filter">
                                                        <div className="down">
                                                            {
                                                                showOtherColors && (
                                                                    <Search onSearch={handleSearchColors}/>
                                                                )
                                                            }
                                                            <ul className="down__list">
                                                                {
                                                                    filteredColors?.slice(0, 7).map((color, idx) => (
                                                                        <li key={idx} className="down__item">
                                                                            <div className="checkbox-with-text">
                                                                                <input
                                                                                    onChange={handleColorCheckboxChange}
                                                                                    name={color.color}
                                                                                    checked={productColor.includes(color.color)}
                                                                                    className="checkbox-with-text__input"
                                                                                    type="checkbox"
                                                                                    value={color.color}
                                                                                    id={color.color}
                                                                                />
                                                                                <label htmlFor={color.color}
                                                                                       className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                                                                    <span className="checkbox-with-text__text">
                                                                            <span
                                                                                className="checkbox-with-text__circle circle"
                                                                                style={{'--color': `${color.color}`}}
                                                                            >

                                                                            </span>
                                                                                        {color.color}
                                                                                        <span
                                                                                            className="checkbox-with-text__count">{color.count}</span>
                                                                                 </span>
                                                                                </label>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }
                                                                {
                                                                    showOtherColors && (
                                                                        filteredColors?.slice(7).map((color, idx) => (
                                                                            <li key={idx} className="down__item">
                                                                                <div className="checkbox-with-text">
                                                                                    <input
                                                                                        onChange={handleColorCheckboxChange}
                                                                                        name={color.color}
                                                                                        checked={productColor.includes(color.color)}
                                                                                        className="checkbox-with-text__input"
                                                                                        type="checkbox"
                                                                                        value={color.color}
                                                                                        id={color.color}
                                                                                    />
                                                                                    <label htmlFor={color.color}
                                                                                           className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                                                                        <span className="checkbox-with-text__text">
                                                                            <span
                                                                                className="checkbox-with-text__circle circle"
                                                                                style={{'--color': `${color.color}`}}
                                                                            >

                                                                            </span>
                                                                                            {color.color}
                                                                                            <span
                                                                                                className="checkbox-with-text__count">{color.count}</span>
                                                                                 </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    )
                                                                }
                                                            </ul>
                                                            <button onClick={() => setShowOtherColors(true)}
                                                                    className="view-all down__view-all">View all
                                                                <i className="ri-arrow-right-line"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            productsShop.length > 0 && (
                                                <div className={open === "seller" ? "dropdown__sort open" : "dropdown__sort"}>
                                                    <button className="dropdown__button" onClick={() => handleOpenDrop("seller")}>
                                                        <span className="dropdown__select">Seller</span>
                                                        {
                                                            open === "seller" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                                        }
                                                    </button>
                                                    <div
                                                        className="dropdown__filter">
                                                        <div className="down">
                                                            {
                                                                showOtherShops && (
                                                                    <Search onSearch={handleSearchShops}/>
                                                                )
                                                            }
                                                            <ul className="down__list">
                                                                {
                                                                    filteredShops.slice(0,7).map(shop => (
                                                                        <li key={shop.id} className="down__item">
                                                                            <div className="checkbox-with-text">
                                                                                <input
                                                                                    onChange={handleShopCheckboxChange}
                                                                                    name={shop.name}
                                                                                    checked={productShop.includes(shop.id)}
                                                                                    className="checkbox-with-text__input"
                                                                                    type="checkbox"
                                                                                    value={shop.id}
                                                                                    id={shop.id}
                                                                                />
                                                                                <label htmlFor={shop.id}
                                                                                       className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                                                                    <span className="checkbox-with-text__text">
                                                                                {shop.name}
                                                                                        <span
                                                                                            className="checkbox-with-text__count">{shop.count}</span>
                                                                                 </span>
                                                                                </label>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }
                                                                {
                                                                    showOtherShops && (
                                                                        filteredShops.slice(7).map(shop => (
                                                                            <li key={shop.id} className="down__item">
                                                                                <div className="checkbox-with-text">
                                                                                    <input
                                                                                        onChange={handleShopCheckboxChange}
                                                                                        name={shop.name}
                                                                                        checked={productShop.includes(shop.id)}
                                                                                        className="checkbox-with-text__input"
                                                                                        type="checkbox"
                                                                                        value={shop.id}
                                                                                        id={shop.id}
                                                                                    />
                                                                                    <label htmlFor={shop.id}
                                                                                           className="checkbox-with-text__label">
                                                                            <span
                                                                                className="checkbox-with-text__decor"></span>
                                                                                        <span className="checkbox-with-text__text">
                                                                                {shop.name}
                                                                                            <span
                                                                                                className="checkbox-with-text__count">{shop.count}</span>
                                                                                 </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    )
                                                                }
                                                            </ul>
                                                            <button onClick={() => setShowOtherShops(true)}
                                                                    className="view-all down__view-all">View all
                                                                <i className="ri-arrow-right-line"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className={open === "filter" ? "dropdown__sort open" : "dropdown__sort"}>
                                            <button className="dropdown__button" onClick={() => handleOpenDrop("filter")}>
                                                <span className="dropdown__select">{sortedItem}</span>
                                                {
                                                    open === "filter" ? <span className="dropdown__icon">
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span> : <span className="dropdown__icon">
                                            <i className="ri-arrow-up-s-line"></i>
                                        </span>
                                                }
                                            </button>
                                            <div className="dropdown__filter">
                                                <div className="down">
                                                    <div className="down__form desktop-hide">
                                                        <label>
                                                            <input className="down__input" type="text"/>
                                                        </label>
                                                    </div>
                                                    <ul className="down__list">
                                                        {
                                                            sortData?.map((el, idx) => (
                                                                <li key={idx} className="down__item">
                                                                    <div className="radio-with-text">
                                                                        <input
                                                                            onChange={() => handleSort(el.name)}
                                                                            name="filter"
                                                                            checked={sortedItem === el.name}
                                                                            className="radio-with-text__input"
                                                                            value={el.name}
                                                                            type="radio"
                                                                            id={el.name}
                                                                        />
                                                                        <label htmlFor={el.name} className="radio-with-text__label">
                                                            <span className="radio-with-text__decor">

                                                            </span>
                                                                            <span className="radio-with-text__text">
                                                            {el.name}
                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => setShowMobileFilter(true)} className="dropdown__button">
                                            <span className="dropdown__button-icon">
                                                <i className="ri-equalizer-line"></i>
                                            </span>
                                            All Filter
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="subcat__body">
                                <div className="products pro flexwrap">
                                    {
                                        categoryProducts?.slice(pageItem.start, pageItem.end).map(product => (
                                            <ProductsCart key={product._id} product={product}/>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="subcat__foot">
                                <Pagination
                                    posts={categoryProducts}
                                    postPerPage={perPage}
                                    currentPage={currentPage}
                                    SetCurrentPage={setCurrentPage}
                                    SetPageItem={SetPageItem}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubSubCategory;