import InfoBoxWrapper from "./infoBoxWrapper";

import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import Address from "./../Address";
import { optimizeWalletAddress } from "../../utils/walletUtils";

const ItemActivity = ({
  activity = [
    {
      event: "Minted",
      price: "15",
      from: "0x0000000000000000000000000000000000000000",
      to: "!0x0000000000000000000000000000000000000000",
      date: "2021-09-01T00:00:00.000Z",
    },
  ],
}) => {
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
              <p>{event.event}</p>
              <p>{event.price} FXG</p>
              <p>
                <Address address={event.from}>
                  {optimizeWalletAddress(event.from)}
                </Address>
              </p>
              <p>
                <Address address={event.to}>
                  {optimizeWalletAddress(event.to)}
                </Address>
              </p>
              <p>{dateToUserFriendlyValue(event.date)}</p>
            </div>
          );
        })}
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
