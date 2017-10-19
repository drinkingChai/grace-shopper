import React from 'react';

const SearchBar = ({ searchInput, handleSearch }) => {
  return (
    <form className="col-xs-6 col-sm-3">
      <input
        value={ searchInput }
        onChange={(ev) => handleSearch(ev.target.value)}
        placeholder="Search..."
        type="text"
        className="form-control" />
    </form>
  );
};

export default SearchBar;
