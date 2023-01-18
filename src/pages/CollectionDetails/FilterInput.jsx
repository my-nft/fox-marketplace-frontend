import SearchBar from "../../components/searchBar/searchBar";
import CustomSelect from "../../components/Select";
import { SORT_ENUM } from "../../utils/foxConstantes";
import OpenCloseButton from "./../../components/buttons/openClose";

const FilterInput = ({
  onOpenClose,
  onChangeSelectedView,
  filters,
  changeFilterValue,
}) => {
  return (
    <section id="filterInput" className="container-fluid">
      <div className="mr-5 wrapper">
        <OpenCloseButton clickAction={onOpenClose} />

        <SearchBar
          filters={filters}
          changeFilterValue={changeFilterValue}
          id={"formSearch"}
          placeholder="Search NFTs, collections, artist and genres..."
        />

        {/* <select
          value={filters.sortBy}
          onChange={(e) =>
            changeFilterValue({
              ...filters,
              sortBy: e.target.value,
            })
          }
        >
          <option value="PRICE_ASC">Price low to high</option>
          <option value="PRICE_DESC">Price high to low</option>
          <option value="RECENTLY_LISTED">Recently listed</option>
          <option value="RECENTLY_CREATED">Recently created</option>
          <option value="RECENTLY_SOLD">Recently sold</option>
        </select> */}

        <div className="filterSelect accountSelect">
          <CustomSelect
            value={{
              value: filters.sortBy,
              label: SORT_ENUM[filters.sortBy],
            }}
            onChange={(e) => {
              console.log(e);
              changeFilterValue({ ...filters, sortBy: e.value });
            }}
            options={[
              { value: "RECENTLY_LISTED", label: "Recently Listed" },
              { value: "PRICE_ASC", label: "Price Ascending" },
              { value: "PRICE_DESC", label: "Price Descending" },
              { value: "RECENTLY_CREATED", label: "Recently Created" },
              { value: "RECENTLY_SOLD", label: "Recently Sold" },
              { value: "RECENTLY_CREATED", label: "Recently Created" },
            ]}
            isSearchable={false}
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                position: "relative",
                zIndex: 1000,
                ":hover": {
                  color: "#f58103",
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#15191d",
                border: "1px solid #f58103",
                borderRadius: "8px",
                boxShadow: "0px 4px 4px #f5800373",
                boxShadow: "none",
                width: "calc(100% + 32px)",
                transform: "translate(-16px, 16px)",
              }),
              menuList: (provided) => ({
                ...provided,
                padding: 0,
              }),
              // style dropdown indicator when is opened
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: state.selectProps.menuIsOpen ? "#f58103" : "#fff",
                transform: state.selectProps.menuIsOpen && "rotate(180deg)",
                transition: "all 0.3s ease-in-out",
                ":hover": {
                  color: "#f58103",
                },
              }),
              //style vertical line
              indicatorSeparator: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
              }),

              option: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                color: "#FFFFFF",
                cursor: "pointer",
                position: "relative",
                zIndex: 1000,
                padding: "8px 24px 12px",
                ":hover": {
                  backgroundColor: "#f58103",
                  color: "#fff",
                },
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#FFFFFF",
                padding: "0px 8px",
                margin: 0,
              }),
            }}
          />
        </div>

        <ul id="chooseLayout">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-grid-fill"
              viewBox="0 0 16 16"
              onClick={() => onChangeSelectedView("CHANGE_FOR_MIN")}
            >
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-grid-3x3-gap-fill"
              viewBox="0 0 16 16"
              onClick={() => onChangeSelectedView("CHANGE_FOR_MAX")}
            >
              <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
            </svg>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-grid-1x2-fill"
              viewBox="0 0 16 16"
              onClick={() => onChangeSelectedView("CHANGE_FOR_IMAGE")}
            >
              <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" />
            </svg>
          </li>
        </ul>
      </div>
      <ul
        className="nav pillsCategories mt-3 nav-pills mb-3"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            data-target="#pills-Items"
            type="button"
            role="tab"
            aria-controls="pills-Items"
            aria-selected="true"
          >
            Items
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-contact-tab"
            data-toggle="pill"
            data-target="#pills-Activity"
            type="button"
            role="tab"
            aria-controls="pills-Activity"
            aria-selected="false"
          >
            Activity
          </button>
        </li>
      </ul>
    </section>
  );
};

export default FilterInput;
