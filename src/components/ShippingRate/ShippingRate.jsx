import React from 'react';

const ShippingRate = () => {
    return (
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
    );
};

export default ShippingRate;