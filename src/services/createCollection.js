import {
  getCurrentWalletConnected,
  loadERC20Contract,
  loadFactoryContract,
  getAddressesByChain,
} from "../utils/blockchainInteractor";

const ipfsUri = process.env.REACT_APP_IPFS_URI;

export const mintCollection = async ({ name, symbol }) => {
  const connectedWallet = await getCurrentWalletConnected();
  const factoryContract = await loadFactoryContract();
  const erc20Contract = await loadERC20Contract();
  const deploymentFee = await factoryContract.methods.deploymentFee().call();

  const allowance = await erc20Contract.methods
    .allowance(connectedWallet, getAddressesByChain().factoryCollectionAddress)
    .call();

  if (allowance < deploymentFee) {
    const gasLimit = await erc20Contract.methods
      .approve(getAddressesByChain().factoryCollectionAddress, deploymentFee)
      .estimateGas({
        from: connectedWallet,
        to: getAddressesByChain().ERC20ContractAddress,
      });

    await erc20Contract.methods
      .approve(getAddressesByChain().factoryCollectionAddress, deploymentFee)
      .send({
        from: connectedWallet,
        to: getAddressesByChain().ERC20ContractAddress,
        gasLimit,
      });
  }

  const gasLimit = await factoryContract.methods
    .CreateNFT(name, symbol, ipfsUri)
    .estimateGas({
      from: connectedWallet,
      to: getAddressesByChain().factoryCollectionAddress,
    });

  const tsx = await factoryContract.methods
    .CreateNFT(name, symbol, ipfsUri)
    .send({
      from: connectedWallet,
      to: getAddressesByChain().factoryCollectionAddress,
      gasLimit,
    });
  return tsx.events[2].address;
};
