import { useEffect } from "react";
import { useState } from "react";
import { cps } from "redux-saga/effects";

const MintCounter = ({ mintAction, mintingData, handleMinting, isMinting }) => {
  const [mintingDataState, setMintingDataState] = useState(mintingData);

  const [mintCount, setMintCount] = useState(0);

  useEffect(() => {
    setMintingDataState(mintingData);
  }, [mintingData]);

  const max = Number(mintingDataState.maxPerTransaction);
  const minted = Number(mintingDataState.totalSupply);
  const maxToMint = Number(mintingDataState.maxToMint);

  console.log(mintingDataState);

  const modifyMintCount = (value) => {
    if (mintCount + value >= 0 && mintCount + value <= max) {
      setMintCount(mintCount + value);
    }
  };

  const mint = () => {
    if (mintCount > 0) {
      handleMinting(mintCount);
      setMintCount(0);
    }
  };

  return (
    <div className="mintCounter">
      <h4>MINTING</h4>
      <div className="mintCount">
        <button
          disabled={mintCount <= 0 || isMinting}
          onClick={() => modifyMintCount(-1)}
        >
          <span>-</span>
        </button>
        <p>{mintCount}</p>
        <button
          disabled={mintCount >= max || isMinting}
          onClick={() => modifyMintCount(1)}
        >
          <span>+</span>
        </button>
      </div>
      <button
        disabled={mintCount >= max || mintCount <= 0 || isMinting}
        className="mintbutton"
        onClick={() => mint()}
      >
        {isMinting ? "Minting in progress..." : "Mint"}
      </button>

      <div className="mintProgress">
        <div>
          <p>PROGRESS</p>
          <p>
            REMAINING:{" "}
            <span>
              {maxToMint - minted} / {maxToMint}
            </span>
          </p>
        </div>
        <div className="progress">
          <div
            className="progressValue"
            style={{
              width: `${100 - ((maxToMint - minted) / maxToMint) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MintCounter;
