import React from 'react';
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import CategoryProductsCart from "../CategoryProductsCart/CategoryProductsCart";

const CategoryProducts = ({productsLoad, productsErr, paginatedProducts}) => {
    return (
        <div className="products pro flexwrap">
            {
                productsLoad ? (
                    <div className="trending__loader">
                        <Loader />
                    </div>
                ) : (
                    productsErr ? (
                        <div className="trending__loader">
                            <NotFound error={productsErr} />
                        </div>
                    ) : (
                        <>
                            {
                                paginatedProducts?.length > 0 ? (
                                    paginatedProducts?.map(product => (
                                        <CategoryProductsCart key={product._id} product={product}/>
                                    ))
                                ) : (
                                    <div>
                                        Not Found
                                    </div>
                                )
                            }
                        </>
                    )
                )
            }
        </div>
    );
};

export default CategoryProducts;