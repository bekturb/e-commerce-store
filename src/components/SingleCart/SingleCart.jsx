import React from 'react';
import product1 from "../../assets/products/home1.jpg";
import "./single-cart.scss"

const SingleCart = () => {
    return (
        <div className="single-cart">
            <div className="container">
                <div className="single-cart__wrapper">
                    <div className="breadcrumb">
                        <ul className="breadcrumb__list flexitem">
                            <li className="breadcrumb__item">
                                <a className="breadcrumb__link" href="#">Home</a>
                            </li>
                            <li className="breadcrumb__item">
                                <a className="breadcrumb__link" href="#">Cart</a>
                            </li>
                        </ul>
                    </div>
                    <div className="single-cart__page">
                        <h1 className="single-cart__title">Shopping Cart</h1>
                    </div>
                    <div className="products one cart">
                        <div className="flexwrap">
                            <form className="cart__form" action="">
                                <div className="products__item">
                                    <table className="cart__table">
                                        <thead className="cart__thead">
                                            <tr>
                                                <th className="cart__list-item">Item</th>
                                                <th className="cart__list-item">Price</th>
                                                <th className="cart__list-item">Qty</th>
                                                <th className="cart__list-item">Subtotal</th>
                                                <th className="cart__list-item"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="cart__contents">
                                                <td className="flexitem cart__content-item">
                                                    <div className="thumbnail cart__thumbnail">
                                                        <a className="products__link" href="">
                                                            <img className="products__image cart__img" src={product1} alt=""/>
                                                        </a>
                                                    </div>
                                                    <div className="content">
                                                        <strong>
                                                            <a href="" className="content__link">Dimable Celling Light Modern</a>
                                                        </strong>
                                                        <p className="content__color">Color: Gold</p>
                                                    </div>
                                                </td>
                                                <td className="cart__content-item">$279.99</td>
                                                <td className="cart__content-item">
                                                    <div className="cart__qty-control qty-control flexitem">
                                                        <button className="cart__minus">-</button>
                                                        <input className="cart__input" type="text" value="2" min="1"/>
                                                        <button className="cart__plus">+</button>
                                                    </div>
                                                </td>
                                                <td className="cart__content-item">
                                                    $559.98
                                                </td>
                                                <td className="cart__content-item"> <a href="" className="item-remove"><i className="ri-close-line"></i></a></td>
                                            </tr>
                                            <tr className="cart__contents">
                                                <td className="flexitem cart__content-item">
                                                    <div className="thumbnail cart__thumbnail">
                                                        <a className="products__link" href="">
                                                            <img className="products__image cart__img" src={product1} alt=""/>
                                                        </a>
                                                    </div>
                                                    <div className="content">
                                                        <strong>
                                                            <a href="" className="content__link">Dimable Celling Light Modern</a>
                                                        </strong>
                                                        <p className="content__color">Color: Gold</p>
                                                    </div>
                                                </td>
                                                <td className="cart__content-item">$279.99</td>
                                                <td className="cart__content-item">
                                                    <div className="cart__qty-control qty-control flexitem">
                                                        <button className="cart__minus">-</button>
                                                        <input className="cart__input" type="text" value="2" min="1"/>
                                                        <button className="cart__plus">+</button>
                                                    </div>
                                                </td>
                                                <td className="cart__content-item">
                                                    $559.98
                                                </td>
                                                <td className="cart__content-item"> <a href="" className="item-remove"><i className="ri-close-line"></i></a></td>
                                            </tr>
                                            <tr className="cart__contents">
                                                <td className="flexitem cart__content-item">
                                                    <div className="thumbnail cart__thumbnail">
                                                        <a className="products__link" href="">
                                                            <img className="products__image cart__img" src={product1} alt=""/>
                                                        </a>
                                                    </div>
                                                    <div className="content">
                                                        <strong>
                                                            <a href="" className="content__link">Dimable Celling Light Modern</a>
                                                        </strong>
                                                        <p className="content__color">Color: Gold</p>
                                                    </div>
                                                </td>
                                                <td className="cart__content-item">$279.99</td>
                                                <td className="cart__content-item">
                                                    <div className="cart__qty-control qty-control flexitem">
                                                        <button className="cart__minus">-</button>
                                                        <input className="cart__input" type="text" value="2" min="1"/>
                                                        <button className="cart__plus">+</button>
                                                    </div>
                                                </td>
                                                <td className="cart__content-item">
                                                    $559.98
                                                </td>
                                                <td className="cart__content-item"> <a href="" className="item-remove"><i className="ri-close-line"></i></a></td>
                                            </tr>
                                            <tr className="cart__contents">
                                                <td className="flexitem cart__content-item">
                                                    <div className="thumbnail cart__thumbnail">
                                                        <a className="products__link" href="">
                                                            <img className="products__image cart__img" src={product1} alt=""/>
                                                        </a>
                                                    </div>
                                                    <div className="content">
                                                        <strong>
                                                            <a href="" className="content__link">Dimable Celling Light Modern</a>
                                                        </strong>
                                                        <p className="content__color">Color: Gold</p>
                                                    </div>
                                                </td>
                                                <td className="cart__content-item">$279.99</td>
                                                <td className="cart__content-item">
                                                    <div className="cart__qty-control qty-control flexitem">
                                                        <button className="cart__minus">-</button>
                                                        <input className="cart__input" type="text" value="2" min="1"/>
                                                        <button className="cart__plus">+</button>
                                                    </div>
                                                </td>
                                                <td className="cart__content-item">
                                                    $559.98
                                                </td>
                                                <td className="cart__content-item">
                                                    <a href="" className="item-remove">
                                                        <i className="ri-close-line"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                            <div className="cart__summary summary styled">
                                <div className="summary__item">
                                    <div className="summary__coupon coupon">
                                        <input type="text" placeholder="Enter coupon" className="coupon__input"/>
                                        <button className="coupon__btn">Apply</button>
                                    </div>
                                    <div className="shipping-rate cart__shipping-rate">
                                        <div className="shipping-rate__child child">
                                            <a href="" className="icon-sm shipping-rate__link">Estimate Shipping and Tax</a>
                                            <div className="shipping-rate__content">
                                                <div className="countries">
                                                    <form action="" className="countries__form">
                                                        <label htmlFor="country" className="countries__label">
                                                            Country
                                                        </label>
                                                        <select name="country" id="country" className="countries__select">
                                                            <option className="countries__country" value=""></option>
                                                            <option className="countries__country" value="1" selected>Kyrgyzstan</option>
                                                            <option className="countries__country" value="2">Kazakhstan</option>
                                                            <option className="countries__country" value="3">Uzbekistan</option>
                                                            <option className="countries__country" value="4">Russia</option>
                                                            <option className="countries__country" value="5">Others</option>
                                                        </select>
                                                    </form>
                                                </div>
                                                <div className="states">
                                                    <form action="" className="states__form">
                                                        <label htmlFor="state" className="states__label">
                                                            State/Province
                                                        </label>
                                                        <select name="state" id="state" className="states__select">
                                                            <option className="states__country" value="">Select a region, state or province</option>
                                                            <option className="states__country" value="1" selected>Kyrgyzstan</option>
                                                            <option className="states__country" value="2">Kazakhstan</option>
                                                            <option className="states__country" value="3">Uzbekistan</option>
                                                            <option className="states__country" value="4">Russia</option>
                                                            <option className="states__country" value="5">Others</option>
                                                        </select>
                                                    </form>
                                                </div>
                                                <div className="postal-code">
                                                    <form action="" className="postal-code__form">
                                                        <label htmlFor="postal" className="postal-code__label">Zip/Postal Code</label>
                                                        <input type="number" name="postal" id="postal"/>
                                                    </form>
                                                </div>
                                                <div className="rate-options">
                                                    <form action="" className="rate-options__form">
                                                        <p className="rate-options__item">
                                                            <span className="rate-options__flat">Flat: $10.00</span>
                                                            <input className="rate-options__input" type="radio" name="rate-option" id="flat"/>
                                                            <label htmlFor="flat" className="circle rate-options__circle"></label>
                                                        </p>
                                                        <p className="rate-options__item">
                                                            <span className="rate-options__flat">Best: $0.00</span>
                                                            <input className="rate-options__input" type="radio" name="rate-option" id="best"/>
                                                            <label htmlFor="best" className="circle rate-options__circle"></label>
                                                        </p>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-total">
                                        <table className="cart-total__table">
                                            <tbody className="cart-total__tbody">
                                            <tr className="cart-total__item">
                                                <th className="cart-total__title">Subtotal</th>
                                                <td className="cart-total__subtitle">$2155.95</td>
                                            </tr>
                                            <tr className="cart-total__item">
                                                <th className="cart-total__title">Discount</th>
                                                <td className="cart-total__subtitle">$100.00</td>
                                            </tr>
                                            <tr className="cart-total__item">
                                                <th className="cart-total__title">Shipping <span className="mini-text">(Flat)</span></th>
                                                <td className="cart-total__subtitle">$10.00</td>
                                            </tr>
                                            <tr className="cart-total__item">
                                                <th className="cart-total__title">TOTAL</th>
                                                <td className="cart-total__subtitle-grand"><strong>$2065.95</strong></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <a href="/checkout" className="secondary-button cart-total__btn">Checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCart;