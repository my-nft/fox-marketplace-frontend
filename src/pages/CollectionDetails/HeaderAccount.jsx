import { Link } from "react-router-dom";
import { optimizeWalletAddress, sameAddress } from "../../utils/walletUtils";

import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";

import collectionBannerPlaceholder from "../../assets/images/Popluar.jpg";
import collectionImagePlaceholder from "../../assets/images/nft_test.jpg";
import { selectCurrentWallet } from "../../redux/userReducer";
import { useSelector } from "react-redux";
import Address from "../../components/Address";

const HeaderAccount = ({ collectionData }) => {
  const { image, banner } = collectionData;
  const currentWallet = useSelector(selectCurrentWallet);

  const displayValue = (value) => {
    if (value) return value;
    return "-";
  };

  return (
    <section id="headerAccount" className="container-fluid">
      <div className="row p-4" id="infoProfile">
        <img
          src={image ? image : collectionImagePlaceholder}
          id="iconProfile"
          alt=""
        />
        <img
          src={banner ? banner : collectionBannerPlaceholder}
          id="bannerProfile"
          alt="profile banner"
        />
      </div>
      <div className="row p-4 mt-5" id="infoHeader">
        <div id="accountName">
          <p>{collectionData.name}</p>
          <span id="accountWallet">
            <Address address={collectionData.collectionAddress}>
              {optimizeWalletAddress(collectionData.collectionAddress)}
            </Address>
          </span>
          <span className="dataLastVisit">
            {" "}
            - Created at{" "}
            {new Date(collectionData.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </span>
          <p className="description">{collectionData.description}</p>
          <ul id="totalItemsInfo">
            <li>
              <span>Items</span>
              <p>{displayValue(collectionData.items)}</p>
            </li>
            <li>
              <span>Created</span>
              <p>
                {new Date(collectionData.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                  }
                )}
              </p>
            </li>
            <li>
              <span>Creator fee</span>
              <p>{displayValue(collectionData.royaltyPercent)}%</p>
            </li>
            <li>
              <span>Chain</span>
              <p>{displayValue(collectionData.chain)}</p>
            </li>
          </ul>
          <ul id="totalItemsPrice">
            <li>
              <p>
                {collectionData.totalVolume} {collectionData.chain}
              </p>
              <span>total Volume</span>
            </li>
            <li>
              <span>floor price</span>
              <p>
                {collectionData.floorPrice} {collectionData.chain}
              </p>
            </li>
            <li>
              <span>best offer</span>
              <p>
                {collectionData.bestOffer} {collectionData.chain}
              </p>
            </li>
            <li>
              <span>Listed</span>
              <p>{displayValue(collectionData.listed)}</p>
            </li>
            <li>
              <span>owners</span>
              <p>{displayValue(collectionData.owners)}</p>
            </li>
            <li>
              <span>unique owners</span>
              <p>{displayValue(collectionData.uniqueOwner)}</p>
            </li>
          </ul>
        </div>
        <div className="row align-items-start">
          {sameAddress(collectionData.ownerAddress, currentWallet) ? (
            <>
              <Link
                to={`/single-nft?collectionAddress=${collectionData.collectionAddress}`}
                className="addNFTLink"
              >
                Add NFT to collection
              </Link>
              <Link
                to={`/collection/${collectionData.collectionAddress}/settings`}
                className="settingsIcon"
              >
                <SettingsIcon />
              </Link>
            </>
          ) : null}
        </div>

        {/* <div id="accountButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-share"
            viewBox="0 0 16 16"
          >
            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          </svg>

          <div className="dropdown">
            <button type="button" data-toggle="dropdown" aria-expanded="false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                data-toggle="popover"
                data-content="Disabled popover"
                className="bi bi-three-dots"
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
            <div className="dropdown-menu">
              <ul>
                <li className="head">ADDRESES</li>
                <li>
                  WALLET NUMBER{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z" />
                    </svg>
                  </span>
                </li>
                <li className="head">MORE</li>
                <li>REPORT</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeaderAccount;
