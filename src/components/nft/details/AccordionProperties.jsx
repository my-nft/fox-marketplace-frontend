import { useEffect, useState } from "react";

const AccordionProperties = ({ nftDetails }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (nftDetails && nftDetails.attributes) {
      let data = [];

      nftDetails.attributes.filter(item => item.value !== '' && item.value !== 'None' && item.value).map((item) => {
        data.push({
          name: item.trait_type ? item.trait_type : "-",
          value: item.value,
          rarityPercent: item.rarity,
        });
      });

      setProperties(data);
    }
  }, [nftDetails]);

  return (
    <div id="accordionProperties">
      <div className="card">
        <div className="card-header" id="headingTwo">
          <h5 className="mb-0">
            <div>
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-tag-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                  <span className="pl-3">Properties</span>
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
            </div>
          </h5>
        </div>

        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionProperties"
        >
          <div className="card-body">
            <div id="propTags">
              {properties.map((item, index) => {
                return (
                  <div className="tags" key={index}>
                    <h6>{item.name ? item.name : "-"}</h6>
                    <p>{item.value ? item.value : "-"}</p>
                    <span>{item.rarityPercent}% have this trait</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionProperties;
