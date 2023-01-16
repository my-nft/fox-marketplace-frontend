import InfoBoxWrapper from "./infoBoxWrapper";
import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import { FXG_PRICE } from "../../utils/foxConstantes";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import Address from "../Address";
import Spinner from "../Spinner";

const Listings = ({ itemExtra = [], isLoading }) => {
  return (
    <InfoBoxWrapper title="Listings">
      <div className="infoBoxGrid infoBoxHeader">
        <p>Price</p>
        <p>USD Price</p>
        <p>Expiration</p>
        <p>From</p>
        <p></p>
      </div>
      {itemExtra.map((listing, index) => {
        return (
          <div className="infoBoxGrid infoRow" key={index}>
            <p>{parseFloat(listing.price.toFixed(4))} FXG</p>
            <p>${parseFloat((Number(listing.price) * FXG_PRICE).toFixed(4))}</p>
            <p>{listing.expiration}</p>
            <p>
              {listing.fromAddress && (
                <Address address={listing.fromAddress}>
                  {optimizeWalletAddress(listing.fromAddress)}
                </Address>
              )}
            </p>
            <p className="buyButton">Buy</p>
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
          <p>No Listings Info</p>
        </div>
      )}
    </InfoBoxWrapper>
  );
};

export default Listings;
