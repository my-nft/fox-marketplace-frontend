import InfoBoxWrapper from "./infoBoxWrapper";

import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import Address from "./../Address";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import { EVENT_ENUM } from "../../utils/foxConstantes";
import Spinner from "../Spinner";

const ItemActivity = ({ activity, isLoading }) => {
  const dateToUserFriendlyValue = (date) => {
    const difference = new Date().getTime() - new Date(date).getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;
    if (months < 12) return `${months} months ago`;
    return `${years} years ago`;
  };
  console.log(activity);
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
