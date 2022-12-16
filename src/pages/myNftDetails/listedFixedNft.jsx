import { useEffect } from "react";
import { useState } from "react";
import CardBody from "../../components/nft/CardBody";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import {
  getBestOffer,
  getPriceByListing,
} from "../../services/listingNft";
import { getCurrentWalletConnected } from "../../utils/blockchainInteractor";
import { sameAddress } from "../../utils/walletUtils";

const ListedFixedNft = ({
  itemDetails,
  onBuyItem,
  onMakeOffer,
  onDelist,
  onAcceptOffer,
}) => {
  const currentWallet = getCurrentWalletConnected();
  const [currentPrice, setCurrentPrice] = useState();
  const [currentOffer, setCurrentOffer] = useState(0);
  const [bestOffer, setBestOffer] = useState(undefined);
  const [showMakeOffer, setShowMakeOffer] = useState(false);

  const handleChange = (evt) => {
    setCurrentOffer(evt.target.value);
  };

  const init = async () => {
    const currentPrice = await getPriceByListing(itemDetails.listingId);
    const bestOfferPrice = await getBestOffer(
      itemDetails.collectionAddress,
      itemDetails.tokenID
    );
    setCurrentPrice(currentPrice);
    setBestOffer(bestOfferPrice);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <CardNftWrapper>
      <CardBody
        title={"Current Price"}
        price={currentPrice}
        priceDollar={currentPrice}
        bestOffer={bestOffer}
        onAcceptOffer={onAcceptOffer}
        ownerAddress={itemDetails.ownerAddress}
      >
        {!sameAddress(currentWallet, itemDetails.ownerAddress) && (
          <>
            <button
              id="buyItem"
              className="btn"
              onClick={() => onBuyItem(currentPrice)}
            >
              Buy item
            </button>
            <button
              id="makeOffer"
              className="btn"
              onClick={() => setShowMakeOffer(!showMakeOffer)}
            >
              Make offer
            </button>

            {showMakeOffer && (
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
                          id="makeOffer"
                          name="makeOffer"
                          value={currentOffer}
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
                      onClick={(evt) => {
                        evt.preventDefault();
                        onMakeOffer(currentOffer);
                      }}
                    >
                      Submit Offer
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        {sameAddress(currentWallet, itemDetails.ownerAddress) ? (
          <>
            <button id="makeOffer" className="btn" onClick={onDelist}>
              DeList
            </button>
          </>
        ) : null}
      </CardBody>
    </CardNftWrapper>
  );
};

export default ListedFixedNft;
