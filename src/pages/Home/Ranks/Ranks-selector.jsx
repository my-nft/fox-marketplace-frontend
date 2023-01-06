import { TERENDINGS, COLLECTIONS } from "./constantes";


const RanksSelector = (props) => {
    return (
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-profile-tab"
            data-toggle="pill"
            data-target="#pills-top"
            type="button"
            role="tab"
            aria-controls="pills-top"
            aria-selected="false"
            onClick={() => props.onChangeSelected(COLLECTIONS)}
          >
            Top
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            data-target="#pills-trending"
            type="button"
            role="tab"
            aria-controls="pills-trending"
            aria-selected="true"
            onClick={() => props.onChangeSelected(TERENDINGS)}
          >
            Trending
          </button>
        </li>
      </ul>
    )
}

export default RanksSelector;