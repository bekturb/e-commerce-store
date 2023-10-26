import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import SecTop from "../SecTop/SecTop";
import StockBar from "../StockBar";
import Ratings from "../Ratings/Ratings";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import "./trending.scss";

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}
const Trending = () => {

    const {data: products, loading: productsLoad, error:productsErr} = useSelector(state => state.products);
    const sortedOffers = products ? [...products].filter(pro => pro.salePercentage > 0).sort((a, b) => b.totalSold - a.totalSold).slice(0,9) : [];

    const [bigItem, ...miniItems] = sortedOffers;
    const miniChunks = chunkArray(miniItems, Math.ceil(miniItems.length / 2));

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

    const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

    return (
        <div className="trending">
            <div className="container">
                <div className="trending__wrapper">
                    <SecTop title="Trending Products"/>
                    <div className="trending__column">
                        {
                            productsLoad && (
                                <div className="trending__loader">
                                    <Loader />
                                </div>
                            )
                        }
                        {
                            productsErr && (
                                <div className="trending__loader">
                                    <NotFound error={productsErr} />
                                </div>
                            )
                        }
                        <div className="trending__inner flexwrap">
                            {
                                bigItem && (
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
                                                            <a className="products__hover-link" href=""><i
                                                                className="ri-heart-line"></i>
                                                            </a>
                                                        </li>
                                                        <li className="products__hover-item">
                                                            <a className="products__hover-link" href=""><i
                                                                className="ri-eye-line"></i>
                                                            </a>
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
                                                {bigItem.reviews.length}
                                            </span>
                                                </div>
                                                <h3 className="content__main-links">
                                                    <a className="content__link" href="">{bigItem.name}</a>
                                                </h3>
                                                <div className="content__price price">
                                            <span className="price__current">
                                                ${bigItem.variants[0].originalPrice}
                                            </span>

                                                    {bigItem.variants[0].discountPrice &&
                                                        <span className="price__old mini-text">
                                                ${bigItem.variants[0].discountPrice}
                                            </span>
                                                    }
                                                </div>
                                                <StockBar totalQuantity={bigItem.totalQuantity} totalSold={bigItem.totalSold} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                miniChunks?.map((miniChunk, chunkIndex) => (
                                    <div className="products mini" key={chunkIndex}>
                                        {
                                            miniChunk?.map((miniProduct, index) => (
                                                <div className="products__item products__mini-item" key={miniProduct._id}>
                                                    <div className="products__media products__media-mini">
                                                        <div className="thumbnail">
                                                            <a className="products__link" href="">
                                                                <img className="products__image"
                                                                     src={miniProduct.variants[0].images[0].url}
                                                                     alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="products__hover-able">
                                                            <ul className="products__hover-list">
                                                                <li className="products__hover-item active">
                                                                    <a className="products__hover-link" href=""><i
                                                                        className="ri-heart-line"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="products__hover-item">
                                                                    <a className="products__hover-link" href=""><i
                                                                        className="ri-eye-line"></i>
                                                                    </a>
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
                                                {miniProduct?.salePercentage}%
                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="products__content content">
                                                        <h3 className="content__main-links">
                                                            <a className="content__link" href="">{miniProduct?.name}</a>
                                                        </h3>
                                                        <div className="content__rating">
                                                            <div className="content__stars">
                                                                <Ratings rating={miniProduct.totalRating}/>
                                                            </div>
                                                            <span className="content__text mini-text">
                                                {miniProduct?.reviews.length}
                                            </span>
                                                        </div>
                                                        <div className="content__price price">
                                            <span className="price__current">
                                                ${miniProduct?.variants[0].originalPrice}
                                            </span>
                                                            <span className="price__old mini-text">
                                                ${miniProduct?.variants[0].discountPrice}
                                            </span>
                                                        </div>
                                                        <div className="content__info info mini-text">
                                                            <p className="info__sold">{miniProduct?.totalSold} sold</p>
                                                            <p className="info__shipping">Free Shipping</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;