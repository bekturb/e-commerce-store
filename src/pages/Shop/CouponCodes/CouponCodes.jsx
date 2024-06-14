import React, { useEffect, useState } from "react";
import Helmet from "../../../layout/Helmet";
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../../components/Seller/SellerSidebar/SellerSidebar";
import SecTop from "../../../components/SecTop/SecTop";
import { useDispatch, useSelector } from "react-redux";
import { getShopCoupons } from "../../../features/couponSlice";
import SellerAllCoupons from "../../../components/Seller/SellerAllCoupons/SellerAllCoupons";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";

const CouponCodes = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { data: couponData } = useSelector((state) => state.coupons);
  const { perPage } = useSelector((state) => state.filterProducts);

  const dispatch = useDispatch();

  const [pageItem, setPageItem] = useState({
    start: 0,
    end: perPage,
  });

  const filteredCoupons = couponData
    ? [...couponData]
        .filter(
          (el) =>
            el.name.toLowerCase().includes(searchValue.toLowerCase())
        )
    : [];

  useEffect(() => {
    dispatch(getShopCoupons())
  }, [dispatch])

  return (
    <Helmet title="Coupon-Codes">
      <HeaderDashboard setOpenSidebar={setOpenSidebar} />
      <div className="dashboard">
        <div className="dashboard__container">
          <div className="dashboard__wrapper">
            <div className="dashboard__sidebar">
              <SellerSidebar
                active={6}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            </div>
            <div className="dashboard__products">
              <SecTop title="Coupon Codes" />
              <div className="dropdown flexitem">
                <div className="search dashboard__search">
                  <span className="icon-sm dashboard__search-icon">
                    <i className="ri-search-line"></i>
                  </span>
                  <input
                    className="dashboard__input"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <Link to="/shop/add-coupon">
                    <button className="dashboard__button">Add Coupon</button>
                  </Link>
              </div>
              <SellerAllCoupons
                filteredCoupons={filteredCoupons}
                pageItem={pageItem}
              />
               {filteredCoupons.length > 1 && (
                <Pagination
                  posts={filteredCoupons}
                  setPageItem={setPageItem}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default CouponCodes;
