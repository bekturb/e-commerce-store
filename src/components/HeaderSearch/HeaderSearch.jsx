import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const HeaderSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const handleSearchChange = () => {
        if (searchTerm?.trim() !== "") {
            navigate(`/catalog/0/search/${searchTerm}`);
        }
    };

    return (
        <div className="search">
            <div className="search__form">
                <span className="search__icon icon-lg ">
                    <i className="ri-search-line"></i>
                </span>
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search__input"
                    type="search"
                    value={searchTerm}
                    placeholder="Search for products"
                />
                <button onClick={handleSearchChange} className="search__btn" >Search</button>
            </div>
        </div>
    );
};

export default HeaderSearch;