import InfoBoxWrapper from "./infoBoxWrapper";
import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";

const Offers = ({ offers = [] }) => {
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
        {offers.map((offer, index) => {
          return (
            <div className="infoBoxGrid infoRow" key={index}>
              <p>{offer.price} FXG</p>
              <p>${offer.usdPrice}</p>
              <p>{offer.floorDifference}</p>
              <p>{offer.expiration}</p>
              <p>{offer.from}</p>
            </div>
          );
        })}
        {offers.length === 0 && (
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
