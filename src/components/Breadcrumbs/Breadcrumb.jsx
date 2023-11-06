import React from 'react';
import "./bread-crumb.scss"
import {Link} from "react-router-dom";

const Breadcrumb = ({location}) => {
    const segments = location.pathname.split('/').filter(segment => segment !== '');

    const breadcrumbs = segments.map((segment, index) => {
        if (index === 0) {
            return null;
        }
        const path = '/' + segments.slice(0, index + 1).join('/');

        return (
            <li key={segment} className="breadcrumb__item">
                <Link to={path} className="breadcrumb__link">{segment}</Link>
            </li>
        );
    })
    return <div className="breadcrumb">
        <ul className="breadcrumb__list flexitem">
            <li className="breadcrumb__item">
                <Link to="/" className="breadcrumb__link">Home</Link>
            </li>
            {breadcrumbs}
        </ul>
    </div>
};

export default Breadcrumb;