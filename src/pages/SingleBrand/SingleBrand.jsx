import React, {useEffect, useMemo, useState} from 'react';
import SecTop from "../../components/SecTop/SecTop";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import ProductsCart from "../../components/ProductsCart/ProductsCart";
import {Link, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleBrand} from "../../features/getSingleBrand";
import Popup from "../../components/Popup/Popup";
import Search from "../../components/Search/Search";
import {sortData} from "../../customData/sortData";
import useFilteredCategoryProducts from "../../customHooks/useFilteredCategoryProducts";
import useBrandCounts from "../../customHooks/useBrandCounts";
import useProductsColor from "../../customHooks/UseProductsColor";
import useGetProductsSeller from "../../customHooks/useGetProductsSeller";
import FiltersMobile from "../../components/FiltersMobile/FiltersMobile";
import ProductFilter from "../../components/ProductFilterCom/ProductFilter";
import Pagination from "../../components/Pagination/Pagination";

const SingleBrand = () => {

    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [showMobileSort, setShowMobileSort] = useState(false);
    const [filteredColors, setFilteredColors] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const location = useLocation();

    const {brandId} = useParams();
    const dispatch = useDispatch();

    const {data: singleBrand, loading: singleBrandLoading, error: singleBrandError} = useSelector(state => state.singleBrand);
    const {data: products, loading: productsLoad, error: productsErr} = useSelector(state => state.products);
    const {data: wishListData, loading: wishListLoading} = useSelector(state => state.wishlist);
    const {data: compareProducts} = useSelector(state => state.compareProducts);
    const {data: shops} = useSelector(state => state.shops);
    const {productColor, productSort, productMinPrice, productMaxPrice, productShop, perPage} = useSelector(state => state.filterProducts);

    const [pageItem, setPageItem] = useState({
        start: 0,
        end: perPage
    });

    const categoryProducts = useFilteredCategoryProducts({
        filteredProducts,
        productColor,
        productShop,
        productSort,
        productMinPrice,
        productMaxPrice
    });

    const uniqueColors = useProductsColor(filteredProducts);
    const productsShop = useGetProductsSeller(filteredProducts, shops);

    const handleSearchColors = (query) => {
        const filteringColors = uniqueColors.filter((color) =>
            color.color.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredColors(filteringColors);
    };

    const handleSearchShops = (query) => {
        const filteringShops = productsShop.filter((shop) =>
            shop.name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredShops(filteringShops);
    };

    useEffect(() => {
        setFilteredColors(uniqueColors);
        setFilteredShops(productsShop);
    }, [uniqueColors, productsShop]);

    useEffect(() => {
        if (products?.length > 0) {
            const catProducts = products?.filter(pro => {
                return pro.brand === singleBrand._id
            });
            setFilteredProducts(catProducts)
        }
    }, [singleBrand, products]);

    useEffect(() => {
        dispatch(fetchSingleBrand(brandId))
    }, [brandId]);

    return (
        <>
            {
                singleBrandLoading ? (
                    <div className="loader-box">
                        <Loader />
                    </div>
                ) : singleBrandError ? (
                    <div className="loader-box">
                        <NotFound error={singleBrandError}/>
                    </div>
                ) : singleBrand ? (
                    <>
                        <FiltersMobile
                            categoryProducts={categoryProducts}
                            setShowMobileFilter={setShowMobileFilter}
                            showMobileFilter={showMobileFilter}
                            filteredColors={filteredColors}
                            filteredBrands={filteredProducts}
                            filteredShops={filteredShops}
                            uniqueColors={uniqueColors}
                            productsShop={productsShop}
                            handleSearchColors={handleSearchColors}
                            handleSearchShops={handleSearchShops}/>
                        <Popup show={showMobileSort} setShow={setShowMobileSort}/>
                        <div className="subcat">
                            <div className="container">
                                <div className="subcat__wrapper">
                                    <div className="subcat__column">
                                        <div className="subcat__head">
                                            <div className="breadcrumb">
                                                <ul className="breadcrumb__list flexitem">
                                                    <li className="breadcrumb__item">
                                                        <Link to="/" className="breadcrumb__link">Home</Link>
                                                    </li>
                                                    <li className="breadcrumb__item">
                                                        <Link to={`/brand/${singleBrand?._id}`} className="breadcrumb__link">{singleBrand?.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <SecTop title={singleBrand?.name}/>
                                            {
                                                categoryProducts?.length > 0 && (
                                                    <ProductFilter
                                                        setShowMobileFilter={setShowMobileFilter}
                                                        setShowMobileSort={setShowMobileSort}
                                                        uniqueColors={uniqueColors}
                                                        productsShop={productsShop}
                                                        filteredBrands={[]}
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
                                            categoryProducts?.length > 1 && (
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
                ) : null
            }
        </>
    );
};

export default SingleBrand;