import InfoBoxWrapper from "./infoBoxWrapper";
import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";

const Listings = ({ listings = [] }) => {
  return (
    <InfoBoxWrapper title="Listings">
      <div className="infoBoxGrid infoBoxHeader">
        <p>Price</p>
        <p>USD Price</p>
        <p>Expiration</p>
        <p>From</p>
        <p></p>
      </div>
      {listings.map((listing, index) => {
        return (
          <div className="infoBoxGrid infoRow" key={index}>
            <p>{listing.price} FXG</p>
            <p>${listing.usdPrice}</p>
            <p>{listing.expiration}</p>
            <p>{listing.from}</p>
            <p className="buyButton">Buy</p>
          </div>
        );
      })}
      <div className="listings">
        {listings.length === 0 && (
          <div className="noContent">
            <ContentIcon />
            <p>No Listings Info</p>
          </div>
        )}
      </div>
    </InfoBoxWrapper>
  );
};

export default Listings;
