import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./list-title.scss"

const ListTitleSkeleton = () => {
    return (
        <>
            <Skeleton width={50} height={15} style={{ margin: "10px"}}/>
        </>
    );
};

export default ListTitleSkeleton;