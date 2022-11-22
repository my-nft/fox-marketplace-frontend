import ListItemCollection from "../../components/marketplace/ListItemCollection";

const AccordingCollection = () => {
  return (
    <div id="accordionCollection">
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
              Collection
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
          class="collapse show"
          aria-labelledby="headingThree"
          data-parent="#accordionCollection"
        >
          <div class="card-body">
            <ListItemCollection />
            <ListItemCollection />
            <ListItemCollection />
            <ListItemCollection />
            <ListItemCollection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordingCollection;
