import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import Features from "../../components/Features/Features";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleProduct} from "../../features/getProduct";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import "../../styles/single-page.scss";

const SinglePage = () => {

    const {productId} = useParams();
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false);

    const {data: productData, loading: productLoading, error: productErr} = useSelector(state => state.product);
    const {data: wishListData, loading: wishListLoading} = useSelector(state => state.wishlist);

    useEffect(() => {
        dispatch(fetchSingleProduct(productId))
    }, [productId]);

    useEffect(() => {
        const id = productId
        const isProductInWishlist = wishListData.findIndex(data => data._id === id);
        if (isProductInWishlist === -1){
            setIsClicked(false)
        }else {
            setIsClicked(true)
        }
    }, [wishListData, productId]);

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
                    <SingleProduct product={productData} isClicked={isClicked} setIsClicked={setIsClicked}/>
                    <Features title="Related Products" />
                </>
            ) : null}
        </Helmet>
    );
};

export default SinglePage;