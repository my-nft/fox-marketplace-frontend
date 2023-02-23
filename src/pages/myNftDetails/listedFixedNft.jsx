import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardBody from "../../components/nft/CardBody";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { selectCurrentWallet } from "../../redux/userReducer";
import {
  BUY_NFT,
  DELIST_ITEM,
} from "../../saga/blockchain.js/blockChainActions";
import { getBestOffer, getPriceByListing } from "../../services/listingNft";
import { sameAddress } from "../../utils/walletUtils";

const ListedFixedNft = ({
  nftDetails,
  setNftDetails,
  collectionDetails,
  onMakeOffer,
  onAcceptOffer,
  onWithdrawOffer,
}) => {
  const currentWallet = useSelector(selectCurrentWallet);

  const [currentPrice, setCurrentPrice] = useState();
  const [currentOffer, setCurrentOffer] = useState(0);
  const [bestOffer, setBestOffer] = useState(undefined);
  const [showMakeOffer, setShowMakeOffer] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    setCurrentOffer(evt.target.value);
  };

  // TODO: add support for quantity

  const onBuyItem = async (price) => {
    const { royaltyAddress, royaltyPercent } = collectionDetails;
    dispatch({
      type: BUY_NFT,
      payload: {
        listingId: nftDetails.listingId,
        price: Number(price),
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        royaltyAddress: royaltyAddress
          ? royaltyAddress
          : collectionDetails.ownerAddress,
        royaltyPercent: royaltyPercent ? royaltyPercent : 0,

        from: currentWallet,
        to: nftDetails.collectionAddress,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onDelist = async () => {
    dispatch({
      type: DELIST_ITEM,
      payload: {
        listingId: nftDetails.listingId,
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,

        from: currentWallet,
        to: undefined,
        price: Number(currentPrice),
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const init = async () => {
    console.log("NFT DETAILS", nftDetails);
    const cPrice = await getPriceByListing(nftDetails.listingId);

    const bestOfferPrice = await getBestOffer(
      nftDetails.collectionAddress,
      nftDetails.tokenID
    );
    setCurrentPrice(cPrice);
    setBestOffer(bestOfferPrice);
  };

  useEffect(() => {
    init();
  }, [nftDetails]);

  const handleQuantityChange = (value) => {
    if (value < 0 && quantity > 1) {
      setQuantity(quantity + value);
      return;
    }

    if (value > 0 && quantity < 25) {
      setQuantity(quantity + value);
    }
  };

  return (
    <CardNftWrapper>
      <CardBody
        title={"Current Price"}
        price={currentPrice}
        priceDollar={currentPrice}
        bestOffer={bestOffer}
        onAcceptOffer={onAcceptOffer}
        onWithdrawOffer={onWithdrawOffer}
        ownerAddress={nftDetails.ownerAddress}
      >
        {
          // TODO: add support erc 1155 display noly
        }

        {true && (
          <div className="quantity-entry">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span></span>
            <p>{quantity}</p>
            <span></span>
            <button onClick={() => handleQuantityChange(+1)}>+</button>
          </div>
        )}
        {!sameAddress(currentWallet, nftDetails.ownerAddress) && (
          <>
            <button
              id="buyItem"
              className="btn buyActionButtton"
              disabled={!currentPrice}
              onClick={() => onBuyItem(currentPrice)}
            >
              Buy item
            </button>
            <button
              id="makeOffer"
              className="btn buyActionButtton"
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

        {sameAddress(currentWallet, nftDetails.ownerAddress) ? (
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
