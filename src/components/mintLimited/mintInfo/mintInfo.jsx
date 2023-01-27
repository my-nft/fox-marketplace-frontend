import { ReactComponent as TelegramIcon } from "../../../assets/icons/telegram.svg";
import { ReactComponent as WebIcon } from "../../../assets/icons/web.svg";
import { ReactComponent as MediumIcon } from "../../../assets/icons/medium.svg";

const MintInfo = ({ collection = {}, mintingData={} }) => {
  return (
    <div className="mintInfo">
      <h3>Ongoing Project</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod delectus,
        incidunt quia, esse laboriosam repellat amet saepe aperiam id enim
        accusantium assumenda sunt eius fugit dolor ut pariatur sequi ab!
      </p>
      <div className="infoSocials">
        <a href={collection?.linkTelegram ? collection.linkTelegram : "#"}>
          <TelegramIcon />
        </a>
        <a href={collection?.linkWeb ? collection.linkWeb : "#"}>
          <WebIcon />
        </a>
        <a href={collection?.linkMedium ? collection.linkMedium : "#"}>
          <MediumIcon />
        </a>
      </div>
      <div className="mintCollectionDetails">
        <h3>Collection Details</h3>
        <p className="highlightLine">
          Access Type: <span>Public</span>
        </p>
        <p className="highlightLine">
          Total Supply: <span>{mintingData.totalSupply}</span>
        </p>
        <p className="highlightLine">
          Collection Name: <span>{mintingData.name}</span>
        </p>
        <p className="highlightLine">
          Collection Symbol: <span>{mintingData.symbol}</span>
        </p>
      </div>
      <div className="tokenInfo">
        <h3>Token</h3>
        <p className="highlightLine">
          Smart Contract Standart: <span>ERC-721</span>
        </p>
        <p className="highlightLine">
          Type: <span>Non-Fungible Token</span>
        </p>
        <p className="highlightLine">
          Staking Rewards:{" "}
          <span>
            10% staking rewards $POWPAD tokens in the NFTs staking pools Staking
            rewards from every upcoming IDO tokens
          </span>
        </p>
        <p className="highlightLine">
          Random Lottery Pool 1 Times a Week: <br />
          <span>
            15% $POWSWAP of the Reward/Dev wallet to 5 random NFT stakers.{" "}
            <br />
            15% $POWSWAP of the Reward/Dev wallet to 10 $POWSWAP stakers. <br />
            All purchases on POWPAD Platfrom will be done with $ETHWPOWCLONES
            INO sale 15% of the $ETHW buyback $POWPAD and sent to the burning
            address. <br />
            All NFT sales on the INO platform 2% $ETHW will be used for buyback
            $POWPAD and sent to burning address.
          </span>
        </p>
      </div>
    </div>
  );
};

export default MintInfo;
