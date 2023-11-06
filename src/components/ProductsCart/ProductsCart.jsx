import React, {useEffect, useState} from 'react';
import Ratings from "../Ratings/Ratings";
import {useDispatch, useSelector} from "react-redux";
import {addToWishList} from "../../features/wishList";
import {fetchAuthMe} from "../../features/authMeSlice";
import toast from "react-hot-toast";

const ProductsCart = ({product}) => {
    const dispatch = useDispatch();

    const {data: userData} = useSelector(state => state.authMe);
    const {data: wishListData, loading: wishListLoading} = useSelector(state => state.wishlist);

    const [oldUserData, setOldUserData] = useState(userData);
    const [compareProducts, setCompareProducts] = useState([]);

    const isProductInWishlist = oldUserData?.wishList.includes(product._id);

    const handleAddToWishlist = (productId) => {
        dispatch(addToWishList({productId}))
    };

    const handleDeleteToWishlist = (productId) => {
        dispatch(addToWishList({productId}));
    };

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [wishListData]);


    useEffect(() => {
        if (userData) {
            setOldUserData(userData);
        }
    }, [userData]);

    useEffect(() => {
        const storedCompareProducts = localStorage.getItem('compareProducts');
        const initialCompareProducts = storedCompareProducts ? JSON.parse(storedCompareProducts) : [];
        setCompareProducts(initialCompareProducts);
    }, []);

    const toggleCompareProduct = (productId) => {
        const productIndex = compareProducts.indexOf(productId);

        if (productIndex !== -1) {
            const updatedCompareProducts = [...compareProducts];
            updatedCompareProducts.splice(productIndex, 1);
            setCompareProducts(updatedCompareProducts);
            toast("Product deleted from comparison!");
        } else {
            const updatedCompareProducts = [...compareProducts, productId];
            setCompareProducts(updatedCompareProducts);
            toast.success("Product added to comparison!");
        }
    };

    useEffect(() => {
        localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
    }, [compareProducts]);

    return (
        <div key={product._id} className="products__item item">
            <div className="products__media media">
                <div className="products__thumbnail thumbnail">
                    <a className="products__link" href="">
                        <img className="products__image"
                             src={product.variants[0].images[0].url} alt=""/>
                    </a>
                </div>
                <div className="products__hover-able">
                    <ul className="products__hover-list">
                        <li className="products__hover-item active">
                            <button
                                onClick={isProductInWishlist ? () => handleDeleteToWishlist(product._id) : () => handleAddToWishlist(product._id)}
                                className="products__hover-link"
                                disabled={wishListLoading}
                            >
                                <span className="products__icons">
                                    {
                                        isProductInWishlist ? (
                                            <i className="ri-heart-fill"></i>
                                        ) : (
                                            <i className="ri-heart-line"></i>
                                        )
                                    }
                                </span>
                            </button>
                        </li>
                        <li className="products__hover-item">
                            <button onClick={() => toggleCompareProduct(product?._id)} className="products__hover-link">
                               <span className="products__icons">
                                           {compareProducts.includes(product?._id)
                                               ? <i className="ri-eye-fill"></i>
                                               : <i className="ri-eye-line"></i>
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
            </div>
            <div className="products__content content">
                <div className="content__rating">
                    <div className="content__stars">
                        <Ratings rating={product.totalRating}/>
                    </div>
                    <span className="content__text mini-text">
                                                ({product.reviews.length})
                                            </span>
                </div>
                <h3 className="content__main-links">
                    <a className="content__link" href="">{product.name}</a>
                </h3>
                <div className="content__price price">
                    {
                        product.variants[0].discountPrice ?
                            <span className="price__current">
                                                ${product.variants[0].discountPrice}
                                            </span> : <span className="price__current">
                                                ${product.variants[0].originalPrice}
                                            </span>
                    }
                    {product.variants[0].discountPrice &&
                        <span className="price__old mini-text">
                                                ${product.variants[0].originalPrice}
                                            </span>}
                </div>
            </div>
        </div>
    );
};

export default ProductsCart;