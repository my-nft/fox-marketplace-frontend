import InfoBoxWrapper from "./infoBoxWrapper";
import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import { FXG_PRICE } from "../../utils/foxConstantes";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import Address from "./../Address";
import Spinner from "../Spinner";

const Offers = ({ itemExtra, isLoading }) => {
  return (
    <InfoBoxWrapper title={"Offers"}>
      <div className="offers">
        <div className="infoBoxGrid infoBoxHeader">
          <p>Price</p>
          <p>USD Price</p>
          <p>Floor Difference</p>
          <p>Expiration</p>
          <p>From</p>
        </div>
        {itemExtra.map((offer, index) => {
          return (
            <div className="infoBoxGrid infoRow" key={index}>
              <p>{parseFloat(offer.price.toFixed(4))} FXG</p>
              <p>${parseFloat((Number(offer.price) * FXG_PRICE).toFixed(4))}</p>
              <p>{offer.floorDifference}</p>
              <p>{offer.expiration}</p>
              <p>
                {offer.fromAddress && (
                  <Address address={offer.fromAddress}>
                    {optimizeWalletAddress(offer.fromAddress)}
                  </Address>
                )}
              </p>
            </div>
          );
        })}
        {isLoading && (
          <Spinner>
            <p>Fetching Data</p>
          </Spinner>
        )}
        {itemExtra.length === 0 && (
          <div className="noContent">
            <ContentIcon />
            <p>No Offers Info</p>
          </div>
        )}
      </div>
    </InfoBoxWrapper>
  );
};

export default Offers;
