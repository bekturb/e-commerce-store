import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const MegaProductCart = ({category}) => {

    const [filteredProducts, setFilteredProducts] = useState([])
    const {data: products, loading: productsLoad, error:productsErr} = useSelector(state => state.products);

    const [bigItem] = filteredProducts;

    useEffect(() => {
        if (category && products) {
            const newFilteredProducts = products.filter(product => product.tags.includes(category)).sort((a, b) => b.totalSold - a.totalSold);
            setFilteredProducts(newFilteredProducts);
        } else {
            setFilteredProducts([]);
        }
    }, [category, products]);

    return (
        bigItem ?
        <div className="products mega__products">
            <div className="products__row">
                <div className="products__media">
                    <div className="products__thumbnail">
                        <a className="products__image-cover"
                           href="">
                            <img className="products__img"
                                 src={bigItem?.variants[0].images[0].url} alt="apparel4"/>
                        </a>
                    </div>
                </div>
                <div className="products__text-content">
                    <h4 className="products__pop">Most Wanted!</h4>
                    <Link to={`/catalog/${bigItem._id}`} className="primary-button products__button">Order Now</Link>
                </div>
            </div>
        </div> : null
    );
};

export default MegaProductCart;