import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProviderInstance } from "../../../utils/blockchainInteractor";
import { optimizeWalletAddress } from "../../../utils/walletUtils";

const AccordionDetails = ({ nftDetails, collectionDetails }) => {

  const [web3, setWeb3] = useState();
  const [chainId, setChainId] = useState(false);

  // get chain id and get name of the chain
  const navigate = useNavigate();

  const initWeb3 = async () => {
    const wbU = await authProviderInstance.getInjectedWeb3();
    setWeb3(wbU);
  }

  useEffect(() => {
    initWeb3();
  }, []);

  useEffect(() => {
    if(web3) {
      web3.eth.getChainId().then((res) => {
        setChainId(res);
      });
    }
  }, [web3]);

  const goToCollection = () => {
    navigate(`/collection/${collectionDetails.collectionAddress}`);
  };

  return (
    <div id="accordionDetails">
      <div className="card">
        <div className="card-header" id="headingThree">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-list-ul"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                  />
                </svg>
                <span className="pl-3">Collection</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </button>
          </h5>
        </div>

        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionDetails"
        >
          <div className="card-body">
            <ul>
              <li>
                <span className="label">Contract Address</span>
                <span
                  className="value collectionLink"
                  onClick={() => {
                    goToCollection();
                  }}
                >
                  {optimizeWalletAddress(nftDetails.collectionAddress)}
                </span>
              </li>
              <li>
                <span className="label">Token ID</span>
                <span className="value">{nftDetails.tokenID}</span>
              </li>
              <li>
                <span className="label">Token Standard</span>
                <span className="value">ERC 271</span>
              </li>
              <li>
                <span className="label">Chain ID</span>
                <span className="value">{chainId}</span>
              </li>
              <li>
                <span className="label">Last Updated</span>
                <span className="value">
                  {collectionDetails.modificationDate
                    ? new Date(
                        collectionDetails.modificationDate
                      ).toLocaleString("en-US", {
                        timeZone: "UTC",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "-"}
                </span>
              </li>
              <li>
                <span className="label">Creator Earnings</span>
                <span className="value">
                  {collectionDetails.royaltyPercent}%
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionDetails;
