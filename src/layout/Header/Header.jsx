import React from 'react';
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import HeaderMain from "../../components/HeaderMain/HeaderMain";
import "./header.scss";

const Header = () => {

    return (
        <header className="header">
            <HeaderTop />
            <HeaderNav />
            <HeaderMain />
        </header>
    );
};

export default Header;