import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

const SearchBar = ({ changeFilterValue, filters, id, placeholder }) => {
  return (
    <div className="form-control-container">
      <SearchIcon />
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        id={id}
        onChange={(e) =>
          changeFilterValue({
            ...filters,
            searchPrompt: e.target.value,
          })
        }
        value={filters.search}
      />
    </div>
  );
};

export default SearchBar;
