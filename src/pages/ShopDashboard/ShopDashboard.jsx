import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import HeaderDashboard from "../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../components/Seller/SellerSidebar/SellerSidebar";
import SecTop from "../../components/SecTop/SecTop";
import Line1 from "../../assets/dashboard-image/line-1.svg";
import Line2 from "../../assets/dashboard-image/line-2.svg";
import Line3 from "../../assets/dashboard-image/line-3.svg";
import Line4 from "../../assets/dashboard-image/line-4.svg";
import AnalyticsMiniBlock from "../../components/AnalyticsMiniBlock/AnalyticsMiniBlock";
import AnalyticsBigBlock from "../../components/AnalyticsBigBlock/AnalyticsBigBlock";
import {useDispatch, useSelector} from "react-redux";
import {getShopOrder} from "../../features/getShopOrderSlice";
import {fetchProducts} from "../../features/productsSlice";
import "./shop-dashboard.scss";

const ShopDashboard = () => {

    const [openSidebar, setOpenSidebar] = useState(false);
    const {data: myShopData} = useSelector(state => state.myShop);
    const {data: products, loading: productsLoading, error: productsError} = useSelector(state => state.products);
    const {data: shopOrder, loading: shopOrderLoading, error: shopOrderError} = useSelector(state => state.shopOrder);

    const dispatch = useDispatch()

    const myProduct = products && myShopData ? [...products].filter(el => el.shopId === myShopData._id) : [];

    function filterProductsByLastWeek(products) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        return products.filter(product => {
            const productDate = new Date(product.createdAt);
            return product.shopId === myShopData._id && productDate >= oneWeekAgo;
        });
    }

    const filteredProducts = products && filterProductsByLastWeek([...products]);

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(getShopOrder(myShopData._id))
    }, [])

    return (
        <Helmet title="Seller-Dashboard">
            <HeaderDashboard setOpenSidebar={setOpenSidebar}/>
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="dashboard__wrapper">
                        <div className="dashboard__sidebar">
                            <SellerSidebar active={1} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                        </div>
                        <div className="dashboard__products">
                            <SecTop title="Dashboard"/>
                            <div className="dashboard__left">
                                <div className="dashboard__analytics">
                                    <div className="dashboard__analytics-blocks">
                                        <AnalyticsMiniBlock title={myProduct.length} subtitle="Products" line={Line1}/>
                                        <AnalyticsMiniBlock title={shopOrder?.length} subtitle="Orders" line={Line2}/>
                                        <AnalyticsMiniBlock title="350" subtitle="New visitors" line={Line3}/>
                                        <AnalyticsMiniBlock title="350" subtitle="New visitors" line={Line4}/>
                                    </div>
                                    <div className="dasboard__big-blocks">
                                        <AnalyticsBigBlock/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default ShopDashboard;