import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { useEffect } from "react";
import debounce from 'lodash.debounce';

const SearchBar = ({ changeFilterValue, filters, id, placeholder }) => {

  const handleSearchInput = debounce((value, filters) => {
    changeFilterValue({
      ...filters,
      searchPrompt: value,
    })
  }, 600);

  useEffect(() => {
    return () => {
      handleSearchInput.cancel();
    };
  });

  return (
    <div className="form-control-container">
      <SearchIcon />
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        id={id}
        onChange={(e) => handleSearchInput(e.target.value, filters)}
        value={filters.searchPrompt}
      />
    </div>
  );
};

export default SearchBar;
