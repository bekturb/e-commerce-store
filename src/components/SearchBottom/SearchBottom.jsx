import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {deleteSearchImage, setSearchImage} from "../../features/searchByImageSlice";
import "./search-bottom.scss"

const SearchBottom = ({showSearchBottom, setShowSearchBottom}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const {searchImage} = useSelector(state => state.searchByImageReducer)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearchChange = () => {
        if (searchTerm) {
            navigate(`/catalog/search/${searchTerm}`);
        }
    };

    const handleChangeImage = (e) => {
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
        <div className={showSearchBottom ? "search-bottom visible desktop-hide" : "search-bottom desktop-hide"}>
            <div className="search search-bottom__search">
                <div className="search__form">
                    <div className="search-bottom__search-close t-close flexcenter" onClick={() => setShowSearchBottom(false)}>
                        <i className="ri-close-line"></i>
                    </div>
                    <span className="search__icon icon-lg "><i className="ri-search-line"></i></span>
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
                                <label htmlFor="image">
                                    <span className="search__photo">
                                        <i className="ri-camera-line"></i>
                                    </span>
                                </label>
                                <input
                                    onChange={handleChangeImage}
                                    className="search__input-photo"
                                    type="file"
                                    name="image"
                                    id='image'
                                />
                            </>
                        )
                    }
                    <button onClick={handleSearchChange} className="search__btn" >Search</button>
                </div>
            </div>
        </div>
    );
};

export default SearchBottom;