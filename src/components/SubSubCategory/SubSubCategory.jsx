import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import DefiniteProductsCart from "../DefiniteProductsCart/DefiniteProductsCart";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import Helmet from "../../layout/Helmet";
import "./subsubcategory.scss";

const SubSubCategory = ({category}) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const {data: products, loading, error} = useSelector(state => state.products);

    useEffect(() => {
        if (products?.length > 0) {
            const catProducts = products.filter(pro => pro.category === category?._id);
            setFilteredProducts(catProducts)
        }
    }, [products, category]);

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
                    <DefiniteProductsCart filteredProducts={filteredProducts} pageName={category?.name} locationPosition={true}/>
                ) : null
            }
        </Helmet>
    );
};

export default SubSubCategory;