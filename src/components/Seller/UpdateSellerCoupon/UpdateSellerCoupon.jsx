import React, { useEffect, useState } from "react";
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../../components/Seller/SellerSidebar/SellerSidebar";
import SecTop from "../../../components/SecTop/SecTop";
import Helmet from "../../../layout/Helmet";
import AddCoupon from "../../../components/Seller/AddCoupon/AddCoupon";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCoupon } from "../../../features/getSingleCoupon";
import NotFound from "../../NotFound/NotFound";
import Loader from "../../Loader/Loader";

const UpdateSellerCoupon = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const { data, loading, error } = useSelector((state) => state.singleCoupon);
  
  const { couponId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleCoupon(couponId));
  }, []);

  return (
    <Helmet title="Update-Coupon">
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
              <SecTop title="Update Coupon" />
              {loading ? (
                <div className="loader-box">
                  <Loader />
                </div>
              ) : error ? (
                <div className="loader-box">
                  <NotFound error={error} />
                </div>
              ) : data ? (
                <AddCoupon couponData={data} />
              ) : (
                <div>No data</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default UpdateSellerCoupon;
