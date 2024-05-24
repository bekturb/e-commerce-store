import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const OrderTableCart = ({order}) => {
  return (
    <tr className="product-table__contents">
            <td className="flexitem product-table__content-item">
              <div className="content product-table__content">
                <strong>
                  <p className="content__link">{order._id}</p>
                </strong>
              </div>
            </td>
            <td className="product-table__content-item product-table__content-item--display">
              <div className="">{order.user.firstName}</div>
            </td>
            <td className="product-table__content-item">2020 Jul 13</td>
            <td className="product-table__content-item">{order.totalPrice}$</td>
            <td className="product-table__content-item">{order.status}</td>
            <td className="product-table__content-item">
              <span className="item-remove">
                {false ? (
                  <FontAwesomeIcon icon={faSpinner} spinPulse />
                ) : (
                  <i className="ri-delete-bin-4-line"></i>
                )}
              </span>
            </td>
          </tr>
  )
}

export default OrderTableCart