import Command from "../../pages/Explorer/Command";
import { SORT_ENUM } from "../../utils/foxConstantes";
import CustomSelect from "../Select";

const HeaderInput = ({
  filters,
  changeFilterValue,
  setFiltersVisible = () => {},
  filtersVisible,
}) => {
  return (
    <section id="headerInput">
      <Command
        filters={filters}
        changeFilterValue={changeFilterValue}
        toggleFilters={() => setFiltersVisible(!filtersVisible)}
      />

      <div className="filterSelect exploreSelectContainer ml-3">
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
            { value: "PRICE_ASC", label: "Price Asc" },
            { value: "PRICE_DESC", label: "Price Desc" },
          ]}
          isSearchable={false}
          styles={{
            control: (provided) => ({
              ...provided,
              border: "none",
              boxShadow: "none",
              backgroundColor: "transparent",
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

      <button>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-repeat"
            viewBox="0 0 16 16"
          >
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path
              fillRule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
            />
          </svg>
        </div>
        <div>
          <p>Update 1 min ago</p>
          <span>568558 item</span>
        </div>
      </button>
    </section>
  );
};
export default HeaderInput;
