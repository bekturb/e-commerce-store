import React, {useState} from 'react';
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../../components/Seller/SellerSidebar/SellerSidebar";
import SecTop from "../../../components/SecTop/SecTop";
import Helmet from "../../../layout/Helmet";
import AddCoupon from '../../../components/Seller/AddCoupon/AddCoupon';

const AddSellerCoupon = () => {
      const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Helmet title="Add-Coupon">
            <HeaderDashboard setOpenSidebar={setOpenSidebar}/>
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="dashboard__wrapper">
                        <div className="dashboard__sidebar">
                            <SellerSidebar active={6} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                        </div>
                        <div className="dashboard__products">
                            <SecTop title="Add Coupon"/>
                            <AddCoupon productData={null}/>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
  )
}

export default AddSellerCoupon