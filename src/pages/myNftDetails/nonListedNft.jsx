import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CardBody from "../../components/nft/CardBody";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { MAKE_OFFER } from "../../saga/blockchain.js/blockChainActions";
import { getBestOffer } from "../../services/listingNft";

const NonListedNft = ({ itemDetails }) => {
  // values
  const [bestOffer, setBestOffer] = useState();
  const [values, setValues] = useState({
    offerPrice: 0,
  });
  const [itemInfo, setItemInfo] = useState();
  const dispatch = useDispatch();

  const handleMakeOffer = (offerPrice) => {
    dispatch({
      type: MAKE_OFFER,
      payload: {
        price: Number(offerPrice),
        tokenID: itemInfo.tokenID,
        collectionAddress: itemInfo.collectionAddress,
      },
      onSuccess: (nft) => setItemInfo(nft),
    });
  };

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const onSubmitForm = async (evt) => {
    evt.preventDefault();
    handleMakeOffer(values.offerPrice);
  };

  const init = async () => {
    if (itemDetails) {
      const bestOfferPrice = await getBestOffer(
        itemInfo.collectionAddress,
        itemInfo.tokenID
      );
      setBestOffer(bestOfferPrice);
    }
  };

  useEffect(() => {
    setItemInfo(itemDetails);
    init();
  }, []);

  return (
    <CardNftWrapper>
      <CardBody bestOffer={bestOffer}>
        <div className="card mt-2" id="fixedPriceDetails">
          <div className="card-body">
            <form id="setPrice">
              <div className="input-group">
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  <label htmlFor="inputAmount">Offer price</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="Amount"
                    id="offerPrice"
                    name="offerPrice"
                    onChange={handleChange}
                    value={values.offerPrice}
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
                Make offer
              </button>
            </form>
          </div>
        </div>
      </CardBody>
    </CardNftWrapper>
  );
};

export default NonListedNft;
