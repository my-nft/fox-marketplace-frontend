import { useEffect } from "react";
import { useState } from "react";
import CardBody from "../../components/nft/CardBody";
import CardHeader from "../../components/nft/CardHeader";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { getAuctionInfos } from "../../services/listingNft";
import PlaceBid from "../../components/nft/PlaceBid";
import { sameAddress } from "../../utils/walletUtils";
import { selectCurrentWallet } from "../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  CLAIM_NFT,
  CLAIM_TOKEN,
  PLACE_BID,
  REFUND_NFT,
} from "../../saga/blockchain.js/blockChainActions";
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

const ListedAuctionNft = ({ itemDetails, collectionDetails }) => {
  const [itemInfos, setItemInfos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const currentBidOwner = itemInfos?.currentBidOwner;
  const bidCount = itemInfos?.bidCount;
  const currentWallet = useSelector(selectCurrentWallet);
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

  const {
    config: configPlaceBid,
    isSuccess: isSuccessPlaceBid,
    error: errorPlaceBid,
  } = useContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "placeBid",
    args: [address, idIpfs],
    enabled: Boolean(idIpfs),
  });

  const {
    config: configRefund,
    isSuccess: isSuccessRefund,
    error: errorRefund,
  } = useContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "refund",
    args: [address, idIpfs],
    enabled: Boolean(idIpfs),
  });

  const {
    config: configClaimNft,
    isSuccess: isSuccessClaimNft,
    error: errorClaimNft,
  } = useContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "claimNft",
    args: [address, idIpfs],
    enabled: Boolean(idIpfs),
  });

  const {
    config: configClaimToken,
    isSuccess: isSuccessClaimToken,
    error: errorClaimToken,
  } = useContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "claimToken",
    args: [address, idIpfs],
    enabled: Boolean(idIpfs),
  });

  const {
    config: configApprove,
    isSuccess: isSuccessApprove,
    error: errorApprove,
  } = useContractWrite({
    address: ERC20ContractAddress,
    abi: ERC20,
    functionName: "approve",
    args: [collectionAddress, fees],
    enabled: Boolean(fees),
  });

  const { refetch: actionFee } = useContractRead({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "getFee",
  });

  const { writeAsync: writePlaceBid } = usePrepareContractWrite({
    ...configPlaceBid,
    onError(error) {
      console.log(error);
    },
  });

  const { writeAsync: writeRefund } = usePrepareContractWrite({
    ...configRefund,
    onError(error) {
      console.log(error);
    },
  });

  const { writeAsync: writeClaimNft } = usePrepareContractWrite({
    ...configClaimNft,
    onError(error) {
      console.log(error);
    },
  });

  const { writeAsync: writeClaimToken } = usePrepareContractWrite({
    ...configClaimToken,
    onError(error) {
      console.log(error);
    },
  });

  const { writeAsync: writeApprove } = usePrepareContractWrite({
    ...configApprove,
    onError(error) {
      console.log(error);
    },
  });

  const runApprove = async () => {
    setMintingStep("Wallet Approve");
    await writeApprove();
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

  const runPlaceBid = async () => {
    setMintingStep("Running Place Bid");
    const placeBidTsx = await writePlaceBid();
    const receipt = await placeBidTsx.wait();
    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );
  };

  const runRefund = async () => {
    setMintingStep("Running Refund");
    const refundTsx = await writeRefund();
    const receipt = await refundTsx.wait();
    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );
  };

  const runClaimNft = async () => {
    setMintingStep("Running Claim NFT");
    const claimNftTsx = await writeClaimNft();
    const receipt = await claimNftTsx.wait();
    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );
  };

  const runClaimToken = async () => {
    setMintingStep("Running Claim Token");
    const claimTokenTsx = await writeClaimToken();
    const receipt = await claimTokenTsx.wait();
    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );
  };

  const continueProcessing = async () => {
    const actionFeesRet = await actionFee();
    setFees(actionFeesRet.data);
  };

  useEffect(() => {
    if (token) {
      continueProcessing();
    }
  }, [token]);

  useEffect(() => {
    if (fees && isSuccessApprove) {
      runApprove();
    }
  }, [fees, isSuccessApprove]);

  useEffect(() => {
    if (type === CLAIM_NFT) {
      if (idIpfs && writeClaimNft && isSuccessClaimNft) {
        runClaimNft();
      }
    } else if (type === CLAIM_TOKEN) {
      if (idIpfs && writeClaimToken && isSuccessClaimToken) {
        runClaimToken();
      }
    } else if (type === PLACE_BID) {
      if (idIpfs && writePlaceBid && isSuccessPlaceBid) {
        runPlaceBid();
      }
    } else if (type === REFUND_NFT) {
      if (idIpfs && writeRefund && isSuccessRefund) {
        runRefund();
      }
    }
  }, [
    idIpfs,
    isSuccessClaimNft,
    isSuccessClaimToken,
    isSuccessPlaceBid,
    isSuccessRefund,
  ]);

  useEffect(() => {
    if (type) {
      signingMethod();
    }
  }, [type]);

  const onPlaceBid = async (price) => {
    setType(PLACE_BID);
    // dispatch({
    //   type: PLACE_BID,
    //   payload: {
    //     tokenID: itemDetails.tokenID,
    //     collectionAddress: itemDetails.collectionAddress,
    //     auctionId: itemDetails.auctionId,
    //     price,
    //   },
    //   onSuccess: (nft) => setItemInfos(nft),
    // });
  };

  const onRefund = async () => {
    setType(REFUND_NFT);
    // dispatch({
    //   type: REFUND_NFT,
    //   payload: {
    //     tokenID: itemDetails.tokenID,
    //     collectionAddress: itemDetails.collectionAddress,
    //     auctionId: itemDetails.auctionId,
    //   },
    //   onSuccess: (nft) => setItemInfos(nft),
    // });
  };

  const onClaimNft = async () => {
    setType(CLAIM_NFT);
    // const { royaltyAddress, royaltyPercent } = collectionDetails;
    // dispatch({
    //   type: CLAIM_NFT,
    //   payload: {
    //     tokenId: itemDetails.tokenID,
    //     collectionAddress: itemDetails.collectionAddress,
    //     auctionId: itemDetails.auctionId,
    //     royaltyAddress: royaltyAddress
    //       ? royaltyAddress
    //       : collectionDetails.ownerAddress,
    //     royaltyPercent: royaltyPercent ? royaltyPercent : 0,
    //   },
    //   onSuccess: (nft) => setItemInfos(nft),
    // });
  };

  const onClaimToken = async () => {
    setType(CLAIM_TOKEN);
    // const { royaltyAddress, royaltyPercent } = collectionDetails;
    // dispatch({
    //   type: CLAIM_TOKEN,
    //   payload: {
    //     tokenId: itemDetails.tokenID,
    //     collectionAddress: itemDetails.collectionAddress,
    //     auctionId: itemDetails.auctionId,
    //     royaltyAddress: royaltyAddress
    //       ? royaltyAddress
    //       : collectionDetails.ownerAddress,
    //     royaltyPercent: royaltyPercent ? royaltyPercent : 0,
    //   },
    //   onSuccess: (nft) => setItemInfos(nft),
    // });
  };

  const isTokenExpired = (endAuction) => {
    if (endAuction && !isNaN(endAuction)) {
      const end = endAuction * 1000;
      const now = new Date().getTime();
      return end - now < 0;
    }
    return true;
  };

  const setAuctionItemInfos = async () => {
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
    const infos = await getAuctionInfos(itemDetails.auctionId);
    setItemInfos(infos);
  };

  const init = async () => {
    setIsLoading(true);
    await setAuctionItemInfos();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const creator = itemInfos?.creator;

  return (
    !isLoading && (
      <>
        <CardNftWrapper>
          <CardHeader endDate={Number(itemInfos?.endAuction)} />
          <CardBody
            title={Number(bidCount) === 0 ? "Minimum bid" : "Current bid"}
            price={itemInfos?.currentBidPrice / 10 ** 18}
            priceDollar={itemInfos?.currentBidPrice / 10 ** 18}
          >
            {sameAddress(currentWallet, creator) &&
              Number(bidCount) === 0 &&
              isTokenExpired(Number(itemInfos?.endAuction)) && (
                <button id="buyItem" className="btn" onClick={onRefund}>
                  Refund
                </button>
              )}

            {sameAddress(currentWallet, currentBidOwner) &&
              isTokenExpired(Number(itemInfos?.endAuction)) &&
              Number(bidCount) > 0 && (
                <button id="buyItem" className="btn" onClick={onClaimNft}>
                  Claim NFT
                </button>
              )}

            {sameAddress(currentWallet, creator) &&
              Number(bidCount) > 0 &&
              isTokenExpired(Number(itemInfos?.endAuction)) &&
              Number(bidCount) > 0 && (
                <button id="buyItem" className="btn" onClick={onClaimToken}>
                  Claim Token
                </button>
              )}
          </CardBody>
        </CardNftWrapper>
        {!isTokenExpired(Number(itemInfos?.endAuction)) &&
          !sameAddress(currentBidOwner, currentWallet) &&
          !sameAddress(creator, currentWallet) && (
            <PlaceBid onPlaceBid={onPlaceBid} />
          )}
      </>
    )
  );
};

export default ListedAuctionNft;
