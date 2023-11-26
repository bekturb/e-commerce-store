import React, {useEffect} from 'react';
import Helmet from "../../layout/Helmet";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import Features from "../../components/Features/Features";
import Banners from "../../components/Banners/Banners";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleProduct} from "../../features/getProduct";
import "../../styles/single-page.scss";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";

const SinglePage = () => {

    const {productId} = useParams();
    const dispatch = useDispatch();

    const {data: productData, loading: productLoading, error: productErr} = useSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId))
    }, [productId]);

    return (
        <Helmet title="Single-Page">
            {productLoading ? (
                <div className="trending__loader">
                    <Loader />
                </div>
            ) : productErr ? (
                <div className="trending__loader">
                    <NotFound error={productErr}/>
                </div>
            ) : productData ? (
                <>
                    <SingleProduct product={productData} />
                    <Features title="Related Products" />
                </>
            ) : null}
        </Helmet>
    );
};

export default SinglePage;