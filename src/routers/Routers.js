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
import ShopRegister from "../pages/ShopRegister/ShopRegister";
import ShopOtp from "../pages/ShopOtp";
import ShopLogin from "../pages/ShopLogin";
import ProtectedSellerRoute from "../routes/ProtectedSellerRoute";
import ShopDashboard from "../pages/ShopDashboard";
import ShopAllProducts from "../pages/ShopAllProducts";

const Routers = () => {
    const dispatch = useDispatch();
    const {data: stripeData} = useSelector(state => state.stripe);

    useEffect(() => {
        dispatch(fetchStripeApi());
    }, [])

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
                <Route path="/brand/:brandId" element={<SingleBrand/>}/>
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