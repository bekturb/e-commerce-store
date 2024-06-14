import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
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
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useDispatch, useSelector} from "react-redux";
import {fetchStripeApi} from "../features/stripeApiSlice";
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
import ShopOrders from '../pages/Shop/ShopOrders/ShopOrders';
import WithdrawMoney from '../pages/Shop/WithdrawMoney/WithdrawMoney';
import CouponCodes from '../pages/Shop/CouponCodes/CouponCodes';
import AddSellerCoupon from '../pages/Shop/AddSellerCoupon/AddSellerCoupon';

const Routers = () => {
    const dispatch = useDispatch();
    const {data: stripeData} = useSelector(state => state.stripe);

    useEffect(() => {
        dispatch(fetchStripeApi());
    }, [dispatch])

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart-page" element={<Cart/>}/>
                <Route path="/:id/otp" element={<Otp/>}/>
                <Route path="/:id/shop-otp" element={<ShopOtp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/shop/register" element={<ShopRegister/>}/>
                <Route path="/shop/login" element={<ShopLogin/>}/>
                <Route path="/category/:slug" element={<CategoryPage/>}/>
                <Route path="/category/:mainCategorySlug/:slug" element={<CategoryPage/>}/>
                <Route path="/category/:mainCategorySlug/:subCategorySlug/:slug" element={<CategoryPage/>}/>
                <Route path="/bannerClicked" element={<BannerProducts/>}/>
                <Route path="/catalog/:productId" element={<SinglePage/>}/>
                <Route path="/brand/:brandName" element={<SingleBrand/>}/>
                <Route path="/catalog/featured-products" element={<FeaturedProducts/>}/>
                <Route path="/catalog/search/:searchProduct" element={<SearchResult/>}/>
                <Route path="/catalog/search-by-image/:image" element={<SearchByImageResult/>}/>
                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <Checkout/>
                    </ProtectedRoute>
                }/>
                <Route path="/order/success" element={
                    <ProtectedRoute>
                        <Success/>
                    </ProtectedRoute>
                }/>
                <Route path="/catalog/Wishlist" element={
                    <ProtectedRoute>
                        <Wishlist/>
                    </ProtectedRoute>
                }/>
                <Route path="/shop/dashboard" element={
                    <ProtectedSellerRoute>
                        <ShopDashboard/>
                    </ProtectedSellerRoute>
                }/>
                <Route path="/shop/all-products" element={
                    <ProtectedSellerRoute>
                        <ShopAllProducts/>
                    </ProtectedSellerRoute>
                }/>
                <Route path="/shop/add-product" element={
                    <ProtectedSellerRoute>
                        <AddSellerProducts/>
                    </ProtectedSellerRoute>
                }/>
                <Route path="/shop/upload-product/:productId" element={
                    <ProtectedSellerRoute>
                        <UpdateSellerProduct/>
                    </ProtectedSellerRoute>
                }/>
                <Route path="/shop/all-orders" element={
                    <ProtectedSellerRoute>
                        <ShopOrders/>
                    </ProtectedSellerRoute>
                }/>
                <Route path="/shop/withdraw-money" element={
                    <ProtectedSellerRoute>
                        <WithdrawMoney/>
                    </ProtectedSellerRoute>
                }/>
                <Route path="/shop/discount-codes" element={
                    <ProtectedSellerRoute>
                        <CouponCodes/>
                    </ProtectedSellerRoute>
                }/>
                <Route path="/shop/add-coupon" element={
                    <ProtectedSellerRoute>
                        <AddSellerCoupon/>
                    </ProtectedSellerRoute>
                }/>
                <Route path="/shop/upload-coupon/:productId" element={
                    <ProtectedSellerRoute>
                        <UpdateSellerProduct/>
                    </ProtectedSellerRoute>
                }/>
            </Routes>
            {
                stripeData?.stripeApiKey && (
                    <Elements stripe={loadStripe(stripeData?.stripeApiKey)}>
                        <Routes>
                            <Route path="/payment" element={
                                <ProtectedRoute>
                                    <Payment/>
                                </ProtectedRoute>
                            }/>
                        </Routes>
                    </Elements>
                )
            }
        </>
    )
};

export default Routers;