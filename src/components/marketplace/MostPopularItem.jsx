import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cps } from "redux-saga/effects";
import { LOAD_NFT_DETAIL } from "../../saga/actions";
import { getAuctionInfos } from "../../services/listingNft";

const MostPopularItem = ({ viewType, item }) => {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const init = async () => {
    const infos = await getAuctionInfos(item.auctionId - 1);
    setItemInfos(infos);
  };

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

  const onSelectNfts = () => {
    dispatch({
      type : LOAD_NFT_DETAIL,
      payload : {
        collectionAddress : item.collectionAddress,
        tokenID : item.tokenID
      }
    });
    navigate('/my-nft')
  }

  const calculateTimeLeftBeforeExpiration = (expirationDate, dateNow) => {
    const futurDate = new Date(0);
    futurDate.setUTCSeconds(expirationDate);
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
        output += timeLeft.days + "d";
      }

      if (timeLeft.hours > 0) {
        output += timeLeft.hours + "h";
      }

      if (timeLeft.minutes > 0) {
        output += timeLeft.minutes + "m";
      }

      if (timeLeft.seconds > 0) {
        output += timeLeft.seconds + "s";
      }
    } else {
      output = "Expired";
    }

    return output;
  };

  return (
    <div
      className={
        !viewType ? "listMostPopular col-md-4 col-lg-3" : "listMostPopular"
      }
      onClick={() => onSelectNfts(item.tokenID)}
      style={styleList}
    >
      <div className="wrapContent">
        <div className="wrapImg">
          <img src={item.image} className="bigImage" alt="" />
        </div>
        <div className="wrappedAllText" style={styleWrappedText}>
          <div className="wrapText bg">
            <div className="nameItem">
              <span className="name">{item.name}</span>
              <span>
                193 <img src={item.image} style={{ width: "14px" }} />
              </span>
            </div>
          </div>
          <p className="nItem">#{item.id}</p>
          <div className="wrapText">
            <p>
              <label>Price</label>
              <span className="orange">
                <b>f(x)</b>{" "}
                {itemInfos?.currentBidPrice
                  ? itemInfos.currentBidPrice / 10 ** 18
                  : null}
              </span>
            </p>
            <p>
              <span>
                Ends in{" "}
                {calculateTimeLeftBeforeExpiration(
                  itemInfos?.endAuction,
                  dateTime
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPopularItem;
