import { addNftToIpfs } from "../api/nftApi";
import {
  foxMasterCollectionAddress,
  getCurrentWalletConnected,
  loadERC20Contract,
  loadFoxMasterCollectionContract,
} from "../utils/blockchainInteractor";
import { sameAddress } from "../utils/walletUtils";

const erc20Contract = loadERC20Contract();

export const mintNft = async ({
  collectionAddress = foxMasterCollectionAddress,
  nft,
  image,
  token,
}) => {

  if(!collectionAddress) {
    collectionAddress = foxMasterCollectionAddress
  }
  
  console.log("=====> input collection address ", collectionAddress);

  const foxMastercontract = loadFoxMasterCollectionContract(collectionAddress);

  const connectedWallet = getCurrentWalletConnected();

  if (sameAddress(collectionAddress, foxMasterCollectionAddress)) {
    const mintFee = await foxMastercontract.methods.mintFee().call();

    const gasLimit = await erc20Contract.methods
      .approve(collectionAddress, mintFee)
      .estimateGas({
        from: connectedWallet,
        to: collectionAddress,
      });

    await erc20Contract.methods.approve(collectionAddress, mintFee).send({
      from: connectedWallet,
      to: collectionAddress,
      gasLimit,
    });
  }

  // API ADD NFT TO IPFS
  const response = await addNftToIpfs({
    collectionAddress: collectionAddress,
    nft,
    image,
    token,
  });

  const tsx = await foxMastercontract.methods
    .mint(connectedWallet, response.data)
    .send({
      from: connectedWallet,
      to: collectionAddress,
    });

  const tokenID = tsx?.events?.Transfer?.returnValues?.tokenId;

  console.log("=====> TOKENID ", tokenID);
  console.log("=====> collectionAddress ", collectionAddress);

  return {
    tokenID,
    collectionAddress,
  };
};
