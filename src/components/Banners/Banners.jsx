import React from 'react';
import Banner1 from "../../assets/banner/banner1.jpg"
import Banner2 from "../../assets/banner/banner2.jpg"
import Categories from "../Categories/Categories";
import "./banners.scss";

const Banners = () => {
    return (
        <div className="banners">
            <div className="container">
                <div className="banners__wrapper">
                    <div className="banners__column">
                        <div className="banners__banner flexwrap">
                            <div className="row banners__row">
                                <div className="banners__item">
                                    <div className="banners__image">
                                        <img className="banners__img" src={Banner1} alt=""/>
                                    </div>
                                    <div className="banners__info flexcol">
                                        <h4 className="banners__title">Brutal Sale</h4>
                                        <h3 className="banners__subtitle">
                                            <span className="banners__suggestion">
                                                Get the deal in here
                                            </span>
                                            <br/>
                                            Living Room Chair
                                        </h3>
                                        <a href="" className="primary-button banners__btn">Shop Now</a>
                                    </div>
                                    <a href="#" className="over-link"></a>
                                </div>
                            </div>
                            <div className="row banners__row">
                                <div className="banners__item banners__item-grey">
                                    <div className="banners__image">
                                        <img className="banners__img" src={Banner2} alt=""/>
                                    </div>
                                    <div className="banners__info flexcol">
                                        <h4 className="banners__title">Brutal Sale</h4>
                                        <h3 className="banners__subtitle">
                                            <span className="banners__suggestion">
                                                Discount everyday
                                            </span>
                                            <br/>
                                            Office Outfit
                                        </h3>
                                        <a href="" className="primary-button banners__btn">Shop Now</a>
                                    </div>
                                    <a href="#" className="banners__over-link"></a>
                                </div>
                            </div>
                        </div>
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banners;