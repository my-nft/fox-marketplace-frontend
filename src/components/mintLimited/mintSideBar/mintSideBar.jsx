import { FXG_PRICE } from "../../../utils/foxConstantes";
import MintCounter from "../mintCounter/mintCounter";
import placeholder from "../../../assets/images/nft_test.jpg";
import { mintNfts } from "../../../services/listingNft";

const MintSideBar = ({
  price = 0,
  maxForMint,
  minted,
  collection,
  mintAction,
  mintingData = {},
}) => {
  const { mintingEnabled, name } = mintingData;
  
  const handleMinting = async (count) => {
    await mintNfts(count);
  }

  return (
    <div className="sidebar">
      <div className="mintSidebarMain">
        <img
          src={collection.image ? collection.image : placeholder}
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
          <p>{price} FXG</p>
          <p>{parseFloat((price * FXG_PRICE).toFixed(4))} USD</p>
        </div>
      </div>
      <MintCounter
        mintingData={mintingData}
        minted={minted}
        max={maxForMint}
        mintAction={mintAction}
        handleMinting={handleMinting}
      />
    </div>
  );
};

export default MintSideBar;
