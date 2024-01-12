import React, {useState} from 'react';
import HeaderDashboard from "../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../components/Seller/SellerSidebar/SellerSidebar";
import Helmet from "../../layout/Helmet";
import SellerAllProducts from "../../components/Seller/SellerProducts/SellerAllProducts";
import SecTop from "../../components/SecTop/SecTop";

const ShopAllProducts = () => {

    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <Helmet title="Seller-Dashboard">
            <HeaderDashboard setOpenSidebar={setOpenSidebar}/>
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="dashboard__wrapper">
                        <div className="dashboard__sidebar">
                            <SellerSidebar active={2} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                        </div>
                        <div className="dashboard__products">
                            <SecTop title="All Products"/>
                            <SellerAllProducts/>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default ShopAllProducts;