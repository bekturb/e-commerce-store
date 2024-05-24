import React from 'react';
import { useState } from 'react';
import Helmet from '../../layout/Helmet';
import HeaderDashboard from '../../components/Dashboard/HeaderDashboard';
import SellerSidebar from '../../components/Seller/SellerSidebar/SellerSidebar';
import SecTop from '../../components/SecTop/SecTop';
import ShopOrderTable from '../../components/Seller/ShopOrderTable/ShopOrderTable';

const ShopOrders = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [searchValue, setSearchValue] = useState("");

  return (
    <Helmet title="Seller-Orders">
            <HeaderDashboard setOpenSidebar={setOpenSidebar} />
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="dashboard__wrapper">
                        <div className="dashboard__sidebar">
                            <SellerSidebar active={3} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                        </div>
                        <div className="dashboard__products">
                            <SecTop title="All Orders" />
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
                            </div>
                            <ShopOrderTable />
                            {/* {
                                filteredProducts.length > 1 && (
                                    <Pagination
                                        posts={filteredProducts}
                                        setPageItem={setPageItem}
                                    />
                                )
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
  )
}

export default ShopOrders