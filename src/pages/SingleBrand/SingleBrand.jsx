import React, {useEffect, useState} from 'react';
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import DefiniteProductsCart from "../../components/DefiniteProductsCart/DefiniteProductsCart";
import Helmet from "../../layout/Helmet";

const SingleBrand = () => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const {brandName} = useParams();

    const {data: products, loading, error} = useSelector(state => state.products);

    useEffect(() => {
        if (products?.length > 0) {
            const catProducts = products?.filter(pro => {
                return pro.brand.toLowerCase() === brandName.toLowerCase()
            });
            setFilteredProducts(catProducts)
        }
    }, [products]);

    return (
        <Helmet title="Single-brand">
            {
                loading ? (
                    <div className="loader-box">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="loader-box">
                        <NotFound error={error}/>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <DefiniteProductsCart filteredProducts={filteredProducts} pageName={brandName} locationPosition={true}/>
                ) : null
            }
        </Helmet>
    );
};

export default SingleBrand;