import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteSearchImage, setSearchImage} from "../../features/searchByImageSlice";

const HeaderSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const {searchImage} = useSelector(state => state.searchByImageReducer)

    console.log(searchImage, "ss")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearchChange = () => {
        if (searchTerm) {
            navigate(`/catalog/search/${searchTerm}`);
        }
    };

    const handleImageChange = (e) => {
        const { files } = e.target;

        if (files.length > 0) {
            const imageFile = files[0];

            dispatch(setSearchImage(imageFile))

            const previewURL = URL.createObjectURL(imageFile);
            setImagePreview(previewURL);

            const imageName = `${Date.now()}-${imageFile.name}`;

            navigate(`/catalog/search-by-image/${imageName}`);
        }
    };

    const handleDeleteImage = () => {
        dispatch(deleteSearchImage())
    }

    return (
        <div className="search">
            <div className="search__form">
                <div className="search__input-box">
                    <span className="search__icon icon-lg ">
                        <i className="ri-search-line"></i>
                    </span>
                    {
                        imagePreview && searchImage && (
                                <div className="search__images-box">
                                    <div className="search__image-content">
                                        <img className="search__image" src={imagePreview} alt=""/>
                                        <p className="search__image-text">{searchImage?.name}</p>
                                        <span onClick={handleDeleteImage} className="search__close-icon">
                                            <i className="ri-close-fill"></i>
                                        </span>
                                    </div>
                                </div>
                        )
                    }
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search__input"
                        type="search"
                        value={searchTerm}
                        placeholder="Search for products"
                    />
                    {
                        !searchTerm && (
                            <>
                                <label htmlFor="photo">
                                    <span className="search__photo">
                                        <i className="ri-camera-line"></i>
                                    </span>
                                </label>
                                <input
                                    onChange={handleImageChange}
                                    className="search__input-photo"
                                    type="file"
                                    name="photo"
                                    id='photo'
                                />
                            </>
                        )
                    }
                </div>
                <button onClick={handleSearchChange} className="search__btn" >Search</button>
            </div>
        </div>
    );
};

export default HeaderSearch;