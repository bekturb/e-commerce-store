import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import image from "../../assets/products/apparel2.jpg"

const HeaderSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const handleSearchChange = () => {
        if (searchTerm?.trim() !== "") {
            navigate(`/catalog/search/${searchTerm}`);
        }
    };

    return (
        <div className="search">
            <div className="search__form">
                <div className="search__input-box">
                    <span className="search__icon icon-lg ">
                        <i className="ri-search-line"></i>
                    </span>
                    <div className="search__images-box">
                        <div className="search__image-content">
                            <img className="search__image" src={image} alt=""/>
                            <p className="search__image-text">Lorem ipsum</p>
                            <span className="search__close-icon">
                                <i className="ri-close-fill"></i>
                            </span>
                        </div>
                    </div>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search__input"
                        type="search"
                        value={searchTerm}
                        placeholder="Search for products"
                    />
                    <span className="search__photo">
                         <i className="ri-camera-line"></i>
                    </span>
                </div>
                <button onClick={handleSearchChange} className="search__btn" >Search</button>
            </div>
        </div>
    );
};

export default HeaderSearch;