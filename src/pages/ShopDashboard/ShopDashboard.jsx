import React from 'react';
import Helmet from "../../layout/Helmet";
import HeaderDashboard from "../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../components/Seller/SellerSidebar/SellerSidebar";

const ShopDashboard = () => {
    return (
        <Helmet title="Seller-Dashboard">
            <HeaderDashboard/>
            <div className="dashboard">
                <div className="dashboard__wrapper">
                    <SellerSidebar/>
                </div>
            </div>
        </Helmet>
    );
};

export default ShopDashboard;