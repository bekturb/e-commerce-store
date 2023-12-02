import React, {useEffect} from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import SecTop from "../../components/SecTop/SecTop";
import Search from "../../components/Search/Search";
import {sortData} from "../../customData/sortData";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import ProductsCart from "../../components/ProductsCart/ProductsCart";
import Pagination from "../../components/Pagination/Pagination";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleBrand} from "../../features/getSingleBrand";

const SingleBrand = () => {

    const {brandId} = useParams();
    const dispatch = useDispatch();
    const {data: singleBrand, loading: singleBrandLoading, error: singleBrandError} = useSelector(state => state.singleBrand);
    const {data: products, loading: productsLoading, error: productsError} = useSelector(state => state.products);

    console.log(singleBrand, "sing")

    useEffect(() => {
        dispatch(fetchSingleBrand(brandId))
    }, [brandId])

    return (
        <div className="subcat">
            <div className="container">
                <div className="subcat__wrapper">
                    <div className="subcat__column">
                        <div className="subcat__head">
                            <SecTop title={singleBrand?.name}/>
                        </div>
                        <div className="subcat__body">
                            <div className="products pro flexwrap">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBrand;