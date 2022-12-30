import { addNftToIpfs } from "../api/nftApi";
import {
  authProviderInstance,
  foxMasterCollectionAddress,
  getCurrentWalletConnected,
  loadERC20Contract,
  loadFoxMasterCollectionContract,
} from "../utils/blockchainInteractor";
import { sameAddress } from "../utils/walletUtils";

export const mintNft = async ({
  collectionAddress = foxMasterCollectionAddress,
  nft,
  image,
  token,
}) => {
  const signer = await authProviderInstance.getSigner();

  const erc20Contract = await loadERC20Contract(signer);

  if (!collectionAddress) {
    collectionAddress = foxMasterCollectionAddress;
  }

  console.log("#####################");

  const foxMastercontract = await loadFoxMasterCollectionContract(
    collectionAddress,
    signer
  );

  console.log(foxMastercontract);

  const connectedWallet = await getCurrentWalletConnected();

  if (sameAddress(collectionAddress, foxMasterCollectionAddress)) {
    
    const mintFee = await foxMastercontract.mintFee();

    const tsxApprove = await erc20Contract.populateTransaction.approve(
      collectionAddress,
      mintFee
    );


    await signer.sendUncheckedTransaction(tsxApprove);
  }

  // API ADD NFT TO IPFS
  const response = await addNftToIpfs({
    collectionAddress: collectionAddress,
    nft,
    image,
    token,
  });

  const tsx = await foxMastercontract.mint(connectedWallet, response.data);

  const returnedVal = await tsx.wait();

  const tokenID = returnedVal?.events[0].args.tokenId;

  console.log("=====> TOKENID ", parseInt(tokenID));
  console.log("=====> collectionAddress ", collectionAddress);

  return {
    tokenID,
    collectionAddress,
  };
};
