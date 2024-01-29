import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import HeaderDashboard from "../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../components/Seller/SellerSidebar/SellerSidebar";
import SecTop from "../../components/SecTop/SecTop";
import AddProduct from "../../components/Seller/AddProduct/AddProduct";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSingleProductToUpdate} from "../../features/getProduct";

const UpdateSellerProduct = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const {productId} = useParams();

    const dispatch = useDispatch();

    const {data: productData, loading: productLoading, error: productErr} = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getSingleProductToUpdate(productId))
    }, [productId, dispatch]);

    return (
        <Helmet title="Upload-Product">
            <HeaderDashboard setOpenSidebar={setOpenSidebar}/>
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="dashboard__wrapper">
                        <div className="dashboard__sidebar">
                            <SellerSidebar active={2} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                        </div>
                        <div className="dashboard__products">
                            <SecTop title="Upload Product"/>
                            {
                                productLoading ? (
                                    <div className="loader-box">
                                        <Loader />
                                    </div>
                                ) : productErr ? (
                                    <div className="loader-box">
                                        <NotFound error={productErr}/>
                                    </div>
                                ) : productData ? (
                                    <AddProduct productData={productData}/>
                                ) : <div>
                                    No data
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default UpdateSellerProduct;