import React from 'react';

const Radio = () => {
    return (
        <div className="radio-with-text">
            <input
                name="brand"
                className="radio-with-text__input"
                type="radio"
                id="Zara"
            />
            <label htmlFor="Zara" className="radio-with-text__label">
                <span className="radio-with-text__decor">

                </span>
                <span className="radio-with-text__text">
                    Nike
                    <span className="radio-with-text__count">
                        1200
                    </span>
                </span>
            </label>
        </div>
    );
};

export default Radio;