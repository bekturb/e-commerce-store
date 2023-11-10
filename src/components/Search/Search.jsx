import React from 'react';

const Search = ({onSearch}) => {
    const handleSearch = (e) => {
        const query = e.target.value;
        onSearch(query);
    };

    return (
        <div className="down__form">
            <label>
                <input
                    onChange={handleSearch}
                    className="down__input"
                    type="text"
                    placeholder="search..."
                />
            </label>
        </div>
    );
};

export default Search;