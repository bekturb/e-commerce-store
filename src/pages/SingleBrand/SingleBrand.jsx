import React, {useEffect, useMemo, useState} from 'react';
import SecTop from "../../components/SecTop/SecTop";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import ProductsCart from "../../components/ProductsCart/ProductsCart";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleBrand} from "../../features/getSingleBrand";
import Popup from "../../components/Popup/Popup";
import Search from "../../components/Search/Search";
import {sortData} from "../../customData/sortData";

const SingleBrand = () => {

    const [showMobileSort, setShowMobileSort] = useState(false);
    const [sortedItem, setSortedItem] = useState("Popularity");
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [productBrand, setProductBrand] = useState([]);
    const [productColor, setProductColor] = useState([]);
    const [productShop, setProductShop] = useState([]);

    const [pageItem, setPageItem] = useState({
        start: 0,
        end: 10
    });

    const {brandId} = useParams();
    const dispatch = useDispatch();

    const {data: singleBrand, loading: singleBrandLoading, error: singleBrandError} = useSelector(state => state.singleBrand);
    const {data: products, loading: productsLoading, error: productsError} = useSelector(state => state.products);
    const {data: wishListData, loading: wishListLoading} = useSelector(state => state.wishlist);
    const {data: compareProducts} = useSelector(state => state.compareProducts);

    const brandProducts = useMemo(() => {
        return products?.filter(pro => {
            return pro.brand === singleBrand._id
        });
    },[singleBrand, products]);

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
                        <Popup show={showMobileSort} setShow={setShowMobileSort} setSortedItem={setSortedItem}
                               sortedItem={sortedItem}/>
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
                                        </div>
                                        <div className="subcat__body">
                                            <div className="products pro flexwrap">
                                                {
                                                    productsLoading ? (
                                                        <div className="trending__loader">
                                                            <Loader/>
                                                        </div>
                                                    ) : (
                                                        productsError ? (
                                                            <div className="trending__loader">
                                                                <NotFound error={productsError}/>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {
                                                                    brandProducts?.length > 0 ? (
                                                                        brandProducts?.slice(pageItem.start, pageItem.end).map(product => (
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