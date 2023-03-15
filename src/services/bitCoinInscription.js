import { bitcoinInscriptionContractAddress, getCurrentWalletConnected, loadBitCoinInscriptionContract, loadERC20Contract, web3Infura } from "../utils/blockchainInteractor";

export const estimateCost = async (fileSizeInBytes) => {
  const bitcoinInscription = await loadBitCoinInscriptionContract();
  const ERC20Contract = await loadERC20Contract();
  const rawCost =  await bitcoinInscription.methods.estimateCost(fileSizeInBytes).call();
  const decimals = await ERC20Contract.methods.decimals().call();
  return Math.floor(+rawCost / Math.pow(10, decimals));
};

export const requestInscription = async (fileSize) => {
  const web3 = web3Infura();

  const bitcoinInscription = await loadBitCoinInscriptionContract();
  console.log('bitcoinInscription');
  console.log(bitcoinInscription)
  const connectedWallet = await getCurrentWalletConnected();
  console.log('connectedWallet')
  console.log(connectedWallet);
  console.log('estimating gas limit');
  console.log(fileSize)
  const gasLimit = await bitcoinInscription.methods.requestInscription(web3.utils.toHex(fileSize))
  .estimateGas({
    from: connectedWallet,
    to: bitcoinInscriptionContractAddress,
  });
  console.log('gasLimit estimated for inscription');
  console.log(gasLimit);
  // const res = await bitcoinInscription.methods.requestInscription(`${fileSize}`).send({
  //   from: connectedWallet,
  //   to: bitcoinInscriptionContractAddress,
  //   gasLimit,
  // });
  console.log('res of requestInscription');
  // console.log(res);
}
