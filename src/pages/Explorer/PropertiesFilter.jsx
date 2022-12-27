import { useEffect, useState } from "react";
import SliderToggle from "../Account/SliderToggle";

const AccordionPropertiesFilter = ({
  availableProperties,
  propertiesFilter,
  filters,
  changeFilterValue,
}) => {
  const handleFilterChange = (property, boolean) => {
    console.log(property, boolean);

    if (boolean) {
      let propertiesNew = [...filters.properties, property];

      let unique = propertiesNew.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      changeFilterValue({
        ...filters,
        properties: unique,
      });
    } else {
      let propertiesNew = filters.properties.filter((p) => p !== property);
      console.log(propertiesNew);
      //   changeFilterValue({
      //     ...filters,
      //     properties: propertiesNew
      //     })
    }
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
            {availableProperties.map((property, index) => {
              return (
                <SliderToggle
                  key={index}
                  title={property}
                  active={propertiesFilter.find((p) => p === property)}
                  action={(boolean) => handleFilterChange(property, boolean)}
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
