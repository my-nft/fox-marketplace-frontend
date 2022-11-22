const AccordingStatus = () => {
  return (
    <div id="accordionStatus">
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Status
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
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionStatus"
        >
          <div className="card-body">
            <div className="checkBox">
              <span>Buy Now</span>
              <label className="onoffbtn">
                <input type="checkbox" name="buynow" />
              </label>
            </div>
            <div className="checkBox">
              <span>On Action</span>
              <label className="onoffbtn">
                <input type="checkbox" name="onaction" />
              </label>
            </div>
            <div className="checkBox">
              <span>New</span>
              <label className="onoffbtn">
                <input type="checkbox" name="new" />
              </label>
            </div>
            <div className="checkBox">
              <span>Has Offers</span>
              <label className="onoffbtn">
                <input type="checkbox" name="hasoffer" />
              </label>
            </div>
            <div className="checkBox">
              <span>Buy with Card</span>
              <label className="onoffbtn">
                <input type="checkbox" name="buywithcard" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordingStatus;
