import React from 'react';
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Widgets from "../../components/Widgets/Widgets";
import FooterInfo from "../../components/FooterInfo/FooterInfo";

const Footer = () => {

    return (
        <>
            <NewsLetter />
            <Widgets />
            <FooterInfo />
        </>
    );
};

export default Footer;