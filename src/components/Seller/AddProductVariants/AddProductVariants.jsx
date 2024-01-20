import React from 'react';
import "./add-product-variant.scss"

const AddProductVariants = ({variants, setVariants}) => {

    const handleChange = (index, key, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][key] = value;
        setVariants(updatedVariants);
    };

    const handleAddVariant = () => {
        setVariants([...variants, {color: '', image: ''}]);
    };

    const handleRemoveVariant = (indexToRemove) => {
        setVariants((prevVariants) =>
            prevVariants.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <div className="variant">
            <div className="variant__inner">
                <div className="variant__tabs">
                    {
                        variants.map((variant, index) => (
                            <div
                                className={index === variants.length - 1 ? "variant__tab variant__tab--active" : "variant__tab"}
                                key={index}>
                                <span className="variant__tab-title">{`Product (${index + 1})`}</span>
                                {
                                    index > 0 && (
                                        <span className="variant__tab-icon" onClick={() => handleRemoveVariant(index)}>
                                        <i className="ri-close-line"></i>
                                     </span>
                                    )
                                }
                            </div>
                        ))
                    }
                    <div className="variant__tab variant__tab--active" onClick={handleAddVariant}>
                        <span className="variant__tab-title">Add Another Product</span>
                        <span className="variant__tab-icon">
                            <i className="ri-add-line"></i>
                        </span>
                    </div>
                </div>
                <div className="variant__form">
                    <div className="form-item variant__form-item">
                        <p className="form-item__title">Color</p>
                        <input
                            className="form-item__input"
                            type="text"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductVariants;