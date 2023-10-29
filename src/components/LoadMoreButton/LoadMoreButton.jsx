import React from 'react';
import "./load-more.scss";

const LoadMoreButton = ({loadMoreProducts}) => {
    return (
        <div className="load-more flexcenter">
            <button onClick={loadMoreProducts} className="secondary-button load-more__btn">Load
                more
            </button>
        </div>
    );
};

export default LoadMoreButton;