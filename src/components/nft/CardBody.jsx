import { getCurrentWalletConnected } from "../../utils/blockchainInteractor";
import { sameAddress } from "../../utils/walletUtils";

const CardBody = ({ title, price, ownerAddress, priceDollar, bestOffer, onAcceptOffer = () => {}, children }) => {
  
  const currentWallet = getCurrentWalletConnected();
  
  return (
    <div className="card-body">
      <div className="card-text">
        <h3>{title}</h3>
        {price ? (
          <p id="price">
            {price} <span id="priceDollar">${priceDollar}</span>
          </p>
        ) : null}

        {bestOffer ? (
          <>
            <h5>Best offer</h5>
            <p id="price">
              {bestOffer} <span id="priceDollar">${bestOffer}</span>
            </p>
            {
              sameAddress(currentWallet, ownerAddress) ? (
                <button id="makeOffer" className="btn" onClick={onAcceptOffer}>
              Accept Offer
            </button>
              ) : null
            }
            
          </>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default CardBody;
