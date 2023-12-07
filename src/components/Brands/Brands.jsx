import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchBrands} from "../../features/brandSlice";
import BrandsSkeleton from "../Skeletons/BrandsSkeleton/BrandsSkeleton";
import NotFound from "../NotFound/NotFound";
import "./brands.scss";
import {Link} from "react-router-dom";

const Brands = () => {

    const [brandsToExclude] = useState(["Zara", "Samsung", "Oppo", "Assus", "Hurley", "D&G"]);

    const dispatch = useDispatch();
    const {data: brands, loading, error} = useSelector(state => state.brands);

    const filteredBrands = brands ? brands.filter(brand => brandsToExclude.includes(brand.name)) : [];

    useEffect(() => {
        dispatch(fetchBrands())
    }, [])

    return (
        <>
            <div className="brands">
                <div className="container">
                    <div className="brands__wrapper flexitem">
                        {
                            loading ? (
                                <BrandsSkeleton cards={6} />
                            ) : error ? (
                                <NotFound error={error}/>
                            ) : filteredBrands.length > 0 ? (
                                filteredBrands.map(brand => (
                                    <div key={brand._id} className="brands__item">
                                        <Link to={`/brand/${brand._id}`} className="brands__link">
                                            <img className="brands__image" src={brand.brandImage} alt=""/>
                                        </Link>
                                    </div>
                                ))
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Brands;