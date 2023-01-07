import { useState } from "react";

const MintCounter = ({ minted, max }) => {
  const [mintCount, setMintCount] = useState(0);

  const modifyMintCount = (value) => {
    if (mintCount + value >= 0 && mintCount + value <= max - minted) {
      setMintCount(mintCount + value);
    }
  };

  return (
    <div className="mintCounter">
      <h4>MINTING</h4>
      <div className="mintCount">
        <div onClick={() => modifyMintCount(-1)}>
          <span>-</span>
        </div>
        <p>{mintCount}</p>
        <div onClick={() => modifyMintCount(1)}>
          <span>+</span>
        </div>
      </div>
      <button className="mintbutton">Mint</button>

      <div className="mintProgress">
        <div>
          <p>PROGRESS</p>
          <p>
            REMAINING:{" "}
            <span>
              {max - minted} / {max}
            </span>
          </p>
        </div>
        <div className="progress">
          <div
            className="progressValue"
            style={{ width: `${((max - minted) / max) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MintCounter;
