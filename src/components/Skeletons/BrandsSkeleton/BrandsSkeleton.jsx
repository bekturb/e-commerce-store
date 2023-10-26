import React from 'react';
import Skeleton from "react-loading-skeleton";
import "./brandsSkeleton.scss"

const BrandsSkeleton = ({cards}) => {
    return Array(cards).fill(0).map((_, index) => (
        <div className="brands__item" key={index}>
            <Skeleton width={100} height={20}/>
        </div>
    ))
};

export default BrandsSkeleton;