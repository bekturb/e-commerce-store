import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchColors} from "../../../features/allColors";
import {toast} from "react-hot-toast";
import axios from "../../../utils/seller-axios-utils"
import "./add-product-variant.scss";

const AddProductVariants = ({variants, setVariants}) => {
    const [imagesLoading, setImagesLoading] = useState(false);
    const [variantIndex, setVariantIndex] = useState(0);
    const [errorVariantsNumber, setErrorVariantsNumber] = useState([]);
    const [open, setOpen] = useState("");
    const {data: colors, loading: colorsLoader, error: colorsError} = useSelector(state => state.colors);

    const dispatch = useDispatch();

    const isVariantFilled = (variant) => {
        return variant && variant.color && variant.originalPrice && variant.quantity;
    };

    const handleChange = (index, key, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][key] = value;
        setVariants(updatedVariants);
    };

    const handleAddVariant = () => {
        const incompleteVariants = variants.filter((variant) => !isVariantFilled(variant));

        if (incompleteVariants.length > 0) {
            const incompleteVariantNumbers = incompleteVariants.map((variant) => variants.indexOf(variant));
            setErrorVariantsNumber(incompleteVariantNumbers);
            toast.error('Please fill in all fields for variants');
            return;
        }

        setErrorVariantsNumber([]);
        setVariants([...variants, { color: '', originalPrice: 0, quantity: 0, images: [] }]);
        setVariantIndex(variants.length);
    };

    const handleRemoveVariant = (indexToRemove) => {
        setVariants((prevVariants) => {
            const updatedVariants = prevVariants.filter((_, index) => index !== indexToRemove);
            const newIndex = variantIndex >= indexToRemove ? Math.max(0, variantIndex - 1) : variantIndex;
            setVariantIndex(newIndex);
            return updatedVariants;
        });
    };

    const handleOpenVariant = (index) => {
        setVariantIndex(index)
    }

    const handleChangeColor = (colorId) => {
        const updatedVariants = [...variants];

        if (variantIndex >= 0 && variantIndex < updatedVariants.length) {
            updatedVariants[variantIndex].color = colorId;
            setVariants(updatedVariants);
        }

        setOpen("");
    };

    const handleChangeVariantProperty = (key, value) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex][key] = value;
        setVariants(updatedVariants);
    };

    const handleChangeImage = (event) => {
        const {files} = event.target;
        if (files.length > 0){
            setImagesLoading(true)
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                data.append("images", files[i]);
            }
            return axios({url: '/api/upload/images', method: 'POST', data: data})
                .then(response => {
                    const imageDataArray = response.data;
                    const updatedVariants = [...variants];
                    updatedVariants[variantIndex].images = [...updatedVariants[variantIndex].images, ...imageDataArray];
                    setVariants(updatedVariants);
                    setImagesLoading(false)
                });
        }
    };

    // const selectMainPhoto = (id) => {
    //     const mainImage = variants.design.find(img => img.public_id === id);
    //     const addedPhotosWithoutSelected = formData.design.filter(img => img.public_id !== id);
    //     const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         design: [...newAddedPhotos]
    //     }));
    // }

    const findColorName = (colorId) => {
        const foundColor = colors?.find((color) => color?._id === colorId);
        return foundColor ? foundColor?.name : 'Select Color';
    };

    useEffect(() => {
        dispatch(fetchColors())
    }, [dispatch])

    useEffect(() => {
        setVariantIndex(variants?.length - 1)
    }, [])

    return (
        <div className="variant">
            <div className="variant__inner">
                <div className="variant__tabs">
                    {
                        variants.map((variant, index) => (
                            <div
                                className={index === variantIndex ? "variant__tab variant__tab--active" : "variant__tab"}
                                key={index}
                            >
                                {
                                    errorVariantsNumber.includes(index) ? (
                                        <span className="variant__tab-error">
                                             <i className="ri-error-warning-fill"></i>
                                        </span>
                                    ) : null
                                }
                                <div
                                    className="variant__tab-title"
                                    onClick={() => handleOpenVariant(index)}
                                >
                                    {`Product (${index + 1})`}
                                </div>
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
                        <p className="form-item__title form-item__title--margin">Color</p>
                        <div className="unique-dropdown variant__unique-dropdown">
                            <div className="unique-dropdown__cap">
                                <button className="unique-dropdown__button" type="button"
                                        onClick={open === "color" ? () => setOpen("") : () => setOpen("color")}>
                                    {variants[variantIndex]?.color ? (
                                        <>
                                            {findColorName(variants[variantIndex]?.color)}
                                        </>
                                    ) : (
                                        'Select Color'
                                    )}
                                    {
                                        open === "color" ?
                                            <span className="unique-dropdown__icon">
                                                <i className="ri-arrow-up-s-line"></i>
                                            </span> :
                                            <span className="unique-dropdown__icon">
                                                <i className="ri-arrow-down-s-line"></i>
                                            </span>
                                    }
                                </button>
                            </div>
                            {
                                open === "color" &&
                                <div className="unique-dropdown__body">
                                    <ul className="unique-dropdown__list unique-dropdown__list--other-bg">
                                        {colorsLoader ? (
                                            <li>
                                                Loading...
                                            </li>
                                        ) : colorsError ? (
                                            <li>
                                                <div className="loader-box">
                                                    {colorsError}
                                                </div>
                                            </li>
                                        ) : (
                                            <>
                                                {colors && colors?.length > 0 ? (
                                                    colors.map((color) => (
                                                        <li
                                                            className={
                                                                color.name === findColorName(variants[variantIndex]?.color)
                                                                    ? "unique-dropdown__list-item unique-dropdown__list-item--active"
                                                                    : "unique-dropdown__list-item"
                                                            }
                                                            key={color._id}
                                                            onClick={() => handleChangeColor(color._id)}
                                                        >
                                                            <span className="unique-color circle"
                                                                  style={{"--color": `${color.hex}`}}></span>
                                                            {color.name}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>
                                                        <div>No data</div>
                                                    </li>
                                                )}
                                            </>
                                        )}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form-item variant__form-item">
                        <p className="form-item__title form-item__title--margin">Price</p>
                        <input
                            className="input form-item__input"
                            type="text"
                            value={variants[variantIndex]?.originalPrice}
                            onChange={(e) => handleChangeVariantProperty("originalPrice", e.target.value)}
                        />
                    </div>
                    <div className="form-item variant__form-item">
                        <p className="form-item__title form-item__title--margin">Quantity</p>
                        <input
                            className="input form-item__input"
                            type="number"
                            value={variants[variantIndex]?.quantity}
                            onChange={(e) => handleChangeVariantProperty("quantity", e.target.value)}
                        />
                    </div>
                    <div className="form-item variant__form-item">
                        <p className="form-item__title form-item__title--margin">Images</p>
                        <div className="uploaded-image">
                            {
                                variants[variantIndex]?.images?.map((image) => (
                                    <div key={image.asset_id} className="uploaded-image__item">
                                        <img className="uploaded-image__item-img" src={image.url} alt=""/>
                                        <span className="uploaded-image__icon"><i className="ri-star-line"></i></span>
                                    </div>
                                ))
                            }
                            <div className="image-upload form-item__image-upload">
                                {
                                    imagesLoading ? (
                                        <div>
                                            Loading....
                                        </div>
                                    ) : <>
                                        <label htmlFor="userimage" className="image-upload__label">
                                                        <span className="image-upload__image-icon">
                                                            <i className="ri-upload-cloud-line"></i>
                                                            Upload
                                                        </span>
                                        </label>
                                        <input
                                            className="image-upload__image-input"
                                            multiple
                                            id="userimage"
                                            name="userimage"
                                            type="file"
                                            onChange={(e) => handleChangeImage(e)}
                                        />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductVariants;