import React, {useEffect} from 'react';
import Helmet from "../../layout/Helmet";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleProduct} from "../../features/getProduct";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import "../../styles/single-page.scss";

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
                    <SingleProduct product={productData}/>
                    <RelatedProducts title="Related Products" product={productData} />
                </>
            ) : null}
        </Helmet>
    );
};

export default SinglePage;