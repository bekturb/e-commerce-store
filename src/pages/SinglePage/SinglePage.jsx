import React, {useEffect} from 'react';
import Helmet from "../../layout/Helmet";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import Features from "../../components/Features/Features";
import Banners from "../../components/Banners/Banners";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "../../styles/single-page.scss";
import {fetchSingleProduct} from "../../features/getProduct";

const SinglePage = () => {

    const {productId} = useParams();
    const dispatch = useDispatch();

    const {data: productData, loading: productLoading, error: productLoad} = useSelector(state => state.product);

    console.log(productData, "pr")

    useEffect(() => {
        dispatch(fetchSingleProduct(productId))
    }, [productId]);

    if (!productData) {
        return (
            <div>
                Not Found
            </div>
        )
    }

    return (
        <Helmet title="Single-Page">
            {
                productData && (
                    <>
                        <SingleProduct product={productData}/>
                        <Features title="Related Products"/>
                        <Banners />
                    </>
                )
            }
        </Helmet>
    );
};

export default SinglePage;