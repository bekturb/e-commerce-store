import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {searchActions} from "../../features/searchProductsSlice";

const HeaderSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {query} = useSelector(state => state.searchProducts);

    const handleSearchChange = () => {
        if (searchTerm?.trim() !== "") {
            dispatch(searchActions.saveSearchQuery(searchTerm));
            navigate("/search-results");
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