import { getCurrentWalletConnected } from "../../utils/blockchainInteractor";
import { sameAddress } from "../../utils/walletUtils";

const CardBody = ({ title, price, ownerAddress, priceDollar, bestOffer, onAcceptOffer = () => {}, children }) => {
  
  const currentWallet = getCurrentWalletConnected();
  
  return (
    <div class="card-body">
      <div class="card-text">
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
                <button id="makeOffer" class="btn" onClick={onAcceptOffer}>
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
