import OpenCloseButton from "../../components/buttons/openClose";
import SearchBar from "../../components/searchBar/searchBar";

const FilterInput = ({
  onOpenClose,
  onChangeSelectedView,
  onChangeActiveSection,
  activeSection,
  changeFilterValue,
  filters,
}) => {
  return (
    <section id="filterInput" className="container-fluid">
      <div className="mr-5 wrapper">
        <OpenCloseButton clickAction={onOpenClose} />

        <SearchBar
          changeFilterValue={changeFilterValue}
          filters={filters}
          id="formSearch"
          placeholder="Search NFTs, collections, artist and genres..."
        />

        <select
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
        </select>

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
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class={
              activeSection === "COLLECTIONS" ? "nav-link active" : "nav-link"
            }
            id="pills-home-tab"
            onClick={() => onChangeActiveSection("COLLECTIONS")}
          >
            Collections
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class={activeSection === "NFTS" ? "nav-link active" : "nav-link"}
            id="pills-profile-tab"
            type="button"
            onClick={() => onChangeActiveSection("NFTS")}
          >
            NFTs
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class={activeSection === "CREATED" ? "nav-link active" : "nav-link"}
            id="pills-contact-tab"
            type="button"
            onClick={() => onChangeActiveSection("CREATED")}
          >
            Created
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class={
              activeSection === "COLLECTED" ? "nav-link active" : "nav-link"
            }
            id="pills-contact-tab"
            type="button"
            onClick={() => onChangeActiveSection("COLLECTED")}
          >
            Collected
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class={activeSection === "LISTED" ? "nav-link active" : "nav-link"}
            id="pills-contact-tab"
            type="button"
            onClick={() => onChangeActiveSection("LISTED")}
          >
            Listed
          </button>
        </li>
      </ul>
    </section>
  );
};

export default FilterInput;
