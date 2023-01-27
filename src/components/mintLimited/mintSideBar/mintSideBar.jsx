import { useState } from "react";
import { FXG_PRICE, FX_PRICE } from "../../../utils/foxConstantes";
import MintCounter from "../mintCounter/mintCounter";

const MintSideBar = ({
  mintAction,
  mintingData = {},
  handleMinting = () => {}
}) => {
  const { mintingEnabled, name, mintFee } = mintingData;
  const [total, setTotal] = useState(0);
  const price = Number(total) * Number(mintFee / 10**18);


  return (
    <div className="sidebar">
      <div className="mintSidebarMain">
        <img
          src={"https://foxchangechachinglayer.s3.amazonaws.com/bucketFolder/1673008109763"}
          alt="fox"
        />
        <h3>Title</h3>
        <h5>{name}</h5>
        {mintingEnabled ? (
          <p className={"mintStatus enabled"}>Enabled</p>
        ) : (
          <p className={"mintStatus closed"}>Closed</p>
        )}
      </div>
      <div>
        <div className="whitelist whitelistOpen">
          <p>✔ No whitelisting required</p>
        </div>
        <div className="mintPrice">
          <p>{price} FX</p>
          <p>{parseFloat((price * FX_PRICE).toFixed(4))} USD</p>
        </div>
      </div>
      <MintCounter
        mintingData={mintingData}
        mintAction={mintAction}
        handleMinting={handleMinting}
        setTotal={setTotal}
      />
    </div>
  );
};

export default MintSideBar;
