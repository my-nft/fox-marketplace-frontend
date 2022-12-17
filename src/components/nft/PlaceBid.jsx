import { useState } from "react";

const PlaceBid = ({ onPlaceBid }) => {
  // values
  const [values, setValues] = useState({
    auctionPrice: 0,
  });

  const handleChange = (evt) => {
    setValues({ auctionPrice: evt.target.value });
  };

  return (
    <div className="card mt-2" id="timedAuctionDetails">
      <div className="card-body">
        <div className="card-text">
          <form id="setAuction">
            <div className="input-group">
              <div style={{ width: "80%" }}>
                <label htmlFor="inputAmount">Price</label>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Text input with dropdown button"
                  placeholder="Amount"
                  id="amount"
                  name="auctionPrice"
                  value={values.auctionPrice}
                  onChange={handleChange}
                />
              </div>
              <select id="nameofCoin">
                <option>FXG</option>
              </select>
            </div>

            <button
              id="placeBidSubmit"
              className="btn contIcon"
              disabled={!(Number(values.auctionPrice) > 0)}
              onClick={(evt) => {
                evt.preventDefault();
                onPlaceBid(values.auctionPrice);
              }}
            >
              Place bid
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceBid;
