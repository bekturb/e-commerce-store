import React from 'react';
import Helmet from "../../layout/Helmet";
import {useSelector} from "react-redux";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import DefiniteProductsCart from "../../components/DefiniteProductsCart/DefiniteProductsCart";

const Wishlist = () => {

    const {data: wishListData, loading: wishListLoading, error: wishlistError} = useSelector(state => state.wishlist);

    return (
        <Helmet title="Wishlist">
            {
                wishListLoading ? (
                    <div className="loader-box">
                        <Loader />
                    </div>
                ) : wishlistError ? (
                    <div className="loader-box">
                        <NotFound error={wishlistError}/>
                    </div>
                ) : wishListData?.length > 0 ? (
                    <DefiniteProductsCart filteredProducts={wishListData} pageName="Wishlist"/>
                ) : <div>
                    No data
                </div>
            }
        </Helmet>
    );
};

export default Wishlist;