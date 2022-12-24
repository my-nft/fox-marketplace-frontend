import { foxMasterCollectionAddress, getCurrentWalletConnected, loadERC20Contract, loadFoxMasterCollectionContract } from "../utils/blockchainInteractor";

const foxMastercontract = loadFoxMasterCollectionContract();
const erc20Contract = loadERC20Contract();

export const mintNft = (NftDetails) => {

  const connectedWallet = getCurrentWalletConnected();
  
  const mintFee = foxMastercontract.methods.mintFee().call();


  const gasLimit = erc20Contract.methods.approve(foxMasterCollectionAddress, mintFee).estimateGas({
    from: connectedWallet,
    to: foxMasterCollectionAddress,
  });

  erc20Contract.methods.approve(foxMasterCollectionAddress, mintFee).send({
    from: connectedWallet,
    to: foxMasterCollectionAddress,
    gasLimit
  });

  //foxMastercontract.mint(receiver, ipfsId)


}