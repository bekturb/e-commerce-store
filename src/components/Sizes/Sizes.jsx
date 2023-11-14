import React from 'react';
import "./sizes.scss";

const Sizes = () => {
    return (
        <div className="sizes">
            <p className="sizes__title">Size</p>
            <div className="sizes__variants">
                <form className="sizes__form" action="">
                    <p className="sizes__variant">
                        <input className="sizes__input" type="radio" name="size" id="size-41"/>
                        <label htmlFor="size-41" className="sizes__circle circle"><span className="sizes__number">41</span></label>
                    </p>
                    <p className="sizes__variant">
                        <input className="colors__input" type="radio" name="size" id="size-42"/>
                        <label htmlFor="size-42" className="sizes__circle circle"><span className="sizes__number">42</span></label>
                    </p>
                    <p className="sizes__variant">
                        <input className="colors__input" type="radio" name="size" id="size-43"/>
                        <label htmlFor="size-43" className="sizes__circle circle"><span className="sizes__number">43</span></label>
                    </p>
                    <p className="sizes__variant">
                        <input className="colors__input" type="radio" name="size" id="size-44"/>
                        <label htmlFor="size-44" className="sizes__circle circle"><span className="sizes__number">44</span></label>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Sizes;