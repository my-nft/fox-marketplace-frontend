import { useState } from "react";
import { FXG_PRICE, FX_PRICE } from "../../../utils/foxConstantes";
import MintCounter from "../mintCounter/mintCounter";

const MintSideBar = ({
  mintAction,
  mintingData = {},
  handleMinting = () => {},
}) => {
  const { mintingEnabled, name, mintFee, whitelistingEnabled } = mintingData;
  const [total, setTotal] = useState(0);
  const price = Number(total) * Number(mintFee / 10 ** 18);

  return (
    <div className="sidebar">
      <div className="mintSidebarMain">
        <img
          src={
            "https://foxchangechachinglayer.s3.amazonaws.com/bucketFolder/1673008109763"
          }
          alt="fox"
        />
        <a
          target="_blank"
          href="https://marketplace.foxchange.io/collection/0x9E4df6f08ceEcfEF170FCbF036B97789d5320ec3"
        >
          {name}
        </a>
        {mintingEnabled ? (
          <p className={"mintStatus enabled"}>Minting Open</p>
        ) : (
          <p className={"mintStatus closed"}>Minting Closed</p>
        )}
      </div>
      {!whitelistingEnabled && (
        <div>
          <div className="whitelist whitelistOpen">
            <p>✔ No whitelisting required</p>
          </div>
        </div>
      )}
      <div className="mintPrice">
        <p>{parseFloat(price.toFixed(4))} FX</p>
        <p>{parseFloat((price * FX_PRICE).toFixed(4))} USD</p>
      </div>
      {whitelistingEnabled && (
        <div>
          <div className="whitelist whitelistClosed">
            <p>⚠ Whitelisting required</p>
          </div>
        </div>
      )}

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
