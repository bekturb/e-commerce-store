import React from 'react';
import HeaderDashboard from "../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../components/Seller/SellerSidebar/SellerSidebar";
import Helmet from "../../layout/Helmet";
import SellerAllProducts from "../../components/Seller/SellerProducts/SellerAllProducts";

const ShopAllProducts = () => {
    return (
        <Helmet title="Seller-Dashboard">
            <HeaderDashboard/>
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="dashboard__wrapper">
                        <div className="dashboard__sidebar">
                            <SellerSidebar active={2}/>
                        </div>
                        <div className="dashboard__products">
                            <SellerAllProducts/>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default ShopAllProducts;