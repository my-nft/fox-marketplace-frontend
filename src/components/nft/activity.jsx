import InfoBoxWrapper from "./infoBoxWrapper";

import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import Address from "./../Address";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import { EVENT_ENUM } from "../../utils/foxConstantes";
import Spinner from "../Spinner";
import { dateToUserFriendlyValue } from "../datePicker/utils";

const ItemActivity = ({ activity = [], isLoading }) => {
  
  return (
    <InfoBoxWrapper title="Item Activity">
      <div className="activity">
        <div className="infoBoxGrid infoBoxHeader">
          <p>Event</p>
          <p>Price</p>
          <p>From</p>
          <p>To</p>
          <p>Date</p>
        </div>
        {activity.map((event, index) => {
          return (
            <div className="infoBoxGrid infoRow" key={index}>
              <p>{EVENT_ENUM[event.event]}</p>
              <p>{event.price} FXG</p>
              <p>
                {event.fromAddress && (
                  <Address address={event.fromAddress}>
                    {optimizeWalletAddress(event.fromAddress)}
                  </Address>
                )}
              </p>
              <p>
                {event.toAddress && (
                  <Address address={event.toAddress}>
                    {optimizeWalletAddress(event.toAddress)}
                  </Address>
                )}
              </p>
              <p>{dateToUserFriendlyValue(event.date_event)}</p>
            </div>
          );
        })}
        {isLoading && (
          <Spinner>
            <p>Fetching Data</p>
          </Spinner>
        )}
        {activity.length === 0 && (
          <div className="noContent">
            <ContentIcon />
            <p>No Activity Info</p>
          </div>
        )}
      </div>
    </InfoBoxWrapper>
  );
};

export default ItemActivity;
