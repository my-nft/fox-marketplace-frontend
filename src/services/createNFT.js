import { importCollectionCall, updateImportCollectionCall } from "../api/collectionApi";
import { addNftToIpfs } from "../api/nftApi";
import {
  foxMasterCollectionAddress,
  getCurrentWalletConnected,
  loadERC20Contract,
  loadFoxMasterCollectionContract,
} from "../utils/blockchainInteractor";

const erc20Contract = loadERC20Contract();

export const mintNft = async ({collectionAddress =  foxMasterCollectionAddress, nft, image, token}) => {

  const foxMastercontract = loadFoxMasterCollectionContract(collectionAddress);


  const connectedWallet = getCurrentWalletConnected();

  const mintFee = await foxMastercontract.methods.mintFee().call();

  console.log("MintFEE ---- ", mintFee);

  const gasLimit = await erc20Contract.methods
    .approve(collectionAddress, mintFee)
    .estimateGas({
      from: connectedWallet,
      to: collectionAddress,
    });

  console.log("GasLimit ---- ", gasLimit);

  await erc20Contract.methods.approve(collectionAddress, mintFee).send({
    from: connectedWallet,
    to: collectionAddress,
    gasLimit,
  });

  // API ADD NFT TO IPFS
  const response = await addNftToIpfs({
    collectionAddress: collectionAddress,
    nft,
    image,
    token,
  });

  await foxMastercontract.methods.mint(connectedWallet, response.data).send({
    from: connectedWallet,
    to: collectionAddress,
  });

      // import token and collection ?
  await importCollectionCall(collectionAddress, token);

};
