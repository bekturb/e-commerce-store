import React from 'react';
import ProCat1 from "../../assets/banner/procat1.jpg";
import ProCat2 from "../../assets/banner/procat2.jpg";
import ProCat3 from "../../assets/banner/procat3.jpg";
import "./categories.scss"

const Categories = () => {
    return (
        <div className="product-categories flexwrap">
            <div className="row product-categories__row">
                <div className="product-categories__item">
                    <div className="product-categories__image">
                        <img className="product-categories__img" src={ProCat1} alt=""/>
                    </div>
                    <div className="product-categories__categories">
                        <h4 className="product-categories__title">Beauty</h4>
                        <ul className="product-categories__list flexcol">
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Makeup</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Skin Care</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Hair Care</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Fragrance</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Foot & Hand Care</a></li>
                        </ul>
                        <div className="product-categories__second-links">
                            <a href="" className="view-all">View all <i className="ri-arrow-right-line"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row product-categories__row">
                <div className="product-categories__item">
                    <div className="product-categories__image">
                        <img className="product-categories__img" src={ProCat2} alt=""/>
                    </div>
                    <div className="product-categories__categories">
                        <h4 className="product-categories__title">Gadgets</h4>
                        <ul className="product-categories__list flexcol">
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Camera</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Cell Phones</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Computers</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">GPS & Navigation</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Headphones</a></li>
                        </ul>
                        <div className="product-categories__second-links">
                            <a href="" className="view-all">View all <i className="ri-arrow-right-line"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row product-categories__row">
                <div className="product-categories__item">
                    <div className="product-categories__image">
                        <img className="product-categories__img" src={ProCat3} alt=""/>
                    </div>
                    <div className="product-categories__categories">
                        <h4 className="product-categories__title">Home Decor</h4>
                        <ul className="product-categories__list flexcol">
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Kitchen</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Dining Room</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Pantry</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Great Room</a></li>
                            <li className="product-categories__category"><a className="product-categories__link" href="#">Breakfast Nook</a></li>
                        </ul>
                        <div className="product-categories__second-links">
                            <a href="" className="view-all">View all <i className="ri-arrow-right-line"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;