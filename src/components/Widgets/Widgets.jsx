import React from 'react';
import "./widgets.scss"

const Widgets = () => {
    return (
        <div className="widgets">
            <div className="container">
                <div className="widgets__wrapper">
                    <div className="flexwrap">
                        <div className="row widgets__row">
                            <div className="widgets__item mini-links">
                                <h4 className="widgets__title">Help & Contact</h4>
                                <ul className="widgets__list flexcol">
                                    <li className="widgets__item"><a className="widgets__link" href="">Your Account</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Your Orders</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Shipping Rates</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Returns</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Assistant</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Help</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Contact us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row widgets__row">
                            <div className="widgets__item mini-links">
                                <h4 className="widgets__title">Product Categories</h4>
                                <ul className="widgets__list flexcol">
                                    <li className="widgets__item"><a className="widgets__link" href="">Beauty</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Electronic</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Women's Fashion</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Men's Fashion</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Girl's Fashion</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Boy's Fashion</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Health & Kitchen</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Pet Supplies</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Sports</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row widgets__row">
                            <div className="widgets__item mini-links">
                                <h4 className="widgets__title">Payment Info</h4>
                                <ul className="widgets__list flexcol">
                                    <li className="widgets__item"><a className="widgets__link" href="">Business Card</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Shop With Points</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Reload Your Balance</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Paypal</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row widgets__row">
                            <div className="widgets__item mini-links">
                                <h4 className="widgets__title">About Us</h4>
                                <ul className="widgets__list flexcol">
                                    <li className="widgets__item"><a className="widgets__link" href="">Company Info</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">News</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Investors</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Careers</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Policies</a></li>
                                    <li className="widgets__item"><a className="widgets__link" href="">Customer reviews</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widgets;