import React, {useEffect, useState} from 'react';
import Routers from "../../routers/Routers";
import {useLocation} from "react-router-dom";
import Header from "../Header";
import Aside from "../../pages/Aside";
import Footer from "../Footer";
import MenuBottom from "../../components/MenuBottom/MenuBottom";
import SearchBottom from "../../components/SearchBottom/SearchBottom";
import Overlay from "../../components/Overlay/Overlay";

const Layout = () => {
    const [showSearchBottom, setShowSearchBottom] = useState(false);
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const routesWithoutHeaderFooter = [
        '/login',
        '/register',
        '/:id/otp',
        '/shop/register',
        '/shop/login',
        '/:id/shop-otp',
        '/shop/dashboard',
        '/shop/all-products',
        "/shop/all-orders",
        "/shop/add-product",
        "/shop/upload-product",
        "/shop/add-coupon",
        "/shop/upload-coupon",
        "/shop/withdraw-money",
        "/shop/discount-codes",
    ];

    const shouldRenderHeaderFooter = !routesWithoutHeaderFooter.some((route) =>
        pathname.includes(route)
    );

    return (
        <>
            <Aside />
            {shouldRenderHeaderFooter && <Header />}
            <main>
                <Routers />
            </main>
            {shouldRenderHeaderFooter && <Footer />}
            {shouldRenderHeaderFooter && <SearchBottom showSearchBottom={showSearchBottom} setShowSearchBottom={setShowSearchBottom} />}
            {shouldRenderHeaderFooter && <MenuBottom setShowSearchBottom={setShowSearchBottom} />}
            <Overlay />
        </>
    );
};

export default Layout;