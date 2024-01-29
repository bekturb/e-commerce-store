import React from 'react';
import {useSelector} from "react-redux";
import SellerProductsCart from "../SellerProductsCart/SellerProductsCart";
import Loader from "../../Loader/Loader";
import NotFound from "../../NotFound/NotFound";
import "./seller-products.scss"

const SellerAllProducts = ({pageItem, filteredProducts}) => {

    const {loading: productsLoad, error: productsErr} = useSelector(state => state.products);

    return (
        <div className="product-table products-table--height">
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
                {productsLoad ? (
                    <tr>
                        <td colSpan="7" className="loader-box">
                            <Loader/>
                        </td>
                    </tr>
                ) : productsErr ? (
                    <tr>
                        <td colSpan="7" className="loader-box">
                            <NotFound error={productsErr}/>
                        </td>
                    </tr>
                ) :
                    filteredProducts?.length > 0 ? (
                            filteredProducts?.slice(pageItem.start, pageItem.end).map(pro => (
                                <SellerProductsCart key={pro._id} pro={pro}/>
                            ))
                        ) : (
                    <tr>
                        <td colSpan="7">No data</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default SellerAllProducts;