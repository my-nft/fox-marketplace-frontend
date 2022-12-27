import { useState } from "react";
import CustomSelect from "../../components/Select";

const AccordionPrice = ({ filters, changeFilterValue }) => {
  const [prices, setPrices] = useState({
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });
  const [token, setToken] = useState(filters.buyToken);

  const processNumberInput = (key, e) => {
    const value = e.target.value;
    setPrices({
      ...prices,
      [key]: parseInt(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeFilterValue({
      ...filters,
      "minPrice": prices.minPrice,
      "maxPrice": prices.maxPrice,
    })

  }


  return (
    <div id="accordionPrice">
      <div className="card">
        <div className="card-header" id="headingTwo">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Price
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
          id="collapseTwo"
          className="collapse show"
          aria-labelledby="headingTwo"
          data-parent="#accordionPrice"
        >
          <form onSubmit={(e) => handleSubmit(e)} className="card-body">
            <div id="wrapperNumber">
              <input
                type="number"
                placeholder="Min"
                min="0"
                max="15000"
                value={prices.minPrice}
                onInput={(e) => processNumberInput("minPrice", e)}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                min="0"
                max="15000"
                value={prices.maxPrice}
                onInput={(e) => processNumberInput("maxPrice", e)}
              />
              {/* <select value={token} onChange={(e) => setToken(e.target.value)} >
                <option value="ETH" >ETH</option>
                <option value="DOGE" >DOGE</option>
              </select> */}
              <CustomSelect
                options={[
                  { value: "ETH", label: "ETH" },
                  { value: "DOGE", label: "DOGE" },
                ]}
                value={{ value: token, label: token }}
                onChange={(e) => setToken(e.value)}
              />
            </div>
            <button type="submit">Apply</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccordionPrice;
