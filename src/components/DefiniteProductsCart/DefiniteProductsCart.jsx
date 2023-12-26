import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import useFilteredCategoryProducts from "../../customHooks/useFilteredCategoryProducts";
import useBrandCounts from "../../customHooks/useBrandCounts";
import UseGetDefinitelyCategories from "../../customHooks/useGetDefinitelyCategories";
import useProductsColor from "../../customHooks/UseProductsColor";
import useGetProductsSeller from "../../customHooks/useGetProductsSeller";
import FiltersMobile from "../FiltersMobile/FiltersMobile";
import Popup from "../Popup/Popup";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import SecTop from "../SecTop/SecTop";
import ProductFilter from "../ProductFilterCom/ProductFilter";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import ProductsCart from "../ProductsCart/ProductsCart";
import Pagination from "../Pagination/Pagination";

const DefiniteProductsCart = ({filteredProducts, pageName, locationPosition}) => {
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [showMobileSort, setShowMobileSort] = useState(false);
    const [filteredColors, setFilteredColors] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const location = useLocation();

    const {data: brands} = useSelector(state => state.brands);
    const {data: allCategories} = useSelector(state => state.allCategories);
    const {loading: productsLoad, error: productsErr} = useSelector(state => state.products);
    const {data: wishListData, loading: wishListLoading} = useSelector(state => state.wishlist);
    const {data: compareProducts} = useSelector(state => state.compareProducts);
    const {data: shops} = useSelector(state => state.shops);
    const {productCategory, productBrand, productColor, productSort, productMinPrice, productMaxPrice, productShop, perPage} = useSelector(state => state.filterProducts);

    const [pageItem, setPageItem] = useState({
        start: 0,
        end: perPage
    });

    const categoryProducts = useFilteredCategoryProducts({
        filteredProducts,
        productCategory,
        productBrand,
        productColor,
        productShop,
        productSort,
        productMinPrice,
        productMaxPrice
    });

    const brandCounts = useBrandCounts(filteredProducts, brands);
    const categoryCounts = UseGetDefinitelyCategories(filteredProducts, allCategories);
    const uniqueColors = useProductsColor(filteredProducts);
    const productsShop = useGetProductsSeller(filteredProducts, shops);

    const handleSearchColors = (query) => {
        const filteringColors = uniqueColors.filter((color) =>
            color.color.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredColors(filteringColors);
    };

    const handleSearchCategories = (query) => {
        const filteringCategories = categoryCounts.filter((cat) =>
            cat.name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredCategories(filteringCategories);
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
        setFilteredCategories(categoryCounts)
    }, [uniqueColors, brandCounts, productsShop, categoryCounts])

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
                filteredCategories={filteredCategories}
                categoryCounts={categoryCounts}
                handleSearchCategories={handleSearchCategories}
                handleSearchBrands={handleSearchBrands}
                handleSearchColors={handleSearchColors}
                handleSearchShops={handleSearchShops}
            />
            <Popup show={showMobileSort} setShow={setShowMobileSort}/>
            <div className={showMobileFilter || showMobileSort ? "overlay show" : "overlay"}></div>
            <div className="subcat">
                <div className="container">
                    <div className="subcat__wrapper">
                        <div className="subcat__column">
                            <div className="subcat__head">
                                {
                                    locationPosition && (
                                        <Breadcrumb location={location}/>
                                    )
                                }
                                <SecTop title={pageName}/>
                                {
                                    categoryProducts.length > 0 && (
                                        <ProductFilter
                                            setShowMobileFilter={setShowMobileFilter}
                                            setShowMobileSort={setShowMobileSort}
                                            brandCounts={brandCounts}
                                            categoryCounts={categoryCounts}
                                            uniqueColors={uniqueColors}
                                            productsShop={productsShop}
                                            handleSearchCategories={handleSearchCategories}
                                            handleSearchBrands={handleSearchBrands}
                                            filteredCategories={filteredCategories}
                                            filteredBrands={filteredBrands}
                                            filteredColors={filteredColors}
                                            handleSearchColors={handleSearchColors}
                                            filteredShops={filteredShops}
                                            handleSearchShops={handleSearchShops}
                                        />
                                    )
                                }
                            </div>
                            <div className="subcat__body">
                                <div className="products pro flexwrap">
                                    {
                                        productsLoad ? (
                                            <div className="trending__loader">
                                                <Loader/>
                                            </div>
                                        ) : (
                                            productsErr ? (
                                                <div className="trending__loader">
                                                    <NotFound error={productsErr}/>
                                                </div>
                                            ) : (
                                                <>
                                                    {
                                                        categoryProducts?.length > 0 ? (
                                                            categoryProducts?.slice(pageItem.start, pageItem.end).map(product => (
                                                                <ProductsCart key={product?._id} product={product} wishListData={wishListData} wishListLoading={wishListLoading} compareProducts={compareProducts}/>
                                                            ))
                                                        ) : (
                                                            <div>
                                                                Not Found
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                            {
                                categoryProducts.length > 1 && (
                                    <div className="subcat__foot">
                                        <Pagination
                                            posts={categoryProducts}
                                            setPageItem={setPageItem}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DefiniteProductsCart;