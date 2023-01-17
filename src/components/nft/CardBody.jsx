import { useSelector } from "react-redux";
import { selectCurrentWallet } from "../../redux/userReducer";
import { FXG_PRICE } from "../../utils/foxConstantes";
import { sameAddress } from "../../utils/walletUtils";

const CardBody = ({
  title,
  price,
  ownerAddress,
  priceDollar,
  bestOffer,
  onAcceptOffer = () => {},
  children,
}) => {
  const currentWallet = useSelector(selectCurrentWallet);

  return (
    <div className="card-body">
      <div className="card-text">
        <h3>{title}</h3>
        {price ? (
          <p id="price">
            ${parseFloat((price).toFixed(4))} FXG
            <span id="priceDollar">
              ${parseFloat((Number(priceDollar) * FXG_PRICE).toFixed(4))}
            </span>
          </p>
        ) : null}

        {bestOffer ? (
          <>
            <h5>Best offer</h5>
            <p id="price">
              {bestOffer.price} FXG
              <span id="priceDollar">
                ${parseFloat((Number(bestOffer.price) * FXG_PRICE).toFixed(4))}
              </span>
            </p>
            {sameAddress(currentWallet, ownerAddress) ? (
              <button id="makeOffer" className="btn" onClick={() => onAcceptOffer(bestOffer)}>
                Accept Offer
              </button>
            ) : null}
          </>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default CardBody;
