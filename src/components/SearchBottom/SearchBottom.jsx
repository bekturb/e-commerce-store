import React from 'react';
import "./search-bottom.scss"

const SearchBottom = ({showSearchBottom, setShowSearchBottom}) => {
    return (
        <div className={showSearchBottom ? "search-bottom visible desktop-hide" : "search-bottom desktop-hide"}>
            <div className="search search-bottom__search">
                <form className="search__form">
                    <div className="search-bottom__search-close t-close flexcenter" onClick={() => setShowSearchBottom(false)}>
                        <i className="ri-close-line"></i>
                    </div>
                    <span className="search__icon icon-lg "><i className="ri-search-line"></i></span>
                    <input className="search__input" type="mail" placeholder="Your email address" required/>
                    <button className="search__btn" type="submit">Search</button>
                </form>
            </div>
        </div>
    );
};

export default SearchBottom;