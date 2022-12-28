import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentWallet } from "../../redux/userReducer";
import { getAuctionInfos, getPriceByListing } from "../../services/listingNft";
import { AUCTION, FIXED_PRICE } from "../../utils/foxConstantes";
import { sameAddress } from "../../utils/walletUtils";

const MostPopularItem = ({ viewType, item }) => {
  const walletAddress = useSelector(selectCurrentWallet);

  let styleList = {};
  let styleWrappedText = {};

  if (viewType === "CHANGE_FOR_MIN") {
    styleList = {
      width: "calc(100% / 6)",
      minWidth: "230px",
    };
    styleWrappedText = {
      display: "block",
    };
  } else if (viewType === "CHANGE_FOR_MAX") {
    styleList = {
      width: "calc(100% / 8)",
      minWidth: "170px",
    };
    styleWrappedText = {
      display: "block",
    };
  } else if (viewType === "CHANGE_FOR_IMAGE") {
    styleList = {
      width: "calc(100% / 4)",
    };

    styleWrappedText = {
      display: "none",
    };
  }

  const [itemInfos, setItemInfos] = useState({});
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  const init = async () => {
    const infos = await getAuctionInfos(item.auctionId);
    setItemInfos(infos);
  };

  const loadInfoPricing = async () => {
    if (item.listingType === AUCTION) {
      setPrice(
        itemInfos?.currentBidPrice ? itemInfos.currentBidPrice / 10 ** 18 : null
      );
    } else if (item.listingType === FIXED_PRICE) {
      const priceSmt = await getPriceByListing(item.listingId);
      setPrice(priceSmt);
    }
  };

  useEffect(() => {
    loadInfoPricing();
  }, [itemInfos]);

  useEffect(() => {
    init();
  }, []);

  // create time initilizer
  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const toDoubleDigits = (num) => {
    num += "";
    if (num.length === 1) {
      num = "0" + num;
    }
    return num;
  };

  const calculateTimeLeftBeforeExpiration = (expirationDate, dateNow) => {
    const futurDate = new Date(Number(expirationDate * 1000));

    const difference = futurDate - dateNow;
    let timeLeft = {};
    let output = "";

    if (difference > 0) {
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24);

      hours = hours - days * 24;
      minutes = minutes - days * 24 * 60 - hours * 60;
      seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

      timeLeft = {
        days,
        hours,
        minutes,
        seconds,
      };

      if (timeLeft.days > 0) {
        output += toDoubleDigits(timeLeft.days) + "d ";
      }

      if (timeLeft.hours > 0) {
        output += toDoubleDigits(timeLeft.hours) + "h ";
      }

      if (timeLeft.minutes > 0) {
        output += toDoubleDigits(timeLeft.minutes) + "m ";
      }

      if (timeLeft.seconds > 0) {
        output += toDoubleDigits(timeLeft.seconds) + "s";
      }
    } else {
      output = "Expired";
    }

    return output;
  };

  const timeEnd = calculateTimeLeftBeforeExpiration(
    itemInfos?.endAuction,
    dateTime
  );

  return (
    <Link
      to={`/collection/${item.collectionAddress}/${item.tokenID}`}
      className={
        !viewType
          ? "listMostPopular col-3 col-md-4 col-lg-3 nft"
          : "listMostPopular  nft"
      }
      style={styleList}
    >
      <div className="wrapContent">
        <div className="wrapImg">
          <img
            src={item.image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "./assets/images/nft_test.jpg";
            }}
            className="bigImage"
            alt=""
          />
          {sameAddress(item.ownerAddress, walletAddress) && (
            <p className="ownedItem">Owned by you</p>
          )}
        </div>
        <div className="wrappedAllText" style={styleWrappedText}>
          <div className="wrapText bg">
            <div className="nameItem">
              <span className="name">{item.name ? item.name : "-"}</span>
              <span>
                <img
                  src={item.image}
                  style={{ width: "14px" }}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "./assets/images/nft_test.jpg";
                  }}
                />
              </span>
            </div>
          </div>
          {/* <p className="nItem">#{item.id}</p> */}
          <div className="wrapText">
            {(price && timeEnd !== "Expired") ||
            (price && item.listingType === FIXED_PRICE) ? (
              <p>
                <label>Price</label>
                <span className="orange">
                  <b>FXG</b> {price}
                </span>
              </p>
            ) : (
              <p>
                <label>Price</label>
                <span className="orange">
                  <b>FXG</b> -
                </span>
              </p>
            )}
          </div>
          <div className="wrapText">
            <p>
              {item.listingType === AUCTION && (
                <span>
                  {timeEnd === "Expired" ? "Ended" : <>Ends in {timeEnd}</>}
                </span>
              )}
              {item.listingType === FIXED_PRICE && <span>Fixed Price</span>}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MostPopularItem;
