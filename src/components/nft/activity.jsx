import InfoBoxWrapper from "./infoBoxWrapper";

import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import Address from "./../Address";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import { EVENT_BUY_LISTING, EVENT_ENUM } from "../../utils/foxConstantes";
import Spinner from "../Spinner";
import { dateToUserFriendlyValue } from "../datePicker/utils";
import Transaction from "../Transaction";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const ItemActivity = ({ activity = [], isLoading }) => {
  const [dataForRender, setDataForRender] = useState(activity.slice(0, 8));
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (dataForRender.length >= activity.length) {
      setHasMore(false);
    }
  }, [dataForRender]);

  const updateAction = () => {
    setDataForRender(activity.slice(0, dataForRender.length + 8));
  };

  return (
    <InfoBoxWrapper title="Item Activity">
      <div className="activity ">
        <div className="infoBoxGrid infoBoxHeader">
          <p>Event</p>
          <p>Price</p>
          <p>From</p>
          <p>To</p>
          <p>Date</p>
          <p>Transaction</p>
        </div>
        {activity.length > 0 && (
          <InfiniteScroll
            dataLength={dataForRender.length}
            next={updateAction}
            loader={<Spinner />}
            hasMore={hasMore}
            height={400}
          >
            {dataForRender.map((event, index) => {
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
                  <p>
                    <Transaction address={event.transactionId}>
                      {optimizeWalletAddress(event.transactionId)}
                    </Transaction>
                  </p>
                </div>
              );
            })}
          </InfiniteScroll>
        )}

        {/* {activity.map((event, index) => {
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
              <p>
                <Transaction address={event.transactionId}>
                  {optimizeWalletAddress(event.transactionId)}
                </Transaction>
              </p>
            </div>
          );
        })} */}
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
