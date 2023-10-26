import React, {useState} from 'react';
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

    const shouldDisplayHeaderFooter = (path) => {
        return !['/register', '/login', '/otp'].some(route => path.includes(route));
    };

    return (
        <>
            {shouldDisplayHeaderFooter(pathname) && <>
                <Aside/>
                <Header />
            </>}
            <main>
                <Routers />
            </main>
            {shouldDisplayHeaderFooter(pathname) && <Footer />}
            <MenuBottom setShowSearchBottom={setShowSearchBottom} />
            <SearchBottom showSearchBottom={showSearchBottom} setShowSearchBottom={setShowSearchBottom} />
            <Overlay />
        </>
    );
};
export default Layout;