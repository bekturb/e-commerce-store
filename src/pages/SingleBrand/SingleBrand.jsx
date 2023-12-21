import React, {useEffect, useState} from 'react';
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleBrand} from "../../features/getSingleBrand";
import DefiniteProductsCart from "../../components/DefiniteProductsCart/DefiniteProductsCart";
import Helmet from "../../layout/Helmet";

const SingleBrand = () => {

    const [filteredProducts, setFilteredProducts] = useState([]);

    const dispatch = useDispatch();
    const {brandId} = useParams();

    const {data: products} = useSelector(state => state.products);
    const {data: singleBrand, loading: singleBrandLoading, error: singleBrandError} = useSelector(state => state.singleBrand);

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
        <Helmet title="Single-brand">
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
                    <DefiniteProductsCart filteredProducts={filteredProducts} pageName={singleBrand?.name}/>
                ) : null
            }
        </Helmet>
    );
};

export default SingleBrand;