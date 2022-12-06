import SliderToggle from "../Account/SliderToggle";

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
            <SliderToggle title='Art' />
            <SliderToggle title='Collectible' />
            <SliderToggle title='Domain Names' />
            <SliderToggle title='Music' />
            <SliderToggle title='Photography' />
            <SliderToggle title='Trending Cards' />
            <SliderToggle title='Utility' />
            <SliderToggle title='Virtual Worlds' />

          </div>
        </div>
      </div>
    </div>
  );
};


export default AccordionCategory;