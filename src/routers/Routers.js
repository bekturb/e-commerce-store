import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "../pages/Register";
import Otp from "../pages/Otp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SinglePage from "../pages/SinglePage";
import OfferPage from "../pages/OfferPage";
import CategoryPage from "../pages/CategoryPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import SingleBrand from "../pages/SingleBrand/SingleBrand";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart-page" element={<Cart/>}/>
            <Route path="/checkout-page" element={<Checkout/>}/>
            <Route path="/:id/otp" element={<Otp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/category/:slug" element={<CategoryPage/>}/>
            <Route path="/category/:mainCategorySlug/:slug" element={<CategoryPage/>}/>
            <Route path="/category/:mainCategorySlug/:subCategorySlug/:slug" element={<CategoryPage/>}/>
            <Route path="/catalog/:productId" element={<SinglePage/>}/>
            <Route path="/brand/:brandId" element={<SingleBrand/>}/>
        </Routes>
    )
};

export default Routers;