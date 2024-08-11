import React, { useState } from "react";
import HeaderDashboard from "../../components/User/HeaderDashboard";
import Helmet from "../../layout/Helmet";
import UserSidebar from "../../components/User/UserSidebar";
import SecTop from "../../components/SecTop/SecTop";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import CommonProfile from "../../components/CommonProfile/CommonProfile";
import { useSelector } from "react-redux";

const ClientDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { data, loading, error } = useSelector((state) => state.authMe);

  return (
    <Helmet title="User Profile">
      <HeaderDashboard setOpenSidebar={setOpenSidebar} />
      <div className="dashboard">
        <div className="dashboard__container">
          <div className="dashboard__wrapper">
            <div className="dashboard__sidebar">
              <UserSidebar
                active={1}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            </div>
            <div className="dashboard__products">
              <SecTop title="User Profile" />
              <div className="dashboard__left">
                {loading ? (
                  <div className="loader-box">
                    <Loader />
                  </div>
                ) : error ? (
                  <div className="loader-box">
                    <NotFound error={error} />
                  </div>
                ) : data ? (
                  <CommonProfile
                    status={"User"}
                    myShopData={data}
                    products={[]}
                    shopOrder={[]}
                  />
                ) : (
                  <div>No data</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ClientDashboard;
