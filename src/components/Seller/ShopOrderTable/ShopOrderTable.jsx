import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderTableCart from "../OrderTableCart/OrderTableCart";
import { getShopOrder } from "../../../features/getShopOrderSlice";
import Loader from "../../Loader/Loader";
import NotFound from "../../NotFound/NotFound";

const ShopOrderTable = () => {
  const { data: myShopData } = useSelector((state) => state.myShop);
  const {
    data: shopOrder,
    loading: shopOrderLoading,
    error: shopOrderError,
  } = useSelector((state) => state.shopOrder);

  console.log(shopOrder, "shop");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopOrder(myShopData._id));
  }, [dispatch, myShopData]);

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
          ) : shopOrder?.length > 0 ? (
            shopOrder
              ?.map((order) =>  <OrderTableCart key={order._id} order={order}/>)
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
