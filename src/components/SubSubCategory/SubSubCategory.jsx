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
// import Pagination from "../Pagination/Pagination";
// import FiltersMobile from "../FiltersMobile/FiltersMobile";
import Popup from "../Popup/Popup";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import ProductFilter from "../ProductFilterCom/ProductFilter";
import "./subsubcategory.scss";

const SubSubCategory = ({
                            category,
                            shops
                        }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [showMobileSort, setShowMobileSort] = useState(false);
    const [filteredColors, setFilteredColors] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    // const [pageItem, setPageItem] = useState({
    //     start: 0,
    //     end: perPage
    // });
    const location = useLocation();

    const {data: brands} = useSelector(state => state.brands);
    const {data: products, loading: productsLoad, error: productsErr} = useSelector(state => state.products);
    const {data: wishListData, loading: wishListLoading} = useSelector(state => state.wishlist);
    const {data: compareProducts} = useSelector(state => state.compareProducts);
    const {productBrand, productColor, productSort, productMinPrice, productMaxPrice, productShop, currentPage, perPage} = useSelector(state => state.filterProducts);

    const categoryProducts = useFilteredCategoryProducts({
        filteredProducts,
        productBrand,
        productColor,
        productShop,
        productSort,
        productMinPrice,
        productMaxPrice
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
            const catProducts = products.filter(pro => pro.category === category?._id);
            setFilteredProducts(catProducts)
        }
    }, [products, category]);

    return (
        <>
            {/*<FiltersMobile*/}
            {/*    categoryProducts={categoryProducts}*/}
            {/*    setShowMobileFilter={setShowMobileFilter}*/}
            {/*    showMobileFilter={showMobileFilter}*/}
            {/*    filteredColors={filteredColors}*/}
            {/*    filteredBrands={filteredBrands}*/}
            {/*    filteredShops={filteredShops}*/}
            {/*    brandCounts={brandCounts}*/}
            {/*    uniqueColors={uniqueColors}*/}
            {/*    productsShop={productsShop}*/}
            {/*    handleSearchBrands={handleSearchBrands}*/}
            {/*    handleSearchColors={handleSearchColors}*/}
            {/*    handleSearchShops={handleSearchShops}*/}
            {/*    setProductMaxPrice={setProductMaxPrice}*/}
            {/*    setProductPrice={setProductPrice}*/}
            {/*    productPrice={productPrice}*/}
            {/*    productMaxPrice={productMaxPrice}*/}
            {/*    handleSort={handleSort}*/}
            {/*    shops={shops}/>*/}
            <Popup show={showMobileSort} setShow={setShowMobileSort}/>
            <div className={showMobileFilter || showMobileSort ? "overlay show" : "overlay"}></div>
            <div className="subcat">
                <div className="container">
                    <div className="subcat__wrapper">
                        <div className="subcat__column">
                            <div className="subcat__head">
                                <Breadcrumb location={location}/>
                                <SecTop title={category?.name}/>
                                {
                                    categoryProducts.length > 0 && (
                                        <ProductFilter
                                            setShowMobileFilter={setShowMobileFilter}
                                            setShowMobileSort={setShowMobileSort}
                                            brandCounts={brandCounts}
                                            uniqueColors={uniqueColors}
                                            productsShop={productsShop}
                                            handleSearchBrands={handleSearchBrands}
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
                                                            categoryProducts?.slice(0, 10).map(product => (
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
                            {/*{*/}
                            {/*    categoryProducts.length > 1 && (*/}
                            {/*        <div className="subcat__foot">*/}
                            {/*            <Pagination*/}
                            {/*                posts={categoryProducts}*/}
                            {/*                postPerPage={perPage}*/}
                            {/*                currentPage={currentPage}*/}
                            {/*                setCurrentPage={setCurrentPage}*/}
                            {/*                setPageItem={setPageItem}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    )*/}
                            {/*}*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubSubCategory;