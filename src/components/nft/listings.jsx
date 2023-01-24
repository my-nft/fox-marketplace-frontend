import InfoBoxWrapper from "./infoBoxWrapper";
import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import { EVENT_ENUM, FXG_PRICE } from "../../utils/foxConstantes";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import Address from "../Address";
import Transaction from "../Transaction";
import Spinner from "../Spinner";
import { dateToUserFriendlyValue } from "../datePicker/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const Listings = ({ itemExtra = [], isLoading }) => {
  const [dataForRender, setDataForRender] = useState(itemExtra.slice(0, 8));
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (dataForRender.length >= itemExtra.length) {
      setHasMore(false);
    }
  }, [dataForRender]);

  const updateAction = () => {
    setDataForRender(itemExtra.slice(0, dataForRender.length + 8));
  };

  console.log("############");
  console.log(itemExtra);
  return (
    <InfoBoxWrapper title="Listings">
      <div className="infoBoxGrid infoBoxHeader">
        <p>Event</p>
        <p>Price</p>
        <p>USD Price</p>
        <p>Creation</p>
        <p>From</p>
        <p>Transaction</p>
      </div>
      {itemExtra.length > 0 && (
        <InfiniteScroll
          dataLength={itemExtra.length}
          next={updateAction}
          loader={<Spinner />}
          hasMore={hasMore}
          height={400}
        >
          {itemExtra.map((listing, index) => {
            return (
              <div className="infoBoxGrid infoRow" key={index}>
                <p>{EVENT_ENUM[listing.event]}</p>
                <p>{parseFloat(listing.price.toFixed(4))} FXG</p>
                <p>
                  ${parseFloat((Number(listing.price) * FXG_PRICE).toFixed(4))}
                </p>
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
        </InfiniteScroll>
      )}
      {/* {itemExtra.map((listing, index) => {
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
      })} */}
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
