import PropertyCategory from "../../components/PropertyCategory";

const AccordionPropertiesFilter = ({
  properties = [],
  filters,
  changeFilterValue,
}) => {
  const handlePropertyFilterChange = (property, category, boolean) => {
    const propertiesFilter = [...properties];

    const propertyCategoryTarget = propertiesFilter.find((prop) => {
      return prop.name === category;
    });

    propertyCategoryTarget.properties.map((prop) => {
      if (prop.title === property.title) {
        prop.active = boolean;
      }
    });

    changeFilterValue({
      ...filters,
      properties: propertiesFilter,
    });
  };

  return (
    <div id="accordionProperties">
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-toggle="collapse"
              data-target="#collapseFive"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Properties
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
          id="collapseFive"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionProperties"
        >
          <div className="card-body">
            {properties.map((property, index) => {
              return (
                <PropertyCategory
                  propertyTitle={property.name}
                  properties={property.properties}
                  key={index}
                  handleFilterChange={(propertyVal, boolean) => {
                    console.log(propertyVal, boolean);
                    handlePropertyFilterChange(
                      propertyVal,
                      property.name,
                      boolean
                    );
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionPropertiesFilter;
