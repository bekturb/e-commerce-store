import React from 'react';
import {Link} from "react-router-dom";
import CopyLinkButton from "../../../utils/copyLinkButton";

const SellerProductsCart = ({pro}) => {
    return (
        <tr className="product-table__contents">
            <td className="flexitem product-table__content-item">
                <div className="product-table__thumbnail">
                    <Link to={`/catalog/:id`} className="product-table__link">
                        <img className="product-table__img" src={pro.variants[0].images[0].url} alt=""/>
                    </Link>
                </div>
                <div className="content product-table__content">
                    <strong>
                        <Link to={`/catalog/${pro._id}`} className="content__link">
                            {pro.name}
                        </Link>
                    </strong>
                </div>
            </td>
            <td className="product-table__content-item product-table__content-item--display">
                <div className="flexitem">
                    {pro.vendorCode}
                    <CopyLinkButton linkToCopy={pro?.vendorCode} />
                </div>
            </td>
            <td className="product-table__content-item">
                {
                    pro.variants[0].discountPrice ? `$${pro.variants[0].discountPrice.toFixed(2)}` : `$${pro.variants[0].originalPrice.toFixed(2)}`
                }
            </td>
            <td className="product-table__content-item">
                {pro.totalQuantity}
            </td>
            <td className="product-table__content-item">
                {pro.totalSold}
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
    );
};

export default SellerProductsCart;