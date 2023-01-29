import {
  ERC20ContractAddress,
  factoryCollectionAddress,
  getCurrentWalletConnected,
  loadERC20Contract,
  loadFactoryContract,
} from "../utils/blockchainInteractor";

const ipfsUri = process.env.REACT_APP_IPFS_URI;


export const mintCollection = async ({ name, symbol }) => {
  const connectedWallet = await getCurrentWalletConnected();
  const factoryContract = await loadFactoryContract();
  const erc20Contract = await loadERC20Contract();

  console.log("######################", connectedWallet)

  const deploymentFee = await factoryContract.methods.deploymentFee().call();

  const allowance = await erc20Contract.methods
    .allowance(connectedWallet, factoryCollectionAddress)
    .call();

  if (allowance < deploymentFee) {
    const gasLimit = await erc20Contract.methods
      .approve(factoryCollectionAddress, deploymentFee)
      .estimateGas({
        from: connectedWallet,
        to: ERC20ContractAddress,
      });

    await erc20Contract.methods
      .approve(factoryCollectionAddress, deploymentFee)
      .send({
        from: connectedWallet,
        to: ERC20ContractAddress,
        gasLimit,
      });
  }

  const gasLimit = await factoryContract.methods
    .CreateNFT(name, symbol, ipfsUri)
    .estimateGas({
      from: connectedWallet,
      to: factoryCollectionAddress,
    });

  const tsx = await factoryContract.methods
    .CreateNFT(name, symbol, ipfsUri)
    .send({
      from: connectedWallet,
      to: factoryCollectionAddress,
      gasLimit,
    });


    console.log("COLLECTION ADDRESS CREATED  ", tsx)


  return tsx.events[0].address;
};