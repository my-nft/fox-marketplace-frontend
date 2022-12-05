import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { selectNftDetails, selectIsLoading } from "../../redux/nftReducer";
import { createAuction } from "../../services/listingNft";
import { collectionAddress_tochange } from "../CollectionDetails";

const FIXED_PRICE = "FIXED_PRICE";
const AUCTION = "AUCTION";

const MyNftDetails = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const nftDetails = useSelector(selectNftDetails);
  const isLoading = useSelector(selectIsLoading);
  // can take FIXED_PRICE or AUCTION
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

  useEffect(() => {
    setIsLoadingPage(isLoading);
  }, [isLoading]);

  console.log(nftDetails, isLoadingPage);

  const handleAuction = async (evt) => {
    evt.preventDefault();

    const auctionPrice = Number(values.auctionPrice);
    const endAuction = Number(values.time);
    const trx = await createAuction(
      collectionAddress_tochange,
      104,
      values.auctionPrice,
      values.time
    );
  };

  const handleFixedPrice = (evt) => {
    evt.preventDefault();
  };

  return isLoadingPage ? (
    <Spinner />
  ) : (
    <div className="container my-5" id="nftPage">
      <img src="./assets/images/Background.jpg" id="layer" />
      <h3 className="my-5 text-center">List Item for Sale</h3>
      <div className="row">
        <div className="col-md-12  col-lg-5 order-2 order-lg-1 ">
          <div id="imgNft" className="imgForSale">
            <img src={nftDetails.image} id="NFT" className="imgForSale" />
          </div>
        </div>
        <div className="col-md-12  col-lg-7 order-1 order-lg-2 ">
          <header id="infoNFT" className="mb-3">
            <h4>{nftDetails.name}</h4>
            <h2>RoboPunks number8 #1691</h2>
          </header>

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
                      onClick={handleAuction}
                    >
                      Create auction
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : null}

          <div className="card" id="fees">
            <div className="card-body">
              <div className="card-text">
                <ul>
                  <li>
                    <span>Services fees </span>
                    <strong>10 fxg</strong>
                  </li>
                  <li>
                    <span>Creator fees</span> <strong>10 fxg</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNftDetails;
