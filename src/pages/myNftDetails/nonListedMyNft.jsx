import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomDatePicker from "../../components/datePicker/datePicker";
import CardBody from "../../components/nft/CardBody";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import {
  LISTING_AUCTION,
  LISTING_FIXED_PRICE,
} from "../../saga/blockchain.js/blockChainActions";
import { getBestOffer } from "../../services/listingNft";
import { FIXED_PRICE, AUCTION } from "../../utils/foxConstantes";

const NonListedMyNft = ({ handleAcceptOffer, nftDetails, setNftDetails }) => {
  const [type, setType] = useState(FIXED_PRICE);
  const [showPicker, setShowPicker] = useState(false);
  const [bestOffer, setBestOffer] = useState();
  const dispatch = useDispatch();
  // values
  const [values, setValues] = useState({
    fixedPrice: 0,
    auctionPrice: 0,
    time: 0,
  });

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const onSubmitForm = async (evt) => {
    evt.preventDefault();
    if (type === AUCTION) {
      handleAuction(values);
    } else if (type === FIXED_PRICE) {
      handleFixedPrice(values);
    }
  };

  const init = async () => {
    const bestOfferPrice = await getBestOffer(
      nftDetails.collectionAddress,
      nftDetails.tokenID
    );
    setBestOffer(bestOfferPrice);
  };

  const handleFixedPrice = async (values) => {
    const fixedPrice = Number(values.fixedPrice);
    dispatch({
      type: LISTING_FIXED_PRICE,
      payload: {
        collectionAddress: nftDetails.collectionAddress,
        tokenID: nftDetails.tokenID,
        fixedPrice: fixedPrice,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const handleAuction = async (values) => {
    const auctionPrice = Number(values.auctionPrice);
    const endAuction = (values.time - new Date().getTime()) / 1000;

    dispatch({
      type: LISTING_AUCTION,
      payload: {
        collectionAddress: nftDetails.collectionAddress,
        tokenID: nftDetails.tokenID,
        auctionPrice: auctionPrice,
        endAuction: Math.floor(endAuction),
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  useEffect(() => {
    init();
  }, [nftDetails]);

  useEffect(() => {
    if (type === AUCTION) {
      setShowPicker(true);
    } else {
      setShowPicker(false);
    }
  }, [type]);

  const handleDateChange = (dateObj) => {
    setShowPicker(false);
    setValues({ ...values, time: dateObj.getTime() });
  };

  return (
    <>
      <CustomDatePicker
        showPicker={showPicker}
        closeAction={() => setShowPicker(false)}
        dateSetAction={handleDateChange}
      />
      <CardNftWrapper>
        <CardBody
          bestOffer={bestOffer}
          onAcceptOffer={handleAcceptOffer}
          ownerAddress={nftDetails.ownerAddress}
        >
          <div className="card" id="cardNft">
            <div className="card-body">
              <div className="card-text">
                <button
                  id="fixedPrice"
                  className={
                    type === FIXED_PRICE
                      ? "btn orangeBg m-2 active"
                      : "btn orangeBg m-2 deactive"
                  }
                  onClick={() => setType(FIXED_PRICE)}
                >
                  Fixed price
                </button>
                <button
                  id="timedAuction"
                  className={
                    type === AUCTION
                      ? "btn orangeBg m-2 active"
                      : "btn orangeBg m-2 deactive"
                  }
                  onClick={() => {
                    setShowPicker(true);
                    setType(AUCTION);
                  }}
                  
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
                    onClick={onSubmitForm}
                  >
                    Item for sale
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
                      <label
                        htmlFor="inputAmount"
                        onClick={() => setShowPicker(true)}
                      >
                        Duration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Text input with dropdown button"
                        placeholder="Duration"
                        id="time"
                        name="time"
                        onChange={handleChange}
                        onClick={() => setShowPicker(true)}
                        readOnly
                        value={
                          values.time
                            ? new Date(values.time).toLocaleString([], {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            : ""
                        }
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
        </CardBody>
      </CardNftWrapper>
    </>
  );
};

export default NonListedMyNft;
