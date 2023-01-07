import { FXG_PRICE } from "../../../utils/foxConstantes";
import Countdown from "../../Countdown";
import MintCounter from "../mintCounter/mintCounter";
import placeholder from "../../../assets/images/nft_test.jpg";

const MintSideBar = ({ price = 0 }) => {
  return (
    <div className="sidebar">
      <div className="mintSidebarMain">
        <img src={placeholder} alt="fox" />
        <h3>Title</h3>
        <h5>Collection Name</h5>
        <p className="mintStatus closed">Closed</p>
      </div>
      <div>
        <div className="whitelist whitelistOpen">
          <p>✔ No whitelisting required</p>
        </div>
        <div className="countdownWrapper">
          <p>Sale Countdown</p>
          <Countdown date="2023-01-15T00:00:00" endMessage={"Sale Open"} />
          <p className="participate">How to participate</p>
        </div>
        <div className="mintPrice">
          <p>{price} FXG</p>
          <p>{parseFloat((price * FXG_PRICE).toFixed(4))} USD</p>
        </div>
      </div>
      <MintCounter minted={0} max={2500} />
    </div>
  );
};

export default MintSideBar;
