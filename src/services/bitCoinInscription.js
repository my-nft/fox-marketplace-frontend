import {
  bitcoinInscriptionContractAddress,
  getAddressesByChain,
  getCurrentWalletConnected,
  loadBitCoinInscriptionContract,
  loadERC20Contract,
  web3Infura,
} from "../utils/blockchainInteractor";
import { bigNumberPricing } from "./listingNft";

export const estimateCost = async (fileSizeInBytes) => {
  const bitcoinInscription = await loadBitCoinInscriptionContract();
  const ERC20Contract = await loadERC20Contract();
  const rawCost = await bitcoinInscription.methods
    .estimateCost(fileSizeInBytes)
    .call();
  const decimals = await ERC20Contract.methods.decimals().call();
  return Math.floor(+rawCost / 10**decimals);
};

export const requestInscription = async (fileSize, estimatedCost) => {
  const web3 = web3Infura();

  const erc20Contract = await loadERC20Contract();

  const bitcoinInscription = await loadBitCoinInscriptionContract();
  console.log("bitcoinInscription");
  console.log(bitcoinInscription);
  const connectedWallet = await getCurrentWalletConnected();
  console.log("connectedWallet");
  console.log(connectedWallet);
  console.log("estimating gas limit");
  console.log(fileSize);
  console.log(estimatedCost);
  const decimals = await erc20Contract.methods.decimals().call();

  const cost = web3.utils.toHex(estimatedCost * 10**decimals);
  const erc20Address = getAddressesByChain().ERC20ContractAddress;

  // approve
  const gasLimitApprouve = await erc20Contract.methods
    .approve(bitcoinInscriptionContractAddress, cost)
    .estimateGas({
      from: connectedWallet,
      to: erc20Address,
    });

  await erc20Contract.methods
    .approve(bitcoinInscriptionContractAddress, cost)
    .send({
      from: connectedWallet,
      to: erc20Address,
      gasLimit: gasLimitApprouve,
    });

  const gasLimit = await bitcoinInscription.methods
    .requestInscription(fileSize)
    .estimateGas({
      from: connectedWallet,
      to: bitcoinInscriptionContractAddress,
    });
  console.log("gasLimit estimated for inscription");
  console.log(gasLimit);
  // const res = await bitcoinInscription.methods.requestInscription(`${fileSize}`).send({
  //   from: connectedWallet,
  //   to: bitcoinInscriptionContractAddress,
  //   gasLimit,
  // });
  console.log("res of requestInscription");
  // console.log(res);
};
