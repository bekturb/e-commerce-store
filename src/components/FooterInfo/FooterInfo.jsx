import React from 'react';
import "./footer-info.scss"

const FooterInfo = () => {
    return (
        <div className="footer-info">
            <div className="container">
                <div className="footer-info__wrapper">
                    <div className="footer-info__intro flexcol">
                        <div className="logo">
                            <a className="logo__link footer-info__logo-link" href="">
                                <span className="logo__circle"></span>.Store
                            </a>
                        </div>
                        <div className="footer-info__socials">
                            <ul className="flexitem">
                                <li className="footer-info__item"><a className="footer-info__link" href=""><i className="ri-twitter-line"></i></a></li>
                                <li className="footer-info__item"><a className="footer-info__link" href=""><i className="ri-facebook-line"></i></a></li>
                                <li className="footer-info__item"><a className="footer-info__link" href=""><i className="ri-instagram-line"></i></a></li>
                                <li className="footer-info__item"><a className="footer-info__link" href=""><i className="ri-linkedin-line"></i></a></li>
                                <li className="footer-info__item"><a className="footer-info__link" href=""><i className="ri-youtube-line"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <p className="mini-text footer-info__text"> Copyright 2023 © .Store All right reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default FooterInfo;