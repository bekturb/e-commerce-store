import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import DefiniteProductsCart from "../DefiniteProductsCart/DefiniteProductsCart";
import "./subsubcategory.scss";

const SubSubCategory = ({category}) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const {data: products} = useSelector(state => state.products);

    useEffect(() => {
        if (products?.length > 0) {
            const catProducts = products.filter(pro => pro.category === category?._id);
            setFilteredProducts(catProducts)
        }
    }, [products, category]);

    return (
        <DefiniteProductsCart filteredProducts={filteredProducts} pageName={category?.name}/>
    );
};

export default SubSubCategory;