import React, { useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCouponValue} from "../../features/couponSlice";
import toast from "react-hot-toast";

const CouponCart = ({cartProducts}) => {
    const [couponName, setCouponName] = useState("");
    const [discountPrice, setDiscountPrice] = useState(0);
    const [shippingInfo, setShippingInfo] = useState({name: "Standard", value: 0});


    const {data: couponCodeData, loading: couponLoad, error: couponErr} = useSelector(state => state.coupons);
    const dispatch = useDispatch();

    let subtotal = cartProducts.reduce((acc, rec) => acc + rec.price * rec.quantity, 0);

    const handleChangeCoupon = (e) => {
        e.preventDefault();
        const couponName = e.target.value;
        setCouponName(couponName)
    }

    const handleChangeShipping = (e, name) => {
        const {value} = e.target;
        setShippingInfo(() => ({
            name,
            value: parseFloat(value),
        }))
    }

    const handleGetCouponValue = async () => {
        try {
            const res = await dispatch(getCouponValue(couponName));
            const shopId = res.payload?.shopId;
            const couponValue = res.payload?.value;

            if (res.payload !== null) {
                const isCouponValid = cartProducts && cartProducts.filter((item) => item.shopId === shopId);

                if (isCouponValid.length === 0) {
                    toast.error("Coupon code is not valid for this shop!");
                    setCouponName("");
                } else {
                    const eligiblePrice = isCouponValid.reduce((acc, rec) => acc + rec.price * rec.quantity, 0);
                    const discountPrice = (eligiblePrice * couponValue) / 100;
                    setDiscountPrice(discountPrice);
                    setCouponName("");
                }
            }

            if (res.payload === null) {
                toast.error("Coupon code doesn't exist!");
                setCouponName("");
            }
        } catch (err) {
            toast.error("An error occurred while processing the coupon code. Please try again.");
        }
    };

    const discountPercentage = couponCodeData ? discountPrice : "";
    const totalPrice = couponCodeData ? (subtotal + shippingInfo.value - discountPercentage).toFixed(2) : (subtotal + shippingInfo.value).toFixed(2);

    return (
        <div className="cart__summary summary styled">
            <div className="summary__item">
                <div className="summary__coupon coupon">
                    <div>
                        <input type="text"
                               placeholder="Enter coupon"
                               className="coupon__input"
                               value={couponName}
                               onChange={handleChangeCoupon}
                        />
                        {couponErr &&
                            <span className="error">*{couponErr}</span>}
                    </div>
                    <button
                        onClick={handleGetCouponValue}
                        className="coupon__btn"
                        disabled={couponLoad}
                    >
                        Apply
                    </button>
                </div>
                <div className="shipping-rate cart__shipping-rate">
                    <div className="shipping-rate__child child">
                        <a href="" className="icon-sm shipping-rate__link">Estimate Shipping and Tax</a>
                        <div className="shipping-rate__content">
                            <div className="rate-options">
                                <form action="" className="rate-options__form">
                                    <p className="rate-options__item">
                                        <span className="rate-options__flat">Standard: $0.00</span>
                                        <input
                                            className="rate-options__input"
                                            type="radio"
                                            name="rate-option"
                                            id="standard"
                                            defaultChecked={shippingInfo.name === "Standard"}
                                            value={0}
                                            onChange={(e) => handleChangeShipping(e, "Standard")}
                                        />
                                        <label htmlFor="standard" className="circle rate-options__circle"></label>
                                    </p>
                                    <p className="rate-options__item">
                                        <span className="rate-options__flat">Express: $10.00</span>
                                        <input
                                            className="rate-options__input"
                                            type="radio"
                                            name="rate-option"
                                            id="express"
                                            defaultChecked={shippingInfo.name === "Express"}
                                            value={10}
                                            onChange={(e) => handleChangeShipping(e, "Express")}
                                        />
                                        <label htmlFor="express" className="circle rate-options__circle"></label>
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
                            <td className="cart-total__subtitle">${subtotal.toFixed(2) || 0}</td>
                        </tr>
                        <tr className="cart-total__item">
                            <th className="cart-total__title">Discount</th>
                            <td className="cart-total__subtitle">${discountPrice || 0}</td>
                        </tr>
                        <tr className="cart-total__item">
                            <th className="cart-total__title">Shipping <span className="mini-text">({shippingInfo.name})</span></th>
                            <td className="cart-total__subtitle">${shippingInfo.value}</td>
                        </tr>
                        <tr className="cart-total__item">
                            <th className="cart-total__title">TOTAL</th>
                            <td className="cart-total__subtitle-grand"><strong>${totalPrice}</strong></td>
                        </tr>
                        </tbody>
                    </table>
                    <a href="/checkout" className="secondary-button cart-total__btn">Checkout</a>
                </div>
            </div>
        </div>
    );
};

export default CouponCart;