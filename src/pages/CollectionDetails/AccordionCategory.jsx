const AccordionCategory = () => {
  return (
    <div id="accordionCategory">
      <div className="card">
        <div className="card-header" id="headingFour">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="true"
              aria-controls="collapseFour"
            >
              Category
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </button>
          </h5>
        </div>

        <div
          id="collapseFour"
          className="collapse"
          aria-labelledby="headingFour"
          data-parent="#accordionCategory"
        >
          <div className="card-body">
            <div className="checkBox">
              <span>Art</span>
              <label className="onoffbtn">
                <input type="checkbox" name="art" />
              </label>
            </div>
            <div className="checkBox">
              <span>Collectible</span>
              <label className="onoffbtn">
                <input type="checkbox" name="Collectibles" />
              </label>
            </div>
            <div className="checkBox">
              <span>Domain Names</span>
              <label className="onoffbtn">
                <input type="checkbox" name="domainnames" />
              </label>
            </div>
            <div className="checkBox">
              <span>Music</span>
              <label className="onoffbtn">
                <input type="checkbox" name="music" />
              </label>
            </div>
            <div className="checkBox">
              <span>Photography</span>
              <label className="onoffbtn">
                <input type="checkbox" name="photography" />
              </label>
            </div>
            <div className="checkBox">
              <span>Trending Cards</span>
              <label className="onoffbtn">
                <input type="checkbox" name="tradingcards" />
              </label>
            </div>
            <div className="checkBox">
              <span>Utility</span>
              <label className="onoffbtn">
                <input type="checkbox" name="utility" />
              </label>
            </div>
            <div className="checkBox">
              <span>Virtual Worlds</span>
              <label className="onoffbtn">
                <input type="checkbox" name="virtualwords" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AccordionCategory;