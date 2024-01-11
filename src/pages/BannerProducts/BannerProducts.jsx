import React from 'react';
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import DefiniteProductsCart from "../../components/DefiniteProductsCart/DefiniteProductsCart";
import Helmet from "../../layout/Helmet";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

const BannerProducts = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const categoryId = queryParams.get('categoryId');
    const sale = queryParams.get('sale');

    const {data: products, loading: productsLoad, error:productsErr} = useSelector(state => state.products);
    const sortedProducts = products ? [...products].filter(product => product.category === categoryId && product.salePercentage > +sale && product.salePercentage < +sale + 10) : [];

    return (
        <Helmet title="Banner-Products">
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
                    <DefiniteProductsCart filteredProducts={sortedProducts} pageName="" locationPosition={true}/>
                ) : <div>
                    No data
                </div>
            }
        </Helmet>
    );
};

export default BannerProducts;