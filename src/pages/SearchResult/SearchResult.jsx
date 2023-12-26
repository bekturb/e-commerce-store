import React, {useEffect} from 'react';
import Helmet from "../../layout/Helmet";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import DefiniteProductsCart from "../../components/DefiniteProductsCart/DefiniteProductsCart";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {fetchSearchProducts} from "../../features/searchProductsSlice";

const SearchResult = () => {

    const {data: searchProducts, loading: searchProductsLoad, error: searchProductsErr} = useSelector(state => state.searchProducts);

    const { searchProduct } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchProduct) {
            dispatch(fetchSearchProducts(searchProduct));
        }
    }, [dispatch, searchProduct]);

    if (searchProducts?.product && searchProducts?.product._id) {
        navigate(`/catalog/${searchProducts.product._id}`);
        return null;
    }

    return (
        <Helmet title="Search-result">
            {
                searchProductsLoad ? (
                    <div className="loader-box">
                        <Loader />
                    </div>
                ) : searchProductsErr ? (
                    <div className="loader-box">
                        <NotFound error={searchProductsErr}/>
                    </div>
                ) : searchProducts?.products ? (
                    <DefiniteProductsCart filteredProducts={searchProducts?.products} pageName={searchProduct} locationPosition={false}/>
                ) : null
            }
        </Helmet>
    );
};

export default SearchResult;