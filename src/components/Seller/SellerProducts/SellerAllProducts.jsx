import React from 'react';
import {Link} from "react-router-dom";
import Pro from "../../../assets/products/apparel1.jpg"
import "./seller-products.scss"
import {useSelector} from "react-redux";
import SellerProductsCart from "../SellerProductsCart/SellerProductsCart";

const SellerAllProducts = () => {

    const {data: myShopData} = useSelector(state => state.myShop);
    const {data: products, loading: productsLoad, error:productsErr} = useSelector(state => state.products);
    const sortedProducts = products ? [...products].filter(el => el.shopId === myShopData?._id) : [];

    return (
        <div className="product-table">
            <table className="product-table__table">
                <thead className="product-table__thead">
                <tr>
                    <th className="product-table__list-item">Product</th>
                    <th className="product-table__list-item">Vendor Code</th>
                    <th className="product-table__list-item">Price</th>
                    <th className="product-table__list-item">Stock</th>
                    <th className="product-table__list-item">Sold</th>
                    <th className="product-table__list-item">Edit</th>
                    <th className="product-table__list-item">Delete</th>
                </tr>
                </thead>
                <tbody className="tbody">
                {
                    sortedProducts?.map(pro => (
                        <SellerProductsCart key={pro._id} pro={pro}/>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default SellerAllProducts;