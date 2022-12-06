const AccordionDetails = ({collectionData}) => {

  console.log(collectionData)

  return (
    <div id="accordionDetails">
      <div class="card">
        <div class="card-header" id="headingThree">
          <h5 class="mb-0">
            <button
              class="btn btn-link"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-list-ul"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                  />
                </svg>
                <span class="pl-3">Collection</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </button>
          </h5>
        </div>

        <div
          id="collapseThree"
          class="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionDetails"
        >
          <div class="card-body">
            <ul>
              <li>
                <span class="label">Contract Address</span>
                <span class="value">{collectionData.address}</span>
              </li>
              <li>
                <span class="label">Token ID</span>
                <span class="value">{collectionData.tokenId}</span>
              </li>
              <li>
                <span class="label">Token Standard</span>
                <span class="value">{collectionData.tokenStandard}</span>
              </li>
              <li>
                <span class="label">Chain</span>
                <span class="value">{collectionData.chain}</span>
              </li>
              <li>
                <span class="label">Last Updated</span>
                <span class="value">{collectionData.lastUpdate}</span>
              </li>
              <li>
                <span class="label">Creator Earnings</span>
                <span class="value">{collectionData.creatorEarnings}%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionDetails;
