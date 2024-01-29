import React, {useEffect, useState} from 'react';
import HeaderDashboard from "../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../components/Seller/SellerSidebar/SellerSidebar";
import SecTop from "../../components/SecTop/SecTop";
import Helmet from "../../layout/Helmet";
import AddProduct from "../../components/Seller/AddProduct/AddProduct";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleProduct} from "../../features/getProduct";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import DefiniteProductsCart from "../../components/DefiniteProductsCart/DefiniteProductsCart";

const AddSellerProducts = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <Helmet title="Add-Product">
            <HeaderDashboard setOpenSidebar={setOpenSidebar}/>
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="dashboard__wrapper">
                        <div className="dashboard__sidebar">
                            <SellerSidebar active={2} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                        </div>
                        <div className="dashboard__products">
                            <SecTop title="Add Product"/>
                            <AddProduct productData={null}/>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default AddSellerProducts;