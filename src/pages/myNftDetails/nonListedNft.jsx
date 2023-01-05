import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CardBody from "../../components/nft/CardBody";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { MAKE_OFFER } from "../../saga/blockchain.js/blockChainActions";
import { getBestOffer } from "../../services/listingNft";
import FOX_MASTER from "../../utils/contracts/FOX_MASTER.json";
import ERC20 from "../../utils/contracts/ERC20.json";
import {
  ERC20ContractAddress,
  foxMasterCollectionAddress,
} from "../../utils/blockchainInteractor";

import {
  useSignMessage,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  Wagmi,
} from "wagmi";
import Web3 from "web3";
import { signinUser } from "../../api/AuthUserApi";
import { getNftCall } from "../../api/nftApi";
import { useSearchParams } from "react-router-dom";

const NonListedNft = ({ itemDetails }) => {
  // values
  const [bestOffer, setBestOffer] = useState();
  const [values, setValues] = useState({
    offerPrice: 0,
  });
  const [itemInfo, setItemInfo] = useState();
  const [nftData, setNftData] = useState("");
  const [mintingStep, setMintingStep] = useState("");
  const [fees, setFees] = useState();
  const [token, setToken] = useState();
  const { address, connector, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage({
    message: `I would like to Sign in for user with address: ${address}`,
  });
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  let collectionAddress =
    searchParams.get("collectionAddress") || foxMasterCollectionAddress;

  const {
    config: configOffer,
    isSuccess: isSuccessOffer,
    error,
  } = usePrepareContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "makeOffer",
    args: [address, nftData.tokenID, values.offerPrice],
    enabled: Boolean(nftData),
  });

  const { writeAsync: makeOffer } = useContractWrite({
    ...configOffer,
    onError(err) {
      console.log(err);
    },
  });

  const {
    config: configApprove,
    isSuccess: isSuccessApprove,
    error: errorApprove,
  } = usePrepareContractWrite({
    address: ERC20ContractAddress,
    abi: ERC20,
    functionName: "approve",
    args: [address, fees, values.offerPrice],
    enabled: Boolean(fees),
  });

  const { writeAsync: approve } = useContractWrite({
    ...configApprove,
    onError(err) {
      console.log(err);
    },
  });

  const { refetch: offerFee } = useContractRead({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: "offerFee",
  });

  const runCreateOffer = async () => {
    setMintingStep("Running Create Offer");

    const makeOfferTsx = await makeOffer();
    const receipt = await makeOfferTsx.wait();
    const tokenID = Web3.utils.hexToNumber(
      receipt.logs[0].topics[3].toString()
    );

    setMintingStep("Syncing NFT");
  };

  const runApprove = async () => {
    setMintingStep("Wallet Approve");
    await approve();
    const { upload, ...rest } = itemInfo;

    const response = await getNftCall({
      collectionAddress: collectionAddress,
      tokenID: itemInfo.tokenID,
    });
    console.log("IPFS URI", response.data);
    setNftData(response.data);
  };

  const continueMakingOffer = async () => {
    const offerFeeRet = await offerFee();
    setFees(offerFeeRet.data);
  };

  const handleMakeOffer = async () => {
    setMintingStep("Wallet signing");

    const signature = await signMessageAsync();
    const responseSigning = await signinUser({
      address,
      signature,
    });

    const token = responseSigning.data.token;
    setToken(token);

    // dispatch({
    //   type: MAKE_OFFER,
    //   payload: {
    //     price: Number(offerPrice),
    //     tokenID: itemInfo.tokenID,
    //     collectionAddress: itemInfo.collectionAddress,
    //   },
    //   updateMintingStep: (step) => setMintingStep(step),
    //   onSuccess: (nft) => setItemInfo(nft),
    // });
  };

  useEffect(() => {
    if (nftData && makeOffer && isSuccessOffer) {
      runCreateOffer();
    }
  }, [nftData, isSuccessOffer]);

  useEffect(() => {
    if (token) {
      continueMakingOffer();
    }
  }, [token]);

  useEffect(() => {
    if (fees && isSuccessApprove) {
      runApprove();
    }
  }, [fees, isSuccessApprove]);

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const onSubmitForm = async (evt) => {
    evt.preventDefault();
    await handleMakeOffer();
  };

  const init = async () => {
    if (itemDetails) {
      const bestOfferPrice = await getBestOffer(
        collectionAddress,
        itemInfo.tokenID
      );
      setBestOffer(bestOfferPrice);
    }
  };

  useEffect(() => {
    setItemInfo(itemDetails);
    init();
  }, []);

  return (
    <CardNftWrapper>
      <CardBody bestOffer={bestOffer}>
        <div className="card mt-2" id="fixedPriceDetails">
          <div className="card-body">
            <form id="setPrice">
              <div className="input-group">
                <div
                  style={{
                    width: "80%",
                  }}
                >
                  <label htmlFor="inputAmount">Offer price</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="Amount"
                    id="offerPrice"
                    name="offerPrice"
                    onChange={handleChange}
                    value={values.offerPrice}
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
                Make offer
              </button>
            </form>
          </div>
        </div>
      </CardBody>
    </CardNftWrapper>
  );
};

export default NonListedNft;
