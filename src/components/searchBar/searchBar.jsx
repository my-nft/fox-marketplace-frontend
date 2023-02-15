import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { useEffect, useMemo } from "react";
import debounce from 'lodash.debounce';

const SearchBar = ({ changeFilterValue, filters, id, placeholder }) => {

  const handleSearchInput = useMemo(() => {
    const handleChange = (e) => {
      return changeFilterValue({
        ...filters,
        searchPrompt: e.target.value
      })
    };
    return debounce(handleChange, 720);
  }, []);

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
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default SearchBar;
