import React from 'react';
import {useSelector} from "react-redux";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import DefiniteProductsCart from "../../components/DefiniteProductsCart/DefiniteProductsCart";
import Helmet from "../../layout/Helmet";

const FeaturedProducts = () => {

    const {data: products, loading: productsLoad, error:productsErr} = useSelector(state => state.products);
    const sortedProducts = products ? [...products].sort((a, b) => b.totalRating - a.totalRating).slice(0, 500) : [];

    return (
        <Helmet title="Featured-products">
            {
                productsLoad ? (
                    <div className="loader-box">
                        <Loader />
                    </div>
                ) : productsErr ? (
                    <div className="loader-box">
                        <NotFound error={productsErr}/>
                    </div>
                ) : sortedProducts?.length > 0 ? (
                    <DefiniteProductsCart filteredProducts={sortedProducts} pageName="Featured-Products" locationPosition={true}/>
                ) : <div>
                    No data
                </div>
            }
        </Helmet>
    );
};

export default FeaturedProducts;