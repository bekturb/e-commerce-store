import React, { useEffect } from "react";
import CommonProfile from "../../../components/CommonProfile/CommonProfile";
import Helmet from "../../../layout/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopProducts } from "../../../features/getShopProductsSlice";
import { getShopOrder } from "../../../features/getShopOrderSlice";
import Loader from "../../../components/Loader/Loader";
import NotFound from "../../../components/NotFound/NotFound";

const ShopSettings = () => {

    const { data: myShopData, loading: myShopLoad, error: myShopErr } = useSelector((state) => state.myShop);
    const { data: products } = useSelector((state) => state.shopProducts);
    const { data: shopOrder } = useSelector((state) => state.shopOrder);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchShopProducts(myShopData._id));
        dispatch(getShopOrder(myShopData._id));
      }, [dispatch, myShopData]);

  return (
    <Helmet title="Shop-Settings">
        {
                myShopLoad ? (
                    <div className="loader-box">
                        <Loader />
                    </div>
                ) : myShopErr ? (
                    <div className="loader-box">
                        <NotFound error={myShopErr}/>
                    </div>
                ) : myShopData ? (
                    <CommonProfile status={"Shop"} myShopData={myShopData} products={products} shopOrder={shopOrder}/>
                ) : <div>
                    No data
                </div>
            }
    </Helmet>
  );
};

export default ShopSettings;
