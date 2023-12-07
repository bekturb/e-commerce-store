import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Thumbs, FreeMode} from "swiper";
import {SRLWrapper} from "simple-react-lightbox"
import ReviewDetail from "../ReviewDetail/ReviewDetail";
import {addToWishList} from "../../features/wishList";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "./single-product.scss";

const formatNumber = (number) => {
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    }
    return number;
};

const SingleProduct = ({product, isClicked, setIsClicked}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [expand, setExpand] = useState("info");
    const [selectedVariant, setSelectedVariant] = useState({});
    const [cartProduct, setCartProduct] = useState([]);
    const [cartProductQty, setCartProductQty] = useState(1);
    const [isProductInCart, setIsProductInCart] = useState(false);

    const dispatch = useDispatch();

    const handleSelectColor = (variantId) => {
        const productVariant = product?.variants?.find(various => various._id === variantId);
        setSelectedVariant(productVariant)
    }

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

    const addQtyOfProduct = (qty) => {
        if (selectedVariant.quantity > cartProductQty) {
            setCartProductQty(cartProductQty + qty)
        }
    }

    const minusQtyOfProduct = (qty) => {
        if (cartProductQty > 1){
            setCartProductQty(cartProductQty - qty)
        }
    }

    const addProductToCart = (pro, variant, qty) => {

        const cartItem = {
            productId: pro._id,
            variantId: variant._id,
            variantColor: variant.color,
            quantity: qty || 1,
        };

            const updatedCart = [...cartProduct, cartItem];
            setCartProduct(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('cart')) || [];

        const productExists = storedProducts.some(product => product.id === product?._id);

        setIsProductInCart(productExists);
    }, [cartProduct]);

    useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            setSelectedVariant(product.variants[0]);
        }
    }, [product]);

    return (
        <>
            <div className="single-product">
                <div className="container">
                    <div className="single-product__wrapper">
                        <div className="breadcrumb">
                            <ul className="breadcrumb__list flexitem">
                                <li className="breadcrumb__item">
                                    <Link to="/" className="breadcrumb__link">Home</Link>
                                </li>
                                <li className="breadcrumb__item">
                                    <Link to={`/catalog/${product._id}`}
                                          className="breadcrumb__link">{product?.name}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="column">
                            <div className="products one">
                                <div className="flexwrap">
                                    <div className="one__row row">
                                        <div className="products__item one__item one__item-sticky">
                                            <div className="one__price">
                                        <span className="one__discount">
                                            {product?.salePercentage}%
                                            <br/>
                                            OFF
                                        </span>
                                            </div>
                                            {
                                                selectedVariant && (
                                                    <div className="one__big-image big-image">
                                                        <SRLWrapper>
                                                            <Swiper
                                                                loop={true}
                                                                autoHeight={true}
                                                                spaceBetween={10}
                                                                navigation={true}
                                                                thumbs={{swiper: thumbsSwiper}}
                                                                modules={[FreeMode, Navigation, Thumbs]}
                                                                className="mySwiper2"
                                                            >
                                                                {
                                                                    selectedVariant?.images?.map(image => (
                                                                        <SwiperSlide key={image._id}>
                                                                            <div className="big-image__wrapper">
                                                                                <div className="big-image__show">
                                                                                    <Link to={image.url}
                                                                                          className="big-image__link">
                                                                                        <img className="big-image__img img"
                                                                                             src={image.url}
                                                                                             alt=""/>
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </SwiperSlide>
                                                                    ))
                                                                }
                                                            </Swiper>
                                                        </SRLWrapper>
                                                    </div>
                                                )
                                            }
                                            <div className="one__small-image small-image">
                                                <ul className="small-image__wrapper">
                                                    <Swiper
                                                        onSwiper={setThumbsSwiper}
                                                        loop={true}
                                                        spaceBetween={10}
                                                        slidesPerView={3}
                                                        freeMode={true}
                                                        watchSlidesProgress={true}
                                                        breakpoints={{
                                                            451: {
                                                                spaceBetween: 32
                                                            }
                                                        }}
                                                        modules={[FreeMode, Navigation, Thumbs]}
                                                        className="mySwiper"
                                                    >
                                                        {
                                                            selectedVariant?.images?.map(image => (
                                                                <SwiperSlide key={image._id}>
                                                                    <li className="small-image__show">
                                                                        <img className="small-image__img img"
                                                                             src={image.url}
                                                                             alt=""/>
                                                                    </li>
                                                                </SwiperSlide>
                                                            ))
                                                        }
                                                    </Swiper>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="one__row row">
                                        <div className="one__item">
                                            <h1 className="one__name">
                                                {product?.name}
                                            </h1>
                                            <div className="one__content content">
                                                <div className="content__rating one__rating">
                                                    <div className="content__stars one__stars"></div>
                                                    <a className="one__num-review mini-text"
                                                       href="">{product?.numOfReviews}</a>
                                                    <a href="" className="one__add-review mini-text">Add Your Review</a>
                                                </div>
                                                <div className="one__stock-squ stock-squ">
                                                    <span className="stock-squ__available">In Stock </span>
                                                    <span className="stock-squ__squ mini-text">
                                                        {product?.stock}
                                                    </span>
                                                </div>
                                                <div className="price one__price">
                                                    {
                                                        selectedVariant?.discountPrice ? (
                                                            <span className="price__current one__current">
                                                                ${selectedVariant?.discountPrice}
                                                            </span>
                                                        ) : (
                                                            <span className="price__current one__current">
                                                                ${selectedVariant?.originalPrice}
                                                            </span>
                                                        )
                                                    }
                                                    {
                                                        selectedVariant?.discountPrice ? (
                                                            <span className="price__old">
                                                                ${selectedVariant?.originalPrice}
                                                            </span>
                                                        ) : null
                                                    }
                                                </div>
                                                <div className="colors">
                                                    <p className="colors__title">Color</p>
                                                    <div className="colors__variants">
                                                        <form className="colors__form" action="">
                                                            {
                                                                product?.variants?.map(variant => (
                                                                    <p key={variant._id} className="colors__variant">
                                                                        <input
                                                                            onChange={() => handleSelectColor(variant?._id)}
                                                                            className="colors__input"
                                                                            checked={variant?.color === selectedVariant?.color}
                                                                            type="radio"
                                                                            name="color"
                                                                            id={variant?._id}
                                                                        />
                                                                        <label
                                                                            htmlFor={variant?._id}
                                                                            className="colors__circle circle"
                                                                            style={{'--color': `${variant?.color}`}}
                                                                        >
                                                                        </label>
                                                                    </p>
                                                                ))
                                                            }
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="actions">
                                                    <div className="actions__qty-control flexitem">
                                                        <button onClick={() => minusQtyOfProduct(1)} className="actions__minus circle">-</button>
                                                        <input className="actions__input" type="text" value={cartProductQty}/>
                                                        <button onClick={() => addQtyOfProduct(1)} className="actions__plus circle">+</button>
                                                    </div>
                                                    <div className="actions__button-cart">
                                                        {
                                                            isProductInCart ? (
                                                                <Link to="/cart-page">
                                                                    <button className="actions__btn primary-button">
                                                                        Go to Cart
                                                                    </button>
                                                                </Link>
                                                            ) : (
                                                                <button onClick={() => addProductToCart(product, selectedVariant, cartProductQty)} className="actions__btn primary-button">
                                                                    Add to cart
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="wish-share">
                                                        <ul className="flexitem wish-share__second-links">
                                                            <li className="wish-share__link-list">
                                                                <button
                                                                    onClick={isClicked ? () => handleDeleteToWishlist(product._id) : () => handleAddToWishlist(product._id)}
                                                                    className="wish-share__link">
                                                                    {
                                                                        isClicked ? (
                                                                            <span className="icon-lg wish-share__heart-icon color">
                                                                                <i className="ri-heart-fill"></i>
                                                                            </span>
                                                                        ) : (
                                                                            <span className="icon-lg wish-share__heart-icon">
                                                                                <i className="ri-heart-line"></i>
                                                                            </span>
                                                                        )
                                                                    }
                                                                    <span>Wishlist</span>
                                                                </button>
                                                            </li>
                                                            <li className="wish-share__link-list">
                                                                <a className="wish-share__link" href="">
                                                                        <span className="icon-lg">
                                                                            <i className="ri-share-line"></i>
                                                                        </span>
                                                                    <span>Share</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="description">
                                                    <ul className="description__list">
                                                        <li className="description__item child">
                                                            <div
                                                                className={expand === "info" ? "description__link description__link-minus" : "description__link"}
                                                                onClick={expand === "info" ? () => setExpand("") : () => setExpand("info")}>Information
                                                            </div>
                                                            <ul className={expand === "info" ? "content description__content description__content-display" : "content description__content"}>
                                                                <li className="description__brand">
                                                                    <span
                                                                        className="description__brand-title">Brands</span>
                                                                    <span
                                                                        className="description__brand-name">{product?.brand?.name}</span>
                                                                </li>
                                                                {
                                                                    product?.anotherNewField ? (
                                                                        Object.keys(product?.anotherNewField).map(key => (
                                                                            <li key={key} className="description__brand">
                                                                                    <span
                                                                                        className="description__brand-title">{key}</span>
                                                                                     <span
                                                                                    className="description__brand-name">{product?.anotherNewField[key]}</span>
                                                                            </li>
                                                                        ))
                                                                    ) : null
                                                                }
                                                            </ul>
                                                        </li>
                                                        <li className="description__item child">
                                                            <div
                                                                className={expand === "detail" ? "description__link description__link-minus" : "description__link"}
                                                                onClick={expand === "detail" ? () => setExpand("") : () => setExpand("detail")}>Details
                                                            </div>
                                                            <div
                                                                className={expand === "detail" ? "content description__content description__content-display" : "content description__content"}>
                                                                <p className="description__desc">{product?.description}</p>
                                                            </div>
                                                        </li>
                                                        <li className="description__item reviews">
                                                            <div
                                                                className={expand === "review" ? "description__link description__link-minus icon-sm" : "description__link icon-sm"}
                                                                onClick={expand === "review" ? () => setExpand("") : () => setExpand("review")}>
                                                                Reviews
                                                                <span className="reviews__number mini-text">
                                                                    {
                                                                        product?.numOfReviews > 0 && formatNumber(product?.numOfReviews)
                                                                    }
                                                                </span>
                                                            </div>
                                                            <ReviewDetail
                                                                expand={expand}
                                                                product={product}
                                                            />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;