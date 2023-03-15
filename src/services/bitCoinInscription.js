import { loadBitCoinInscriptionContract } from "../utils/blockchainInteractor";

export const estimateCost = async (fileSizeInBytes) => {
  const bitcoinInscription = await loadBitCoinInscriptionContract();
  return await bitcoinInscription.methods.estimateCost(fileSizeInBytes).call();
};
