import React from 'react';
import {Link} from "react-router-dom";

const SearchProducts = ({i}) => {
    return (
        <li className="panel__product-list">
            <Link to={`/catalog/${i._id}`} className="panel__product">
                <img className="panel__img" src={i.variants[0]?.images[0]?.url} alt=""/>
                <p className="panel__title">{i.name}</p>
            </Link>
        </li>
    );
};

export default SearchProducts;