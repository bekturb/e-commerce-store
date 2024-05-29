import React from "react";
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const OrderTableCart = ({ order }) => {

    const makeStyle = (status) => {
        if(status === "Pending") {
            return {
                color: "red"
            }
        }else if(status === "Delivered") {
            return {
                color: "green"
            }
        } else {
            return {
                color: "grey"
            }
        }
    }

    const makeDotStyle = (status) => {
        if(status === "Pending") {
            return {
                background: "red"
            }
        }else if(status === "Delivered") {
            return {
                background: "green"
            }
        } else {
            return {
                background: "grey"
            }
        }
    }

    const formattedDate = format(new Date(order.createdAt), 'yyyy MMMM d');

  return (
    <tr className="product-table__contents">
      <td className="flexitem product-table__content-item">
        <div className="product-table__content-table">{order._id}</div>
      </td>
      <td className="product-table__content-item product-table__content-item--display">
        <div className="product-table__content-table">
          {order.user.firstName}
        </div>
      </td>
      <td className="product-table__content-item">
        <div className="product-table__content-table">{formattedDate}</div>
      </td>
      <td className="product-table__content-item">
        <div className="product-table__content-table">{order.totalPrice}$</div>
      </td>
      <td className="product-table__content-item">
      <div className="product-table__content-table">
        <div className="product-table__content-status--dot status-dot" style={makeDotStyle(order?.status)}>
            <span className="status-dot__wave" style={{ '--i': '0' }}></span>
            <span className="status-dot__wave" style={{ '--i': '1' }}></span>
        </div>
        <span className="product-table__content-status" style={makeStyle(order?.status)}>{order?.status}</span>
      </div>
      </td>
      <td className="product-table__content-item">
        <span className="item-remove">
            <FontAwesomeIcon icon={faEllipsis} />
        </span>
      </td>
    </tr>
  );
};

export default OrderTableCart;
