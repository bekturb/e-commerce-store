import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import NotFound from "../../NotFound/NotFound";
import SellerCouponsCart from "../SellerCouponsCart/SellerCouponsCart";

const SellerAllCoupons = ({filteredCoupons, pageItem}) => {

    const { loading: couponsLoad, error: couponsErr } = useSelector(state => state.coupons);

  return (
    <div className="product-table products-table--height">
      <table className="product-table__table">
        <thead className="product-table__thead">
          <tr>
            <th className="product-table__list-item">Name</th>
            <th className="product-table__list-item">Value</th>
            <th className="product-table__list-item">Min Amount</th>
            <th className="product-table__list-item">Max Amount</th>
            <th className="product-table__list-item">Edit</th>
            <th className="product-table__list-item">Delete</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {couponsLoad ? (
            <tr>
              <td colSpan="7" className="loader-box">
                <Loader />
              </td>
            </tr>
          ) : couponsErr ? (
            <tr>
              <td colSpan="7" className="loader-box">
                <NotFound error={couponsErr} />
              </td>
            </tr>
          ) : filteredCoupons?.length > 0 ? (
            filteredCoupons
              ?.slice(pageItem.start, pageItem.end)
              .map((coupon) => (
                <SellerCouponsCart
                  key={coupon._id}
                  coupon={coupon}
                />
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

export default SellerAllCoupons;
