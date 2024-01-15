import React from 'react';
import "./add-product.scss"

const AddProduct = () => {

    return (
        <div className="add-product">
            <div className="add-product__inner">
                <h1 className="add-product__main-title">Feature</h1>
                <form className="form add-product__form" action="">
                    <div className="add-product__form-item">
                        <p className="add-product__title">Name</p>
                        <input
                            className="input add-product__input"
                            type="text"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;