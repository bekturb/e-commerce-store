import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./nav-skeleton.scss"

const HeaderNavSkeleton = () => {
    return (
        <div className="container">
            <div className="nav__inner">
                <div className="nav__left">
                    <div className="logo">
                        <Skeleton circle width={30} height={30}/>
                        <Skeleton width={100} height={15} style={{margin: "0 20px"}}/>
                    </div>
                    <nav className="navigations">
                        <ul className="navigations__links">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <li key={index} className="navigations__item" style={{marginTop: "30px"}}>
                                    <Skeleton width={50} height={15} style={{ margin: "10px"}}/>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="right nav__right">
                    <ul className="package">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <li key={index} className="package__item mobile-hide">
                                <Skeleton circle width={30} height={30} style={{ margin: "10px"}}/>
                            </li>
                        ))}
                        <span className="package__text">
                            <Skeleton width={60}/>
                            <Skeleton width={60}/>
                        </span>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HeaderNavSkeleton;