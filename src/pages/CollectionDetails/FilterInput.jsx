const FilterInput = ({onOpenClose, onChangeSelectedView}) => {


  return (
    <section id="filterInput" className="container-fluid">
      <div className="mr-5 wrapper">
        <button id="openClose" onClick={onOpenClose}>
          <img src="./assets/images/marketplace/button_open_close.jpg" alt="" />
        </button>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search NFTs, collections, artist and genres..."
          aria-label="Search"
          id="formSearch"
          alt=""
        />
        <select>
          <option>Price low to high</option>
          <option>Price high to low</option>
          <option>Recently listed</option>
          <option>Recently created</option>
          <option>Recently sold</option>
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