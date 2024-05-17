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
import { fetchShopProducts } from '../../features/getShopProductsSlice';
import "./shop-dashboard.scss";

const ShopDashboard = () => {

    const [openSidebar, setOpenSidebar] = useState(false);
    const {data: myShopData, loading: myShopLoading, error: myShopError} = useSelector(state => state.myShop);
    const {data: products, loading: productsLoading, error: productsError} = useSelector(state => state.shopProducts);
    const {data: shopOrder, loading: shopOrderLoading, error: shopOrderError} = useSelector(state => state.shopOrder);

    const dispatch = useDispatch()

    function filterProductsByLastWeek(products) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        return products.filter(product => {
            const productDate = new Date(product.createdAt);
            return product.shopId === myShopData._id && productDate >= oneWeekAgo;
        });
    }

    const filteredProducts = products && filterProductsByLastWeek([...products]);
    const totalTransaction = myShopData && myShopData.transactions.reduce((acc, rec) => acc + rec.amount, 0);

    useEffect(() => {
        dispatch(fetchShopProducts(myShopData._id))
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
                                        <AnalyticsMiniBlock title={products.length} loading={productsLoading} error={productsError} subtitle="Products" line={Line1} currency={false}/>
                                        <AnalyticsMiniBlock title={shopOrder?.length} loading={shopOrderLoading} error={shopOrderError} subtitle="Orders" line={Line2} currency={false}/>
                                        <AnalyticsMiniBlock title={totalTransaction} loading={myShopLoading} error={myShopError} subtitle="Total Transaction" line={Line3} currency={true}/>
                                        <AnalyticsMiniBlock title={myShopData?.availableBalance} loading={myShopLoading} error={myShopError} subtitle="My balance" line={Line4} currency={true}/>
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