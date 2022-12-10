import SliderToggle from "../Account/SliderToggle";

const AccordionCategory = ({filters, changeFilterValue}) => {

  const handleCategoryToggle = (category, boolean) => {
    if(boolean){
      // item is checked
      if(!filters.categories.includes(category)){
        changeFilterValue({
          ...filters,
          categories: [...filters.categories, category]
        })
      }

    }
    else{
      // item is unchecked
      changeFilterValue({
        ...filters,
        categories: [...filters.categories.filter(item => item !== category)]
      })
    }
 
  }


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
            <SliderToggle title='Art' active={filters.categories.includes("ART")} action={(boolean) => handleCategoryToggle("ART",boolean)} />
            <SliderToggle title='Collectible' active={filters.categories.includes("COLLECTIBLE")} action={(boolean) => handleCategoryToggle("COLLECTIBLE",boolean)} />
            <SliderToggle title='Domain Names' active={filters.categories.includes("DOMAIN_NAMES")} action={(boolean) => handleCategoryToggle("DOMAIN_NAMES",boolean)} />
            <SliderToggle title='Music' active={filters.categories.includes("MUSIC")} action={(boolean) => handleCategoryToggle("MUSIC",boolean)} />
            <SliderToggle title='Photography' active={filters.categories.includes("PHOTOGRAPHY")} action={(boolean) => handleCategoryToggle("PHOTOGRAPHY",boolean)} />
            <SliderToggle title='Trending Cards' active={filters.categories.includes("TRENDING_CARDS")} action={(boolean) => handleCategoryToggle("TRENDING_CARDS",boolean)} />
            <SliderToggle title='Utility' active={filters.categories.includes("UTILITY")} action={(boolean) => handleCategoryToggle("UTILITY",boolean)} />
            <SliderToggle title='Virtual Worlds' active={filters.categories.includes("VIRTUAL_WORLDS")} action={(boolean) => handleCategoryToggle("VIRTUAL_WORLDS",boolean)} />

          </div>
        </div>
      </div>
    </div>
  );
};


export default AccordionCategory;