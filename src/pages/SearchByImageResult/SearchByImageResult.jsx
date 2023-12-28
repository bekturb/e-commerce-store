import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSearchProductsByImage} from "../../features/searchProductsSlice";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import DefiniteProductsCart from "../../components/DefiniteProductsCart/DefiniteProductsCart";
import Helmet from "../../layout/Helmet";

const SearchByImageResult = () => {

    const {data: searchProducts, loading: searchProductsLoad, error: searchProductsErr} = useSelector(state => state.searchProducts);
    const {searchImage} = useSelector(state => state.searchByImageReducer)

    const dispatch = useDispatch();

    useEffect(() => {
        if (searchImage) {

            const formData = new FormData();
            formData.append('image', searchImage);

            dispatch(fetchSearchProductsByImage(formData));
        }
    }, [dispatch, searchImage]);

    return (
        <Helmet title="Search-Result-Image">
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
                    <DefiniteProductsCart filteredProducts={searchProducts?.products} pageName="Search By Image" locationPosition={false}/>
                ) : null
            }
        </Helmet>
    );
};

export default SearchByImageResult;