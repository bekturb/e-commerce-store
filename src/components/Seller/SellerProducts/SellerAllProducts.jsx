import React from 'react';
import {Link} from "react-router-dom";
import Pro from "../../../assets/products/apparel1.jpg"
import "./seller-products.scss"

const SellerAllProducts = () => {
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
                <tr className="product-table__contents">
                    <td className="flexitem product-table__content-item">
                        <div className="product-table__thumbnail">
                            <Link to={`/catalog/:id`} className="product-table__link">
                                <img className="product-table__img" src={Pro} alt=""/>
                            </Link>
                        </div>
                        <div className="content product-table__content">
                            <strong>
                                <Link to={`/catalog/product`} className="content__link">
                                    name name manem amen amen
                                </Link>
                            </strong>
                            <p className="content__color">Color: red</p>
                        </div>
                    </td>
                    <td className="product-table__content-item">23838832</td>
                    <td className="product-table__content-item">$1239</td>
                    <td className="product-table__content-item">
                        129
                    </td>
                    <td className="product-table__content-item">
                        100
                    </td>
                    <td className="product-table__content-item">
                                    <span className="item-remove">
                                        <i className="ri-pencil-line"></i>
                                    </span>
                    </td>
                    <td className="product-table__content-item">
                                    <span className="item-remove">
                                        <i className="ri-delete-bin-4-line"></i>
                                    </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SellerAllProducts;