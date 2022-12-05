import { useNavigate } from "react-router-dom";

const MostPopularItem = ({ viewType, item, onSelectNfts = () => {} }) => {
  const navigate = useNavigate();

  let styleList = {};
  let styleWrappedText = {};

  if (viewType === "CHANGE_FOR_MIN") {
    console.log("CHANGE_FOR_MIN");
    styleList = {
      width: "calc(100% / 6)",
      minWidth: "230px",
    };
    styleWrappedText = {
      display: "block",
    };
  } else if (viewType === "CHANGE_FOR_MAX") {
    console.log("CHANGE_FOR_MAX");
    styleList = {
      width: "calc(100% / 8)",
      minWidth: "170px",
    };
    styleWrappedText = {
      display: "block",
    };
  } else if (viewType === "CHANGE_FOR_IMAGE") {
    console.log("CHANGE_FOR_IMAGE");
    styleList = {
      width: "calc(100% / 4)",
    };

    styleWrappedText = {
      display: "none",
    };
  }

  console.log(styleWrappedText);
  console.log(styleList);

  const calculateTimeLeftBeforeExpiration = (expirationDate) => {
    const difference = new Date(expirationDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    let output = "";
    if (timeLeft.days > 0) {
      output += timeLeft.days + " days";
    } else if (timeLeft.hours > 0) {
      output += timeLeft.hours + " hours";
    } else if (timeLeft.minutes > 0) {
      output += timeLeft.minutes + " minutes";
    } else if (timeLeft.seconds > 0) {
      output += timeLeft.seconds + " seconds";
    } else {
      output = "Expired";
    }

    return output;
  };

  console.log("Time left: ", calculateTimeLeftBeforeExpiration(item.soldDate));

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
                193{" "}
                <img
                  src="./assets/images/marketplace/Iconmonstr-favorite-2-16_orange.jpg"
                  style={{ width: "14px" }}
                  alt=""
                />
              </span>
            </div>
          </div>
          <p className="nItem">#{item.id}</p>
          <div className="wrapText">
            <p>
              <label>Price</label>
              <span className="orange">
                <b>f(x)</b> 42.68K
              </span>
            </p>
            <p>
              <span>
                {/*Ends in {calculateTimeLeftBeforeExpiration(new Date())}*/}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPopularItem;
