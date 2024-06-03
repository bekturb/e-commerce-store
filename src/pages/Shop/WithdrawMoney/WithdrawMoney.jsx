import React,  {useState } from "react";
import Helmet from "../../../layout/Helmet";
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../../components/Seller/SellerSidebar/SellerSidebar";
import SecTop from "../../../components/SecTop/SecTop";

const WithdrawMoney = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Helmet title="Withdraw-Money">
      <HeaderDashboard setOpenSidebar={setOpenSidebar} />
      <div className="dashboard">
        <div className="dashboard__container">
          <div className="dashboard__wrapper">
            <div className="dashboard__sidebar">
              <SellerSidebar
                active={4}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            </div>
            <div className="dashboard__products">
              <SecTop title="Withdraw Money"/>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default WithdrawMoney