import React from 'react';
import "./bread-crumb.scss"

const Breadcrumb = () => {
    return (
        <div className="breadcrumb">
            <ul className="breadcrumb__list flexitem">
                <li className="breadcrumb__item">
                    <a className="breadcrumb__link" href="#">Home</a>
                </li>
                <li className="breadcrumb__item">
                    <a className="breadcrumb__link" href="#">Shoes</a>
                </li>
                <li className="breadcrumb__item">
                    <a className="breadcrumb__link" href="#">Men Slip On Shoes Casual with Arch Support Insoles</a>
                </li>
            </ul>
        </div>
    );
};

export default Breadcrumb;