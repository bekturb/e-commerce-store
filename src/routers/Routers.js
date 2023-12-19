import React, {useEffect, useState} from 'react';
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

const Routers = () => {
    const dispatch = useDispatch();

    const {data: stripeData} = useSelector(state => state.stripe);
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        dispatch(fetchStripeApi());
    }, [])

    return (
        <>
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
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart-page" element={<Cart/>}/>
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
                <Route path="/:id/otp" element={<Otp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/category/:slug" element={<CategoryPage/>}/>
                <Route path="/category/:mainCategorySlug/:slug" element={<CategoryPage/>}/>
                <Route path="/category/:mainCategorySlug/:subCategorySlug/:slug" element={<CategoryPage/>}/>
                <Route path="/catalog/:productId" element={<SinglePage/>}/>
                <Route path="/brand/:brandId" element={<SingleBrand/>}/>
            </Routes>
        </>
    )
};

export default Routers;