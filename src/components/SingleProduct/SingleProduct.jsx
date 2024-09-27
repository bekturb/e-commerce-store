import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper";
import ReviewDetail from "../ReviewDetail/ReviewDetail";
import { addToWishList } from "../../features/wishList";
import { useDispatch, useSelector } from "react-redux";
import { cartProductsActions } from "../../features/cartSlice";
import RemainingSaleTime from "../RemainingSaleTime/RemainingSaleTime";
import SingleProductStockBar from "../SingleProductStockBar/SingleProductStockBar";
import CopyLinkButton from "../../utils/copyLinkButton";
import ShareByNetworks from "../ShareByNetworks/ShareByNetworks";
import shopProfile from "../../assets/shop-profile.jpg"
import toast from "react-hot-toast";
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

const SingleProduct = ({ product, productId }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [expand, setExpand] = useState("info");
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [cartProductQty, setCartProductQty] = useState(1);
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [showShare, setShowShare] = useState(false)
    const [showShopDrop, setShowShopDrop] = useState(false)

    const { data: wishListData, loading: wishListLoading } = useSelector(state => state.wishlist);
    const { data: cartProducts } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.authMe);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelectColor = (variantId) => {
        const productVariant = product?.variants?.find(various => various._id === variantId);
        setSelectedVariant(productVariant)
    }

    const handleAddToWishlist = (productId) => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            setIsClicked(true);
            dispatch(addToWishList({ productId }))
                .then(() => {
                    toast.success("Product added to wishlist!")
                })
        }
    };    

    const handleDeleteToWishlist = (productId) => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            setIsClicked(false);
            dispatch(addToWishList({ productId }))
                .then(() => {
                    toast.success("Product deleted from wishlist!")
                });
        }
    };

    const addQtyOfProduct = (qty) => {
        if (selectedVariant?.quantity > cartProductQty) {
            setCartProductQty(cartProductQty + qty)
        }
    }

    const minusQtyOfProduct = (qty) => {
        if (cartProductQty > 1) {
            setCartProductQty(cartProductQty - qty)
        }
    }

    const addProductToCart = (pro, variant, qty) => {
        const cartItem = {
            productId: pro._id,
            name: pro.name,
            shopId: pro.shopId,
            variantId: variant._id,
            color: variant.color.name,
            size: variant.size || null,
            price: variant.discountPrice || variant.originalPrice,
            images: variant.images,
            proQty: variant.quantity,
            sold: variant.sold || 0,
            quantity: qty || 1,
        };
        dispatch(cartProductsActions.setCartProducts(cartItem));
    };

    useEffect(() => {
        const isProductInWishlist = wishListData.some(data => data._id === productId);
        setIsClicked(isProductInWishlist);
    }, [productId, wishListData.length]);

    useEffect(() => {
        const proId = selectedVariant?._id
        const productExists = cartProducts.some(product => product.variantId === proId);
        setIsProductInCart(productExists);
    }, [selectedVariant, cartProducts.length]);

    useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            setSelectedVariant(product.variants[0]);
        }
    }, [product]);

    return (
        <>
            <div className={showShare ? "overlay show" : "overlay"}></div>
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
                                            {
                                                product?.salePercentage && product?.salePercentage > 0 && (
                                                    <div className="one__price">
                                                        <span className="one__discount">
                                                            {product?.salePercentage}%
                                                            <br />
                                                            OFF
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            {
                                                selectedVariant && (
                                                    <div className="one__big-image big-image">
                                                        <Swiper
                                                            loop={true}
                                                            autoHeight={true}
                                                            spaceBetween={10}
                                                            navigation={true}
                                                            thumbs={{ swiper: thumbsSwiper }}
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
                                                                                        alt="" />
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </SwiperSlide>
                                                                ))
                                                            }
                                                        </Swiper>
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
                                                                            alt="" />
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
                                                    <Link
                                                        to="reviews-form"
                                                        className="one__num-review mini-text"
                                                    >
                                                        {product?.numOfReviews}
                                                    </Link>
                                                    <Link
                                                        to="reviews-form"
                                                        className="one__add-review mini-text"
                                                    >
                                                        Add Your Review
                                                    </Link>
                                                </div>
                                                {
                                                    product?.stock && (
                                                        <div className="one__stock-squ stock-squ">
                                                            <span className="stock-squ__available">In Stock </span>
                                                            <span className="stock-squ__squ mini-text">
                                                                {product?.stock}
                                                            </span>
                                                        </div>
                                                    )
                                                }
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
                                                {
                                                    product?.salePercentage && product?.salePercentage > 0 && (
                                                        <SingleProductStockBar totalQuantity={selectedVariant?.quantity} totalSold={selectedVariant?.sold} />
                                                    )
                                                }
                                                <RemainingSaleTime product={product} />
                                                <div className="colors">
                                                    <p className="colors__title">Color</p>
                                                    <div className="colors__variants">
                                                        <form className="colors__form" action="">
                                                            {
                                                                product?.variants?.map(variant => (
                                                                    <p key={variant?._id} className="colors__variant">
                                                                        <input
                                                                            onChange={() => handleSelectColor(variant?._id)}
                                                                            className="colors__input"
                                                                            checked={variant?.color?._id === selectedVariant?.color?._id}
                                                                            type="radio"
                                                                            name="color"
                                                                            id={variant?._id}
                                                                        />
                                                                        <label
                                                                            htmlFor={variant?._id}
                                                                            className="colors__circle circle"
                                                                            style={{ '--color': `${variant?.color?.hex}` }}
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
                                                        <input className="actions__input" type="text" value={cartProductQty} />
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
                                                                <button
                                                                    onClick={() => addProductToCart(product, selectedVariant, cartProductQty)}
                                                                    className="actions__btn primary-button"
                                                                >
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
                                                                    className="wish-share__link"
                                                                    disabled={wishListLoading}
                                                                >
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
                                                                <button onClick={() => setShowShare(true)} className="wish-share__link">
                                                                    <span className="icon-lg">
                                                                        <i className="ri-share-line"></i>
                                                                    </span>
                                                                    <span>Share</span>
                                                                </button>
                                                                {
                                                                    showShare && <ShareByNetworks setShowShare={setShowShare} />
                                                                }
                                                            </li>
                                                            <li className="wish-share__link-list">
                                                                <button onClick={() => setShowShopDrop(!showShopDrop)} className="wish-share__link">
                                                                    <div className='wish-share__image'>
                                                                        <img className='wish-share__img' src={product?.shop?.avatar ? product?.shop?.avatar : shopProfile} alt="ProdilePicture" />
                                                                    </div>
                                                                    <p>{product?.shop?.name}</p>
                                                                </button>
                                                                {
                                                                 showShopDrop && (
                                                                    <div className='common-dropdown'>
                                                                        <div className='common-dropdown__wrapper'>
                                                                            <ul className='common-dropdown__list'>
                                                                                <li className='common-dropdown__item'>
                                                                                    <Link to={`/shop-products/${product?.shop?.name}/${product?.shopId}`} className='common-dropdown__link'>
                                                                                        <p>Other Products</p>
                                                                                        <span><i className="ri-arrow-right-s-line"></i></span>
                                                                                    </Link>
                                                                                    </li> 
                                                                                <li className='common-dropdown__item'>
                                                                                    <Link to={`/user/inbox?userId=${product?.shopId}`} className='common-dropdown__link'>
                                                                                        <p>Go chat</p>
                                                                                        <span><i className="ri-arrow-right-s-line"></i></span>
                                                                                    </Link>
                                                                                    </li> 
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                 )
                                                                }
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
                                                                        className="description__brand-title">Brand</span>
                                                                    <span
                                                                        className="description__brand-name">{product?.brand}
                                                                    </span>
                                                                </li>
                                                                <li className="description__brand">
                                                                    <span className="description__brand-title">
                                                                        Vendor code
                                                                    </span>
                                                                    <span className="description__brand-name">
                                                                        {product?.vendorCode}
                                                                        <CopyLinkButton linkToCopy={product?.vendorCode} />
                                                                    </span>
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
                                                                productId={productId}
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
