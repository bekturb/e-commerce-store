import React from 'react';
import ProductsCart from "../ProductsCart/ProductsCart";
import {useSelector} from "react-redux";

const ProductsComp = ({products}) => {

    const {data: wishListData, loading: wishListLoading} = useSelector(state => state.wishlist);
    const {data: compareProducts} = useSelector(state => state.compareProducts);

    return (
        <div className="products pro flexwrap">
            {
                products?.map(product => (
                    <ProductsCart
                        key={product._id}
                        product={product}
                        wishListData={wishListData}
                        wishListLoading={wishListLoading}
                        compareProducts={compareProducts}
                    />
                ))
            }
        </div>
    );
};

export default ProductsComp;