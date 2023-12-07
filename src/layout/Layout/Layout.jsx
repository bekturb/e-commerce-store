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

    const routesWithoutHeaderFooter = ['/login', '/register', '/:id/otp'];
    const shouldRenderHeaderFooter = !routesWithoutHeaderFooter.includes(pathname);

    return (
        <>
            <Aside />
            {shouldRenderHeaderFooter && <Header />}
            <main>
                <Routers />
            </main>
            {shouldRenderHeaderFooter && <Footer />}
            <MenuBottom setShowSearchBottom={setShowSearchBottom} />
            <SearchBottom showSearchBottom={showSearchBottom} setShowSearchBottom={setShowSearchBottom} />
            <Overlay />
        </>
    );
};

export default Layout;