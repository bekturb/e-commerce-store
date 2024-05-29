import React from "react";
import { useSelector } from "react-redux";
import OrderTableCart from "../OrderTableCart/OrderTableCart";
import Loader from "../../Loader/Loader";
import NotFound from "../../NotFound/NotFound";

const ShopOrderTable = ({ pageItem, filteredOrders }) => {
  
  const { loading: shopOrderLoading, error: shopOrderError } = useSelector( (state) => state.shopOrder);

  return (
    <div className="product-table products-table--height">
      <table className="product-table__table">
        <thead className="product-table__thead">
          <tr>
            <th className="product-table__list-item">ID</th>
            <th className="product-table__list-item">Name</th>
            <th className="product-table__list-item">Address</th>
            <th className="product-table__list-item">Price</th>
            <th className="product-table__list-item">Status</th>
            <th className="product-table__list-item">Action</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {shopOrderLoading ? (
            <tr>
              <td colSpan="7" className="loader-box">
                <Loader />
              </td>
            </tr>
          ) : shopOrderError ? (
            <tr>
              <td colSpan="7" className="loader-box">
                <NotFound error={shopOrderError} />
              </td>
            </tr>
          ) : filteredOrders?.length > 0 ? (
            filteredOrders
              ?.slice(pageItem.start, pageItem.end)
              ?.map((order) => <OrderTableCart key={order._id} order={order} />)
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

export default ShopOrderTable;
