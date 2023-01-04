import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardBody from "../../components/nft/CardBody";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { selectCurrentWallet } from "../../redux/userReducer";
import {
  ACCEPT_OFFER,
  BUY_NFT,
  DELIST_ITEM,
  MAKE_OFFER,
} from "../../saga/blockchain.js/blockChainActions";
import { getBestOffer, getPriceByListing } from "../../services/listingNft";
import { sameAddress } from "../../utils/walletUtils";

const ListedFixedNft = ({ itemDetails, collectionDetails }) => {
  const currentWallet = useSelector(selectCurrentWallet);

  const [itemInfos, setItemInfos] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [currentOffer, setCurrentOffer] = useState(0);
  const [bestOffer, setBestOffer] = useState(undefined);
  const [showMakeOffer, setShowMakeOffer] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    setCurrentOffer(evt.target.value);
  };

  const onBuyItem = async (price) => {
    const { royaltyAddress, royaltyPercent } = collectionDetails;
    dispatch({
      type: BUY_NFT,
      payload: {
        listingId: itemDetails.listingId,
        price: Number(price),
        tokenID: itemDetails.tokenID,
        collectionAddress: itemDetails.collectionAddress,
        royaltyAddress: royaltyAddress
          ? royaltyAddress
          : collectionDetails.ownerAddress,
        royaltyPercent: royaltyPercent ? royaltyPercent : 0,
      },
      onSuccess: (nft) => setItemInfos(nft),
    });
  };

  const onMakeOffer = (offerPrice) => {
    dispatch({
      type: MAKE_OFFER,
      payload: {
        price: Number(offerPrice),
        tokenID: itemDetails.tokenID,
        collectionAddress: itemDetails.collectionAddress,
      },
      onSuccess: (nft) => setItemInfos(nft),
    });
  };

  const onDelist = async () => {
    dispatch({
      type: DELIST_ITEM,
      payload: {
        listingId: itemDetails.listingId,
        tokenID: itemDetails.tokenID,
        collectionAddress: itemDetails.collectionAddress,
      },
      onSuccess: (nft) => setItemInfos(nft),
    });
  };

  const onAcceptOffer = () => {
    const { royaltyAddress, royaltyPercent } = collectionDetails;
    dispatch({
      type: ACCEPT_OFFER,
      payload: {
        tokenID: itemInfos.tokenID,
        collectionAddress: itemInfos.collectionAddress,
        royaltyAddress: royaltyAddress
          ? royaltyAddress
          : collectionDetails.ownerAddress,
        royaltyPercent: royaltyPercent ? royaltyPercent : 0,
      },
      onSuccess: (nft) => setItemInfos(nft),
    });
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
    setItemInfos(itemDetails);
    init();
  }, [itemDetails]);

  return (
    <CardNftWrapper>
      <CardBody
        title={"Current Price"}
        price={currentPrice}
        priceDollar={currentPrice}
        bestOffer={bestOffer}
        onAcceptOffer={onAcceptOffer}
        ownerAddress={itemInfos.ownerAddress}
      >
        {!sameAddress(currentWallet, itemInfos.ownerAddress) && (
          <>
            <button
              id="buyItem"
              className="btn"
              disabled={!currentPrice}
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

        {sameAddress(currentWallet, itemInfos.ownerAddress) ? (
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
