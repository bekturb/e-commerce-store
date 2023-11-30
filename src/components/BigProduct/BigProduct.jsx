import React, {useEffect, useState} from 'react';
import Ratings from "../Ratings/Ratings";
import StockBar from "../StockBar";
import {useDispatch, useSelector} from "react-redux";
import {addToWishList} from "../../features/wishList";
import toast from "react-hot-toast";
import {compareProductsActions} from "../../features/compareProducts";

const BigProduct = ({bigItem}) => {
    const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const {data: wishListData, loading: wishListLoading} = useSelector(state => state.wishlist);
    const {data: compareProducts} = useSelector(state => state.compareProducts);

    const calculateTimeRemaining = (startDate, endDate) => {
        const currentTime = new Date();
        const endTime = new Date(endDate);
        const timeRemaining = endTime - currentTime;
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
    };

    const [isClicked, setIsClicked] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const dispatch = useDispatch();

    const handleAddToWishlist = (productId) => {
        setIsClicked(true);
        dispatch(addToWishList({productId}))
            .then(() => {
                toast.success("Product added to cart!")
            })
    };

    const handleDeleteToWishlist = (productId) => {
        setIsClicked(false);
        dispatch(addToWishList({productId}))
            .then(() => {
                toast.success("Product deleted from cart!")
            });
    };

    const toggleCompareProduct = (product) => {
        dispatch(compareProductsActions.setCompareProducts(product))
    };

    useEffect(() => {
        const updateRemainingTime = () => {
            if (bigItem) {
                const timeRemaining = calculateTimeRemaining(bigItem.startDate, bigItem.endDate);
                setRemainingTime(timeRemaining);
            }
        };
        updateRemainingTime();

        const intervalId = setInterval(updateRemainingTime, 1000);

        return () => clearInterval(intervalId);
    }, [bigItem]);

    useEffect(() => {
        const productId = bigItem._id
        const isProductInWishlist = wishListData.findIndex(data => data._id === productId);
        if (isProductInWishlist === -1){
            setIsClicked(false)
        }else {
            setIsClicked(true)
        }
    }, [wishListData]);

    useEffect(() => {
        const productId = bigItem._id
        const isProductCompared = compareProducts.findIndex(data => data._id === productId);
        if (isProductCompared === -1){
            setIsCompared(false)
        }else {
            setIsCompared(true)
        }
    }, [compareProducts]);

    return (
        <div className="products big" key={bigItem._id}>
            <div className="products__item big__item" key={bigItem._id}>
                <div className="products__offer">
                    <p className="products__end">Offer ends at</p>
                    <ul className="products__timeList">
                        {
                            <li className="products__time">{remainingTime.days}</li>
                        }
                        {
                            <li className="products__time">{remainingTime.hours}</li>
                        }
                        {
                            <li className="products__time">{remainingTime.minutes}</li>
                        }
                        {
                            <li className="products__time">{remainingTime.seconds}</li>
                        }
                    </ul>
                </div>
                <div className=" products__media big__media">
                    <div className="media__image image">
                        <a className="products__link" href="">
                            <img className="products__image"
                                 src={bigItem.variants[0].images[0].url} alt=""/>
                        </a>
                    </div>
                    <div className="products__hover-able">
                        <ul className="products__hover-list">
                            <li className="products__hover-item active">
                               <button
                                onClick={isClicked ? () => handleDeleteToWishlist(bigItem._id) : () => handleAddToWishlist(bigItem._id)}
                                className="products__hover-link"
                                disabled={wishListLoading}
                            >
                                <span className={isClicked ? "products__icons color" : "products__icons"}>
                                   <i className={isClicked ? "ri-heart-fill" : "ri-heart-line"}></i>
                                </span>
                            </button>
                            </li>
                            <li className="products__hover-item">
                                <button onClick={() => toggleCompareProduct(bigItem)} className="products__hover-link">
                               <span className="products__icons" aria-disabled={wishListLoading}>
                                           { isCompared ?
                                               <i className="ri-eye-fill"></i>
                                               :
                                               <i className="ri-eye-line"></i>
                                           }
                               </span>
                            </button>
                            </li>
                            <li className="products__hover-item">
                                <a className="products__hover-link" href=""><i
                                    className="ri-shuffle-line"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="products__discount circle">
                                            <span className="products__percentage">
                                                {bigItem.salePercentage}%
                                            </span>
                    </div>
                </div>
                <div className="products__content content">
                    <div className="content__rating">
                        <div className="content__stars">
                            <Ratings rating={bigItem.totalRating}/>
                        </div>
                        <span className="content__text mini-text">
                                                        ({bigItem.reviews.length})
                                            </span>
                    </div>
                    <h3 className="content__main-links">
                        <a className="content__link" href="">{bigItem.name}</a>
                    </h3>
                    <div className="content__price price">
                                            <span className="price__current">
                                                ${bigItem.variants[0].discountPrice}
                                            </span>

                        {bigItem.variants[0].discountPrice &&
                            <span className="price__old mini-text">
                                                ${bigItem.variants[0].originalPrice}
                                            </span>
                        }
                    </div>
                    <StockBar totalQuantity={bigItem.totalQuantity} totalSold={bigItem.totalSold} />
                </div>
            </div>
        </div>
    );
};

export default BigProduct;