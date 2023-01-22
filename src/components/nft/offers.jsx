import InfoBoxWrapper from "./infoBoxWrapper";
import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import { EVENT_ENUM, FXG_PRICE } from "../../utils/foxConstantes";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import Address from "./../Address";
import Spinner from "../Spinner";
import { dateToUserFriendlyValue } from "../datePicker/utils";
import Transaction from "../Transaction";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const Offers = ({ itemExtra = [], isLoading }) => {
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

  return (
    <InfoBoxWrapper title={"Offers"}>
      <div className="offers">
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
            height={300}
          >
            {itemExtra.map((offer, index) => {
              return (
                <div className="infoBoxGrid infoRow" key={index}>
                   <p>{EVENT_ENUM[offer.event]}</p>
                  <p>{parseFloat(offer.price.toFixed(4))} FXG</p>
                  <p>
                    ${parseFloat((Number(offer.price) * FXG_PRICE).toFixed(4))}
                  </p>
                  <p>{dateToUserFriendlyValue(offer.date_event)}</p>
                  <p>
                    {offer.fromAddress && (
                      <Address address={offer.fromAddress}>
                        {optimizeWalletAddress(offer.fromAddress)}
                      </Address>
                    )}
                  </p>
                  <p>
                    <Transaction address={offer.transactionId}>
                      {optimizeWalletAddress(offer.transactionId)}
                    </Transaction>
                  </p>
                </div>
              );
            })}
          </InfiniteScroll>
        )}

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
