import { ReactComponent as TelegramIcon } from "../../../assets/icons/telegram.svg";
import { ReactComponent as WebIcon } from "../../../assets/icons/web.svg";
import { ReactComponent as MediumIcon } from "../../../assets/icons/medium.svg";

const MintInfo = ({ collection = {}, mintingData = {} }) => {
  console.log(mintingData);
  return (
    <div className="mintInfo">
      <h3>Ongoing Project</h3>
      <p>
        Fox Gaming is a multichain-focused project. We developed an NFT
        Marketplace with an integrated INO platform, codeless NFT
        Projectbuilder, and providing high-quality utility collectibles.
      </p>
      <div className="infoSocials">
        <a
          target="_blank"
          href={collection?.linkTelegram ? collection.linkTelegram : "#"}
        >
          <TelegramIcon />
        </a>
        <a
          target="_blank"
          href={collection?.linkWeb ? collection.linkWeb : "#"}
        >
          <WebIcon />
        </a>
        <a
          target="_blank"
          href={collection?.linkMedium ? collection.linkMedium : "#"}
        >
          <MediumIcon />
        </a>
      </div>
      <div className="mintCollectionDetails">
        <h3>Collection Details</h3>
        <p className="highlightLine">
          Access Type:{" "}
          <span>
            {mintingData?.whitelistingEnabled ? "Whitelist" : "Public"}
          </span>
        </p>
        <p className="highlightLine">
          Total Supply: <span>{mintingData.totalSupply}</span>
        </p>
        <p className="highlightLine">
          Collection Name:{" "}
          <a
            target="_blank"
            href="https://starscan.io/evm/address/0x9E4df6f08ceEcfEF170FCbF036B97789d5320ec3"
          >
            {mintingData.name}
          </a>
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
          Benefits :{" "}
          <span>
            Holding an OG Genesis Fox Collection NFT in your wallet reduces the
            fee on our FoxChange Marketplace to ZERO.
            <br />
            Future Fox Developments will bring more value and benefits for
            Genesis NFT holders.
            <br />
            The release of new FOX NFTS will be very slowly and depends on the
            growing total users.
          </span>
        </p>
      </div>
    </div>
  );
};

export default MintInfo;
