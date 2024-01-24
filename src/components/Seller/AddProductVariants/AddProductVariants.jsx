import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchColors} from "../../../features/allColors";
import {toast} from "react-hot-toast";
import axios from "../../../utils/seller-axios-utils"
import "./add-product-variant.scss";

const AddProductVariants = ({variants, setVariants}) => {

    const [open, setOpen] = useState("");
    const [imagesLoading, setImagesLoading] = useState(false);

    const {data: colors, loading: colorsLoader, error: colorsError} = useSelector(state => state.colors);
    const dispatch = useDispatch();

    console.log(variants, "variants")

    const isLastVariantFilled = () => {
        const lastVariant = variants[variants.length - 1];
        return lastVariant && lastVariant.color && lastVariant.originalPrice && lastVariant.quantity && lastVariant.images.length < 3;
    };

    const handleChange = (index, key, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][key] = value;
        setVariants(updatedVariants);
    };

    const handleAddVariant = () => {
        if (!isLastVariantFilled()) {
            toast.error('Please fill in all fields in the previous variant.');
            return;
        }
        setVariants([...variants, { color: '', originalPrice: 0, quantity: 0, images: [] }]);
    };

    const handleRemoveVariant = (indexToRemove) => {
        setVariants((prevVariants) =>
            prevVariants.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleChangeColor = (color) => {
        const updatedVariants = [...variants];
        updatedVariants[variants.length - 1].color = color._id;
        setVariants(updatedVariants);
        setOpen("")
    };

    const handleChangeVariantProperty = (key, value) => {
        const updatedVariants = [...variants];
        updatedVariants[variants.length - 1][key] = value;
        setVariants(updatedVariants);
    };

    const handleCahngeImage = (event) => {
        const {files} = event.target;
        if (files.length > 0){
            setImagesLoading(true)
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                data.append("images", files[i]);
            }
            return axios({url: '/api/upload/images', method: 'POST', data: data})
                .then(response => {
                    const {data} = response;
                    const updatedVariants = [...variants];
                    updatedVariants[variants.length - 1].images = data;
                    setVariants(updatedVariants);
                    setImagesLoading(false)
                });
        }
    };

    const findColorName = (colorId) => {
        const foundColor = colors?.find((color) => color._id === colorId);
        return foundColor ? foundColor.name : 'Select Color';
    };

    useEffect(() => {
        dispatch(fetchColors())
    }, [])

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
                        <p className="form-item__title form-item__title--margin">Color</p>
                        <div className="unique-dropdown variant__unique-dropdown">
                            <div className="unique-dropdown__cap">
                                <button className="unique-dropdown__button" type="button"
                                        onClick={open === "color" ? () => setOpen("") : () => setOpen("color")}>
                                    {variants[variants.length - 1].color ? (
                                        <>
                                            {findColorName(variants[variants.length - 1].color)}
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
                                                {colors && colors.length > 0 ? (
                                                    colors.map((color) => (
                                                        <li
                                                            className={
                                                                color.name === findColorName(variants[variants.length - 1].color)
                                                                    ? "unique-dropdown__list-item unique-dropdown__list-item--active"
                                                                    : "unique-dropdown__list-item"
                                                            }
                                                            key={color._id}
                                                            onClick={() => handleChangeColor(color)}
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
                            value={variants[variants.length -1].originalPrice}
                            onChange={(e) => handleChangeVariantProperty("originalPrice", e.target.value)}
                        />
                    </div>
                    <div className="form-item variant__form-item">
                        <p className="form-item__title form-item__title--margin">Quantity</p>
                        <input
                            className="input form-item__input"
                            type="number"
                            value={variants[variants.length -1].quantity}
                            onChange={(e) => handleChangeVariantProperty("quantity", e.target.value)}
                        />
                    </div>
                    <div className="form-item variant__form-item">
                        <p className="form-item__title form-item__title--margin">Images</p>
                        <div className="uploaded-image">
                            {
                                variants[variants.length - 1]?.images?.map((image, index) => (
                                    <div className="uploaded-image__item">
                                        <img className="uploaded-image__item-img" src={image.url} alt=""/>
                                        <span className="uploaded-image__icon"><i className="ri-star-line"></i></span>
                                    </div>
                                ))
                            }
                            <div className="image-upload form-item__image-upload">
                                <label htmlFor="username" className="image-upload__label">
                                    <span className="image-upload__image-icon">
                                        <i className="ri-upload-cloud-line"></i>
                                        Upload
                                    </span>
                                </label>
                                <input
                                    className="image-upload__image-input"
                                    id="username"
                                    name="username"
                                    type="file"
                                    onChange={(e) => handleCahngeImage(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductVariants;