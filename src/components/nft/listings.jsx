import InfoBoxWrapper from "./infoBoxWrapper";
import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import { FXG_PRICE } from "../../utils/foxConstantes";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import Address from "../Address";
import Transaction from "../Transaction";
import Spinner from "../Spinner";
import { dateToUserFriendlyValue } from "../datePicker/utils";

const Listings = ({ itemExtra = [], isLoading }) => {
  return (
    <InfoBoxWrapper title="Listings">
      <div className="infoBoxGrid infoBoxHeader">
        <p>Price</p>
        <p>USD Price</p>
        <p>Creation</p>
        <p>From</p>
        <p>Transaction</p>
      </div>
      {itemExtra.map((listing, index) => {
        return (
          <div className="infoBoxGrid infoRow" key={index}>
            <p>{parseFloat(listing.price.toFixed(4))} FXG</p>
            <p>${parseFloat((Number(listing.price) * FXG_PRICE).toFixed(4))}</p>
            <p>{dateToUserFriendlyValue(listing.date_event)}</p>
            <p>
              {listing.fromAddress && (
                <Address address={listing.fromAddress}>
                  {optimizeWalletAddress(listing.fromAddress)}
                </Address>
              )}
            </p>
            <p>
              <Transaction address={listing.transactionId}>
                {optimizeWalletAddress(listing.transactionId)}
              </Transaction>
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
          <p>No Listings Info</p>
        </div>
      )}
    </InfoBoxWrapper>
  );
};

export default Listings;
