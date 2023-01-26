import { useState } from "react";

const MintCounter = ({ minted, max, mintAction }) => {
  const [mintCount, setMintCount] = useState(0);

  const modifyMintCount = (value) => {
    if (mintCount + value >= 0 && mintCount + value <= max - minted) {
      setMintCount(mintCount + value);
    }
  };

  const mint = () => {
    if (mintCount > 0) mintAction(mintCount);
    setMintCount(0);
  };

  return (
    <div className="mintCounter">
      <h4>MINTING</h4>
      <div className="mintCount">
        <button disabled={minted >= max} onClick={() => modifyMintCount(-1)}>
          <span>-</span>
        </button>
        <p>{mintCount}</p>
        <button disabled={minted >= max} onClick={() => modifyMintCount(1)}>
          <span>+</span>
        </button>
      </div>
      <button
        disabled={minted >= max}
        className="mintbutton"
        onClick={() => mint()}
      >
        Mint
      </button>

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
