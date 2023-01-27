import { useEffect } from "react";
import { useState } from "react";
import { cps } from "redux-saga/effects";

const MintCounter = ({mintAction, mintingData, handleMinting }) => {

  const [mintingDataState, setMintingDataState] = useState(mintingData);

  const [mintCount, setMintCount] = useState(0);

  useEffect(()=> {
    setMintingDataState(mintingData);
  }, [mintingData])

  const max = Number(mintingDataState.maxPerTransaction);
  const minted = Number(mintingDataState.totalSupply);
  const maxToMint = Number(mintingDataState.maxToMint);


  const modifyMintCount = (value) => {
    if (mintCount + value >= 0 && mintCount + value <= max) {
      setMintCount(mintCount + value);
    }
  };

  const mint = () => {
    if (mintCount > 0) handleMinting(mintCount);
  };

  return (
    <div className="mintCounter">
      <h4>MINTING</h4>
      <div className="mintCount">
        <button disabled={mintCount <= 0} onClick={() => modifyMintCount(-1)}>
          <span>-</span>
        </button>
        <p>{mintCount}</p>
        <button disabled={mintCount >= max} onClick={() => modifyMintCount(1)}>
          <span>+</span>
        </button>
      </div>
      <button
        disabled={mintCount >= max || mintCount <= 0}
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
              {maxToMint - minted} / {maxToMint}
            </span>
          </p>
        </div>
        <div className="progress">
          <div
            className="progressValue"
            style={{ width: `${( 100 - ((maxToMint - minted) / maxToMint) * 100 ) }%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MintCounter;
