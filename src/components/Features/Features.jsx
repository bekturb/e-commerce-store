import React from 'react';
import {useSelector} from "react-redux";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import ProductsComp from "../ProductsComp/ProductsComp";
import "./features.scss";

const Features = ({title}) => {

    const {data: products, loading: productsLoad, error:productsErr} = useSelector(state => state.products);
    const sortedProducts = products ? [...products].sort((a, b) => b.totalRating - a.totalRating).slice(0, 8) : [];

    return (
        <div id="features" className="features">
            <div className="container">
                <div className="features__wrapper">
                    <div className="features__column">
                        <div className="secTop flexitem">
                            <h2 className="secTop__inner">
                                <span className="secTop__circle circle"></span>
                                <span className="secTop__title">{title}</span>
                            </h2>
                            <div className="secTop__second-links">
                                <a className="view-all" href="#">View all <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </div>
                        {
                            productsLoad && (
                                <div className="trending__loader">
                                    <Loader />
                                </div>
                            )
                        }
                        {
                            productsErr && (
                                <div className="trending__loader">
                                    <NotFound error={productsErr} />
                                </div>
                            )
                        }
                        <ProductsComp products={sortedProducts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;