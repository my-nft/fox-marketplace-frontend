import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardBody from "../../components/nft/CardBody";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { selectCurrentWallet } from "../../redux/userReducer";
import {
  ACCEPT_OFFER,
  BUY_NFT,
  DELIST_ITEM,
  MAKE_OFFER,
} from "../../saga/blockchain.js/blockChainActions";
import { getBestOffer, getPriceByListing } from "../../services/listingNft";
import { sameAddress } from "../../utils/walletUtils";
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
import { acceptOffer, getNftCall, setNftToUnlisted } from "../../api/nftApi";

const ListedFixedNft = ({ itemDetails, collectionDetails }) => {
  const currentWallet = useSelector(selectCurrentWallet);

  const [itemInfos, setItemInfos] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [currentOffer, setCurrentOffer] = useState(0);
  const [bestOffer, setBestOffer] = useState(undefined);
  const [showMakeOffer, setShowMakeOffer] = useState(false);
  const [type, setType] = useState(false);
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
    config: configBuy,
    isSuccess: isSuccessBuy,
    error: errorBuy,
  } = usePrepareContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "buy",
    args: [address, idIpfs],
    enabled: Boolean(idIpfs),
  });

  const {
    config: configMakeOffer,
    isSuccess: isSuccessMakeOffer,
    error: errorMakeOffer,
  } = usePrepareContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "makeOffer",
    args: [address, itemDetails.tokenID, currentOffer],
    enabled: Boolean(idIpfs),
  });

  const {
    config: configDelist,
    isSuccess: isSuccessDelist,
    error: errorDelist,
  } = usePrepareContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "delist",
    args: [itemInfos.listingId],
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
    args: [address, itemInfos.tokenID],
    enabled: Boolean(idIpfs),
  });

  const {
    config: configApprove,
    isSuccess: isSuccessApprove,
    error: errorApprove,
  } = usePrepareContractWrite({
    address: ERC20ContractAddress,
    abi: ERC20,
    functionName: "approve",
    args: [collectionAddress, fees, currentPrice],
    enabled: Boolean(fees),
  });

  // fees contract
  const { refetch: actionFee } = useContractRead({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "getFee",
  });

  // contracts for actions
  const { writeAsync: writeBuy } = useContractWrite({
    ...configBuy,
    onError(error) {
      console.log(error);
    },
  });

  const { writeAsync: writeMakeOffer } = useContractWrite({
    ...configMakeOffer,
    onError(error) {
      console.log(error);
    },
  });

  const { writeAsync: writeDelist } = useContractWrite({
    ...configDelist,
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

  const { writeAsync: writeApprove } = useContractWrite({
    ...configApprove,
    onError(error) {
      console.log(error);
    },
  });

  // approve method
  const runApprove = async () => {
    setMintingStep("Wallet Approve");
    await writeApprove();
    const { upload, mint } = itemDetails;
  };

  // settings fees method
  const continueProcess = async () => {
    const actionFeesRet = await actionFee();
    setFees(actionFeesRet.data);
  };

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

  // buy method
  const runBuy = async () => {
    setMintingStep("Running Buy");
    const buyTsx = await writeBuy();
    const receipt = await buyTsx.wait();
    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );

    const response = await getNftCall(collectionAddress, itemInfos.tokenID);

    setItemInfos(response.data);
  };

  // make offer method
  const runMakeOffer = async () => {
    setMintingStep("Running Make Offer");
    const makeOfferTsx = await writeMakeOffer();
    const receipt = await makeOfferTsx.wait();
    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );
    const response = await getNftCall({
      collectionAddress: collectionAddress,
      tokenID: itemInfos.tokenID,
    });
    setItemInfos(response.data);
  };

  // delist method
  const runDelist = async () => {
    setMintingStep("Running Delist");
    const delistTsx = await writeDelist();
    const receipt = await delistTsx.wait();
    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );

    await setNftToUnlisted(
      {
        collectionAddress: collectionAddress,
        tokenID: itemInfos.tokenID,
      },
      token
    );

    const response = await getNftCall(collectionAddress, itemInfos.tokenID);

    setItemInfos(response.data);
  };

  // accept offer method
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

    setItemInfos(response.data);
  };

  // useEffect for contracts

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
    if (type === BUY_NFT) {
      if (idIpfs && isSuccessBuy) {
        runBuy();
      }
    } else if (type === MAKE_OFFER) {
      if (idIpfs && isSuccessMakeOffer) {
        runMakeOffer();
      }
    } else if (type === DELIST_ITEM) {
      if (idIpfs && isSuccessDelist) {
        runDelist();
      }
    } else if (type === ACCEPT_OFFER) {
      if (idIpfs && isSuccessAcceptOffer) {
        runAcceptOffer();
      }
    }
  }, [
    idIpfs,
    isSuccessBuy,
    isSuccessMakeOffer,
    isSuccessDelist,
    isSuccessAcceptOffer,
  ]);

  useEffect(() => {
    if (type) {
      signingMethod();
    }
  }, [type]);

  const handleChange = (evt) => {
    setCurrentOffer(evt.target.value);
  };

  const onBuyItem = async (price) => {
    setType(BUY_NFT);

    // const { royaltyAddress, royaltyPercent } = collectionDetails;
    // dispatch({
    //   type: BUY_NFT,
    //   payload: {
    //     listingId: itemDetails.listingId,
    //     price: Number(price),
    //     tokenID: itemDetails.tokenID,
    //     collectionAddress: itemDetails.collectionAddress,
    //     royaltyAddress: royaltyAddress
    //       ? royaltyAddress
    //       : collectionDetails.ownerAddress,
    //     royaltyPercent: royaltyPercent ? royaltyPercent : 0,
    //   },
    //   onSuccess: (nft) => setItemInfos(nft),
    // });
  };

  const onMakeOffer = (offerPrice) => {
    setType(MAKE_OFFER);
    // dispatch({
    //   type: MAKE_OFFER,
    //   payload: {
    //     price: Number(offerPrice),
    //     tokenID: itemDetails.tokenID,
    //     collectionAddress: itemDetails.collectionAddress,
    //   },
    //   onSuccess: (nft) => setItemInfos(nft),
    // });
  };

  const onDelist = async () => {
    setType(DELIST_ITEM);
    // dispatch({
    //   type: DELIST_ITEM,
    //   payload: {
    //     listingId: itemDetails.listingId,
    //     tokenID: itemDetails.tokenID,
    //     collectionAddress: itemDetails.collectionAddress,
    //   },
    //   onSuccess: (nft) => setItemInfos(nft),
    // });
  };

  const onAcceptOffer = () => {
    setType(ACCEPT_OFFER);
    // const { royaltyAddress, royaltyPercent } = collectionDetails;
    // dispatch({
    //   type: ACCEPT_OFFER,
    //   payload: {
    //     tokenID: itemInfos.tokenID,
    //     collectionAddress: itemInfos.collectionAddress,
    //     royaltyAddress: royaltyAddress
    //       ? royaltyAddress
    //       : collectionDetails.ownerAddress,
    //     royaltyPercent: royaltyPercent ? royaltyPercent : 0,
    //   },
    //   onSuccess: (nft) => setItemInfos(nft),
    // });
  };

  const init = async () => {
    const currentPrice = await getPriceByListing(itemDetails.listingId);
    const bestOfferPrice = await getBestOffer(
      itemDetails.collectionAddress,
      itemDetails.tokenID
    );
    setCurrentPrice(currentPrice);
    setBestOffer(bestOfferPrice);
  };

  useEffect(() => {
    setItemInfos(itemDetails);
    init();
  }, [itemDetails]);

  return (
    <CardNftWrapper>
      <CardBody
        title={"Current Price"}
        price={currentPrice}
        priceDollar={currentPrice}
        bestOffer={bestOffer}
        onAcceptOffer={onAcceptOffer}
        ownerAddress={itemInfos.ownerAddress}
      >
        {!sameAddress(currentWallet, itemInfos.ownerAddress) && (
          <>
            <button
              id="buyItem"
              className="btn"
              disabled={!currentPrice}
              onClick={() => onBuyItem(currentPrice)}
            >
              Buy item
            </button>
            <button
              id="makeOffer"
              className="btn"
              onClick={() => setShowMakeOffer(!showMakeOffer)}
            >
              Make offer
            </button>

            {showMakeOffer && (
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
                          id="makeOffer"
                          name="makeOffer"
                          value={currentOffer}
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
                      onClick={(evt) => {
                        evt.preventDefault();
                        onMakeOffer(currentOffer);
                      }}
                    >
                      Submit Offer
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        {sameAddress(currentWallet, itemInfos.ownerAddress) ? (
          <>
            <button id="makeOffer" className="btn" onClick={onDelist}>
              DeList
            </button>
          </>
        ) : null}
      </CardBody>
    </CardNftWrapper>
  );
};

export default ListedFixedNft;
