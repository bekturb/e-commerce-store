import React from 'react';
import {useSelector} from "react-redux";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import ProductsComp from "../ProductsComp/ProductsComp";
import {Link} from "react-router-dom";

const RelatedProducts = ({title, product}) => {
    const {data: products, loading: productsLoad, error:productsErr} = useSelector(state => state.products);
    const {data: allCategories} = useSelector(state => state.allCategories);
    const sortedProducts = products ? [...products].filter(prod => prod.category === product?.category).slice(0, 8) : [];
    const relatedCat = allCategories?.find(cat => cat._id === product.category)

    return (
        <div id="features" className="features">
            <div className="container">
                <div className="features__wrapper">
                    <div className="features__column">
                        {
                            sortedProducts?.length > 0 && (
                                <div className="secTop flexitem">
                                    <h2 className="secTop__inner">
                                        <span className="secTop__circle circle"></span>
                                        <span className="secTop__title">{title}</span>
                                    </h2>
                                    <div className="secTop__second-links">
                                        <Link to={`/category/${relatedCat.slug}`} className="view-all">View all <i className="ri-arrow-right-line"></i></Link>
                                    </div>
                                </div>
                            )
                        }
                        {
                            productsLoad ? (
                                <div className="trending__loader">
                                    <Loader />
                                </div>
                            ) : productsErr ? (
                                <div className="trending__loader">
                                    <NotFound error={productsErr} />
                                </div>
                            ) : sortedProducts.length > 0 ? (
                                <ProductsComp products={sortedProducts} />
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;