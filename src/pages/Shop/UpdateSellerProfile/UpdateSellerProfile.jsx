import React, { useEffect } from 'react'
import UpdateCommonProfile from '../../../components/UpdateCommonProfile/UpdateCommonProfile'
import { useParams } from 'react-router-dom'
import { fetchShopProducts } from '../../../features/getShopProductsSlice';
import { getShopOrder } from '../../../features/getShopOrderSlice';
import { useDispatch, useSelector } from 'react-redux';

const UpdateSellerProfile = () => {

  const {
    data: myShopData,
    loading: myShopLoad,
    error: myShopErr,
  } = useSelector((state) => state.myShop);
  const { data: products } = useSelector((state) => state.shopProducts);
  const { data: shopOrder } = useSelector((state) => state.shopOrder);  

  const { userId } = useParams();  
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchShopProducts(userId));
      dispatch(getShopOrder(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
        <UpdateCommonProfile 
          user={myShopData}
          loading={myShopLoad}
          error={myShopErr}
          shopProduct={products}
          shopOrder={shopOrder}
         />
    </>
  )
}

export default UpdateSellerProfile