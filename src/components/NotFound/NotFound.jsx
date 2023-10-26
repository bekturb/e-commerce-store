import React from 'react';
import "./not-found.scss";
import {Link} from "react-router-dom";

const NotFound = ({error}) => {
    return (
        <div className="not-found">
            <h1 className="not-found__title">{error?.status}</h1>
            <p className="not-found__subtitle">Oops! Something is wrong.</p>
            <Link to="/" className="not-found__button"><i className="icon-home"></i> Go back in initial page, is better.</Link>
        </div>
    );
};

export default NotFound;