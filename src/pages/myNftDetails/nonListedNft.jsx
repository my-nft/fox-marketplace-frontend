import { useState } from "react";
import { FIXED_PRICE, AUCTION } from "../../utils/foxConstantes";


const NonListedNft = ({ handleAuction }) => {
  const [type, setType] = useState(FIXED_PRICE);
  // values
  const [values, setValues] = useState({
    fixedPrice: 0,
    auctionPrice: 0,
    time: 0,
  });

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const handleFixedPrice = (evt) => {
    evt.preventDefault();
  };


    const onSubmitForm = async (evt) => {
    evt.preventDefault();
    handleAuction(values);
  };


  return (
    <>
      <div className="card" id="cardNft">
        <div className="card-body">
          <div className="card-text">
            <button
              id="fixedPrice"
              className={
                type === FIXED_PRICE
                  ? "btn orangeBg active"
                  : "btn orangeBg deactive"
              }
              onClick={() => setType(FIXED_PRICE)}
            >
              Fixed price
            </button>
            <button
              id="timedAuction"
              className={
                type === AUCTION
                  ? "btn orangeBg active"
                  : "btn orangeBg deactive"
              }
              onClick={() => setType(AUCTION)}
            >
              Timed auction
            </button>
          </div>
        </div>
      </div>

      {type === FIXED_PRICE ? (
        <div className="card mt-2" id="fixedPriceDetails">
          <div className="card-body">
            <form id="setPrice">
              <div className="input-group">
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  <label htmlFor="inputAmount">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="Amount"
                    id="fixedPrice"
                    name="fixedPrice"
                    onChange={handleChange}
                  />
                </div>
                <select id="nameofCoin">
                  <option>FXG</option>
                </select>
              </div>
              <button
                id="makeOfferSubmit"
                className="btn contIcon"
                onClick={handleFixedPrice}
              >
                Make offer
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {type === AUCTION ? (
        <div className="card mt-2" id="timedAuctionDetails">
          <div className="card-body">
            <div className="card-text">
              <form id="setAuction">
                <div className="input-group">
                  <div
                    style={{
                      width: "80%",
                    }}
                  >
                    <label htmlFor="inputAmount">Starting Price</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Text input with dropdown button"
                      placeholder="Amount"
                      id="auctionPrice"
                      name="auctionPrice"
                      onChange={handleChange}
                    />
                  </div>
                  <select id="nameofCoin">
                    <option>FXG</option>
                  </select>
                </div>
                <div className="input-group mt-3">
                  <label htmlFor="inputAmount">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="Duration"
                    id="time"
                    name="time"
                    onChange={handleChange}
                  />
                </div>
                <button
                  id="placeBidSubmit"
                  className="btn contIcon"
                  onClick={onSubmitForm}
                >
                  Create auction
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NonListedNft;
