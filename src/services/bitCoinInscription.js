import apiUrl from "../config/api";
import methods from "../config/axiosConfig";
import {
  bitcoinInscriptionContractAddress,
  getAddressesByChain,
  getCurrentWalletConnected,
  loadBitCoinInscriptionContract,
  loadERC20Contract,
  web3Infura
} from "../utils/blockchainInteractor";

export const estimateCost = async (fileSizeInBytes) => {
  const bitcoinInscription = await loadBitCoinInscriptionContract();
  const ERC20Contract = await loadERC20Contract();
  const rawCost = await bitcoinInscription.methods
    .estimateCost(fileSizeInBytes)
    .call();
  const decimals = await ERC20Contract.methods.decimals().call();
  return Math.ceil(+rawCost / 10 ** decimals);
};

export const requestInscription = async (
  imageFile,
  fileSize,
  estimatedCost,
  receiverAddress,
  token
) => {
  console.log('token is: ');
  console.log(token);

  const web3 = web3Infura();
  const erc20Contract = await loadERC20Contract();
  const bitcoinInscription = await loadBitCoinInscriptionContract();
  const connectedWallet = await getCurrentWalletConnected();
  const decimals = await erc20Contract.methods.decimals().call();

  const poweredValue = estimatedCost * 10 ** +decimals;
  const stringifiedPoweredValue = poweredValue
    .toLocaleString("fullwide", { maximumFractionDigits: 0 })
    .replace(/,/g, "");

  const cost = web3.utils.toHex(stringifiedPoweredValue);
  const erc20Address = getAddressesByChain().ERC20ContractAddress;

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

  const fxPrice = await bitcoinInscription.methods.fxPrice().call();

  const gasLimit = await bitcoinInscription.methods
    .requestInscription(fileSize)
    .estimateGas({
      from: connectedWallet,
      to: bitcoinInscriptionContractAddress,
      value: fxPrice,
    });

  await bitcoinInscription.methods.requestInscription(fileSize).send({
    from: connectedWallet,
    to: bitcoinInscriptionContractAddress,
    gasLimit,
    value: fxPrice,
  });

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("dto", JSON.stringify(
    {
      mintfileSize: fileSize,
      receiverAddress: receiverAddress
    }
  ))

  const inscriptionRes = await methods.post(`${apiUrl}utils/send-inscription`, 
    formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
      "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
    },
  });

  console.log('requestInscription post result');
  console.log(inscriptionRes);
};
