import React from 'react';

const Checkbox = ({brand}) => {
    return (
        <div className="checkbox-with-text">
            <input
                name={brand.name}
                // checked={productBrand[brand.id]}
                className="filter__input"
                type="checkbox"
                value={brand.id}
                id={brand.id}
            />
            <label htmlFor={brand.id} className="checkbox-with-text__label">
                <span className="checkbox-with-text__decor"></span>
                <span className="checkbox-with-text__text">
                    <span className="checkbox-with-text__circle circle"></span>
                    {brand.name}
                    <span className="checkbox-with-text__count">1200</span>
                </span>
            </label>
        </div>
    );
};

export default Checkbox;