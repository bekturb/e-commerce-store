import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register";
import Otp from "../pages/Otp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SinglePage from "../pages/SinglePage";
import CategoryPage from "../pages/CategoryPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import SingleBrand from "../pages/SingleBrand/SingleBrand";
import Payment from "../pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { fetchStripeApi } from "../features/stripeApiSlice";
import Layout from "../layout/Layout/Layout";
import ProtectedRoute from "../routes/ProtectedRoute";
import Success from "../pages/Success/Success";
import Wishlist from "../pages/Wishlist/Wishlist";
import FeaturedProducts from "../pages/FeaturedProducts/FeaturedProducts";
import SearchResult from "../pages/SearchResult/SearchResult";
import SearchByImageResult from "../pages/SearchByImageResult/SearchByImageResult";
import BannerProducts from "../pages/BannerProducts/BannerProducts";
import ShopRegister from "../pages/Shop/ShopRegister/ShopRegister";
import ShopOtp from "../pages/Shop/ShopOtp";
import ShopLogin from "../pages/Shop/ShopLogin";
import ProtectedSellerRoute from "../routes/ProtectedSellerRoute";
import ShopDashboard from "../pages/Shop/ShopDashboard";
import ShopAllProducts from "../pages/Shop/ShopAllProducts";
import AddSellerProducts from "../pages/Shop/AddSellerProducts";
import UpdateSellerProduct from "../pages/Shop/UpdateSellerProduct";
import ShopOrders from "../pages/Shop/ShopOrders/ShopOrders";
import WithdrawMoney from "../pages/Shop/WithdrawMoney/WithdrawMoney";
import CouponCodes from "../pages/Shop/CouponCodes/CouponCodes";
import AddSellerCoupon from "../pages/Shop/AddSellerCoupon/AddSellerCoupon";
import UpdateSellerCoupon from "../components/Seller/UpdateSellerCoupon/UpdateSellerCoupon";
import ShopSettings from "../pages/Shop/ShopSettings/ShopSettings";
import ForgetPasswordConfirm from "../pages/ForgetPasswordConfirm";
import ResetPasswordOtp from "../pages/ResetPasswordOtp/ResetPasswordOtp";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ProtectedUserRoute from "../routes/ProtectedUserRoute";
import ClientDashboard from "../pages/ClientDashboard/ClientDashboard";
import UpdateSellerProfile from "../pages/Shop/UpdateSellerProfile/UpdateSellerProfile";
import UpdateUserProfile from "../pages/UpdateUserProfile/UpdateUserProfile";
import UserInbox from "../pages/UserInbox/UserInbox";
import ShopInbox from "../pages/Shop/ShopInbox/ShopInbox";
import ShopProducts from "../pages/ShopProducts/ShopProducts";
import PagesNotFound from "../components/PagesNotFound/PagesNotFound";

const Routers = () => {
  const dispatch = useDispatch();
  const { data: stripeData } = useSelector((state) => state.stripe);

  useEffect(() => {
    dispatch(fetchStripeApi());
  }, [dispatch]);

  const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <PagesNotFound/>,
        children: [
            {
                index: true,
                element: <Home />
              },
              {
                path: '/cart-page',
                element: <Cart />
              },
              {
                path: '/:id/otp',
                element: <Otp />
              },
              {
                path: '/:id/shop-otp',
                element: <ShopOtp />
              },
              {
                path: '/:id/reset-password/confirmation-otp/:userPosition',
                element: <ResetPasswordOtp />
              },
              {
                path: '/reset-password/with-email/:email/:userPosition',
                element: <ResetPassword />
              },
              {
                path: '/login',
                element: <Login />
              },
              {
                path: '/register',
                element: <Register />
              },
              {
                path: '/shop/register',
                element: <ShopRegister />
              },
              {
                path: '/shop/login',
                element: <ShopLogin />
              },
              {
                path: '/category/:slug',
                element: <CategoryPage />
              },
              {
                path: '/category/:mainCategorySlug/:slug',
                element: <CategoryPage />
              },
              {
                path: '/category/:mainCategorySlug/:subCategorySlug/:slug',
                element: <CategoryPage />
              },
              {
                path: '/bannerClicked',
                element: <BannerProducts />
              },
              {
                path: '/catalog/:productId',
                element: <SinglePage />
              },
              {
                path: '/brand/:brandName',
                element: <SingleBrand />
              },
              {
                path: '/shop-products/:shopName/:shopId',
                element: <ShopProducts />
              },
              {
                path: '/catalog/featured-products',
                element: <FeaturedProducts />
              },
              {
                path: '/catalog/search/:searchProduct',
                element: <SearchResult />
              },
              {
                path: '/catalog/search-by-image/:image',
                element: <SearchByImageResult />
              },
              {
                path: '/forget-password/confirmation/:userPosition',
                element: <ForgetPasswordConfirm />
              },
              {
                path: '/checkout',
                element: (
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                )
              },
              {
                path: '/order/success',
                element: (
                  <ProtectedRoute>
                    <Success />
                  </ProtectedRoute>
                )
              },
              {
                path: '/catalog/Wishlist',
                element: (
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                )
              },
              {
                path: '/user/dashboard',
                element: (
                  <ProtectedUserRoute>
                    <ClientDashboard />
                  </ProtectedUserRoute>
                )
              },
              {
                path: '/update/user/:userId',
                element: (
                  <ProtectedUserRoute>
                    <UpdateUserProfile />
                  </ProtectedUserRoute>
                )
              },
              {
                path: '/user/inbox',
                element: (
                  <ProtectedUserRoute>
                    <UserInbox />
                  </ProtectedUserRoute>
                )
              },
              {
                path: '/shop/dashboard',
                element: (
                  <ProtectedSellerRoute>
                    <ShopDashboard />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/all-products',
                element: (
                  <ProtectedSellerRoute>
                    <ShopAllProducts />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/add-product',
                element: (
                  <ProtectedSellerRoute>
                    <AddSellerProducts />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/update-product/:productId',
                element: (
                  <ProtectedSellerRoute>
                    <UpdateSellerProduct />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/all-orders',
                element: (
                  <ProtectedSellerRoute>
                    <ShopOrders />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/withdraw-money',
                element: (
                  <ProtectedSellerRoute>
                    <WithdrawMoney />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/discount-codes',
                element: (
                  <ProtectedSellerRoute>
                    <CouponCodes />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/add-coupon',
                element: (
                  <ProtectedSellerRoute>
                    <AddSellerCoupon />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/update-coupon/:couponId',
                element: (
                  <ProtectedSellerRoute>
                    <UpdateSellerCoupon />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/settings',
                element: (
                  <ProtectedSellerRoute>
                    <ShopSettings />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/update/Seller/:userId',
                element: (
                  <ProtectedSellerRoute>
                    <UpdateSellerProfile />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/shop/inbox',
                element: (
                  <ProtectedSellerRoute>
                    <ShopInbox />
                  </ProtectedSellerRoute>
                )
              },
              {
                path: '/payment',
                element: (
                    stripeData?.stripeApiKey ? (
                    <Elements stripe={loadStripe( stripeData?.stripeApiKey)}>
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    </Elements>
                  ) : null
                )
              }
        ]
    }
]);

  return (
    <RouterProvider router={routes}/>
  );
};

export default Routers;