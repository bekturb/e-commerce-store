import React from 'react';
import "./sectop.scss"

const SecTop = ({title}) => {
    return (
        <div className="secTop">
            <h2 className="secTop__inner">
                <span className="secTop__circle circle"></span>
                <span className="secTop__title">{title}</span>
            </h2>
        </div>
    );
};

export default SecTop;