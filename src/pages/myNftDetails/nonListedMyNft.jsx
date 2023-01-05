import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomDatePicker from "../../components/datePicker/datePicker";
import CardBody from "../../components/nft/CardBody";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import {
  ACCEPT_OFFER,
  LISTING_AUCTION,
  LISTING_FIXED_PRICE,
} from "../../saga/blockchain.js/blockChainActions";
import { getBestOffer } from "../../services/listingNft";
import { FIXED_PRICE, AUCTION } from "../../utils/foxConstantes";
import {
  useSignMessage,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import {
  ERC20ContractAddress,
  foxMasterCollectionAddress,
} from "../../utils/blockchainInteractor";
import FOX_MASTER from "../../utils/contracts/FOX_MASTER.json";
import ERC20 from "../../utils/contracts/ERC20.json";
import Web3 from "web3";
import { useSearchParams } from "react-router-dom";
import { signinUser } from "../../api/AuthUserApi";
import { acceptOffer, setNftToListed } from "../../api/nftApi";

const NonListedMyNft = ({ collectionDetails, nftDetails }) => {
  const [type, setType] = useState(FIXED_PRICE);
  const [showPicker, setShowPicker] = useState(false);
  const [bestOffer, setBestOffer] = useState();
  const [itemDetails, setItemDetails] = useState();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { address, connector, isConnected } = useAccount();
  const [token, setToken] = useState();
  const [mintingStep, setMintingStep] = useState("");
  const [idIpfs, setIdIpfs] = useState("");
  const [fees, setFees] = useState(0);

  let collectionAddress =
    searchParams.get("collectionAddress") || foxMasterCollectionAddress;

  const { signMessageAsync } = useSignMessage({
    message: `I would like to Sign in for user with address: ${address}`,
  });

  // configs
  const {
    config: configAuction,
    isSuccess: isSuccessAuction,
    error: errorAuction,
  } = usePrepareContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "listAuction",
    args: [address, itemDetails.tokenID, values.auctionPrice, values.time],
    enabled: Boolean(values.auctionPrice && values.time),
  });

  const {
    config: configApprove,
    isSuccess: isSuccessApprove,
    error: errorApprove,
  } = usePrepareContractWrite({
    address: ERC20ContractAddress,
    abi: ERC20,
    functionName: "approve",
    args: [collectionAddress, fees, values.auctionPrice],
    enabled: Boolean(fees),
  });

  const {
    config: configFixedPrice,
    isSuccess: isSuccessFixedPrice,
    error: errorFixedPrice,
  } = usePrepareContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "listFixedPrice",
    args: [address, itemDetails.tokenID, values.fixedPrice],
    enabled: Boolean(idIpfs),
  });

  const {
    config: configAcceptOffer,
    isSuccess: isSuccessAcceptOffer,
    error: errorAcceptOffer,
  } = usePrepareContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "acceptOffer",
    args: [
      address,
      itemDetails.tokenID,
      collectionDetails.royaltyAddress
        ? collectionDetails.royaltyAddress
        : collectionDetails.ownerAddress,
      collectionDetails.royaltyPercent ? collectionDetails.royaltyPercent : 0,
    ],
    enabled: Boolean(idIpfs),
  });

  // fees contract
  const { refetch: actionFee } = useContractRead({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "getFee",
  });

  // contract writes

  const { writeAsync: writeAuction } = useContractWrite({
    ...configAuction,
    onError(error) {
      console.log(error);
    },
  });

  const { writeAsync: writeApprove } = useContractWrite({
    ...configApprove,
    onError(error) {
      console.log(error);
    },
  });

  const { writeAsync: writeFixedPrice } = useContractWrite({
    ...configFixedPrice,
    onError(error) {
      console.log(error);
    },
  });

  const { writeAsync: writeAcceptOffer } = useContractWrite({
    ...configAcceptOffer,
    onError(error) {
      console.log(error);
    },
  });

  // approve method
  const runApprove = async () => {
    setMintingStep("Wallet Approve");

    await writeApprove();

    const { upload, ...rest } = itemDetails;
  };

  // signing method
  const signingMethod = async () => {
    setMintingStep("Wallet Signing");
    const signature = await signMessageAsync();
    const responseSigning = await signinUser({
      address,
      signature,
    });

    const token = responseSigning.data.token;
    setToken(token);
  };

  // methods for actions
  const runAuction = async () => {
    setMintingStep("Running Auction");
    const auctionTsx = await writeAuction();
    const receipt = await auctionTsx.wait();

    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );

    const response = await setNftToListed(
      {
        collectionAddress: collectionAddress,
        tokenID: itemDetails.tokenID,
        auctionId: itemDetails.auctionId,
        endAuction: values.time,
        listingType: AUCTION,
      },
      token
    );

    setItemDetails(response.data);
  };

  const runFixedPrice = async () => {
    setMintingStep("Running Fixed Price");
    const fixedPriceTsx = await writeFixedPrice();
    const receipt = await fixedPriceTsx.wait();

    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );

    const response = await setNftToListed(
      {
        collectionAddress: collectionAddress,
        tokenID: itemDetails.tokenID,
        listingType: FIXED_PRICE,
        price: values.fixedPrice,
        listingId: itemDetails.listingId,
      },
      token
    );

    setItemDetails(response.data);
  };

  const runAcceptOffer = async () => {
    setMintingStep("Running Accept Offer");
    const acceptOfferTsx = await writeAcceptOffer();
    const receipt = await acceptOfferTsx.wait();

    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );

    const response = await acceptOffer(
      {
        collectionAddress: collectionAddress,
        tokenID: itemDetails.tokenID,
      },
      token
    );

    setItemDetails(response.data);
  };

  // set fees
  const continueProcess = async () => {
    const actionFeesRet = await actionFee();
    setFees(actionFeesRet.data);
  };

  // useEffects for contracts

  useEffect(() => {
    if (token) {
      continueProcess();
    }
  }, [token]);

  useEffect(() => {
    if (fees && isSuccessApprove) {
      runApprove();
    }
  }, [fees, isSuccessApprove]);

  useEffect(() => {
    if (type === FIXED_PRICE) {
      if (idIpfs && writeFixedPrice && isSuccessFixedPrice) {
        runFixedPrice();
      }
    } else if (type === AUCTION) {
      if (idIpfs && writeAuction && isSuccessAuction) {
        runAuction();
      }
    } else if (type === ACCEPT_OFFER) {
      if (idIpfs && writeAcceptOffer && isSuccessAcceptOffer) {
        runAcceptOffer();
      }
    }
  }, [idIpfs, isSuccessFixedPrice, isSuccessAuction, isSuccessAcceptOffer]);

  // values
  const [values, setValues] = useState({
    fixedPrice: 0,
    auctionPrice: 0,
    time: 0,
  });

  const handleAcceptOffer = async () => {
    await signingMethod();
  };

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const onSubmitForm = async (evt) => {
    evt.preventDefault();
    if (type === AUCTION || type === FIXED_PRICE) {
      await signingMethod();
    }
  };

  const init = async () => {
    const bestOfferPrice = await getBestOffer(
      nftDetails.collectionAddress,
      nftDetails.tokenID
    );
    setBestOffer(bestOfferPrice);
  };

  useEffect(() => {
    setItemDetails(nftDetails);
    init();
  }, [nftDetails]);

  useEffect(() => {
    if (type === AUCTION) {
      setShowPicker(true);
    } else {
      setShowPicker(false);
    }
  }, [type]);

  const handleDateChange = (dateObj) => {
    setShowPicker(false);
    setValues({ ...values, time: dateObj.getTime() });
  };

  return (
    <>
      <CustomDatePicker
        showPicker={showPicker}
        closeAction={() => setShowPicker(false)}
        dateSetAction={handleDateChange}
      />
      <CardNftWrapper>
        <CardBody
          bestOffer={bestOffer}
          onAcceptOffer={handleAcceptOffer}
          ownerAddress={itemDetails.ownerAddress}
        >
          <div className="card" id="cardNft">
            <div className="card-body">
              <div className="card-text">
                <button
                  id="fixedPrice"
                  className={
                    type === FIXED_PRICE
                      ? "btn orangeBg m-2 active"
                      : "btn orangeBg m-2 deactive"
                  }
                  onClick={() => setType(FIXED_PRICE)}
                >
                  Fixed price
                </button>
                <button
                  id="timedAuction"
                  className={
                    type === AUCTION
                      ? "btn orangeBg m-2 active"
                      : "btn orangeBg m-2 deactive"
                  }
                  onClick={() => {
                    setShowPicker(true);
                    setType(AUCTION);
                  }}
                >
                  Timed auction
                </button>
              </div>
            </div>
          </div>

          {type === FIXED_PRICE ? (
            <div className="card mt-2" id="fixedPriceDetails">
              <div className="card-body">
                <form id="setPrice">
                  <div className="input-group">
                    <div
                      style={{
                        width: "80%",
                      }}
                    >
                      <label htmlFor="inputAmount">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Text input with dropdown button"
                        placeholder="Amount"
                        id="fixedPrice"
                        name="fixedPrice"
                        onChange={handleChange}
                      />
                    </div>
                    <select id="nameofCoin">
                      <option>FXG</option>
                    </select>
                  </div>
                  <button
                    id="makeOfferSubmit"
                    className="btn contIcon"
                    onClick={onSubmitForm}
                  >
                    Item for sale
                  </button>
                </form>
              </div>
            </div>
          ) : null}

          {type === AUCTION ? (
            <div className="card mt-2" id="timedAuctionDetails">
              <div className="card-body">
                <div className="card-text">
                  <form id="setAuction">
                    <div className="input-group">
                      <div
                        style={{
                          width: "80%",
                        }}
                      >
                        <label htmlFor="inputAmount">Starting Price</label>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Text input with dropdown button"
                          placeholder="Amount"
                          id="auctionPrice"
                          name="auctionPrice"
                          onChange={handleChange}
                        />
                      </div>
                      <select id="nameofCoin">
                        <option>FXG</option>
                      </select>
                    </div>
                    <div className="input-group mt-3">
                      <label
                        htmlFor="inputAmount"
                        onClick={() => setShowPicker(true)}
                      >
                        Duration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Text input with dropdown button"
                        placeholder="Duration"
                        id="time"
                        name="time"
                        onChange={handleChange}
                        onClick={() => setShowPicker(true)}
                        readOnly
                        value={
                          values.time
                            ? new Date(values.time).toLocaleString([], {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            : ""
                        }
                      />
                    </div>
                    <button
                      id="placeBidSubmit"
                      className="btn contIcon"
                      onClick={onSubmitForm}
                    >
                      Create auction
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </CardBody>
      </CardNftWrapper>
    </>
  );
};

export default NonListedMyNft;
