const AccordionAbout = ({ nftDetails }) => {
  return (
    <div id="accordionAbout">
      <div className="card">
        <div className="card-header" id="headingSeven">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-toggle="collapse"
              data-target="#collapsSeven"
              aria-expanded="true"
              aria-controls="collapsSeven"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
                  />
                </svg>
                <span className="pl-3">About</span>
                <strong> {nftDetails.name}</strong>
              </div>
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
          id="collapsSeven"
          className="collapse"
          aria-labelledby="headingSeven"
          data-parent="#accordionAbout"
        >
          <div className="card-body">
            <span>{nftDetails.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionAbout;
