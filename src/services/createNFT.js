import Web3 from "web3";
import apiUrl from "../config/api";
import methods from "../config/axiosConfig";
import {
  loadERC20Contract,
  loadMarketplaceContract,
  marketplaceContractAddress,
  ERC20ContractAddress,
  ethereum,
} from "../utils/blockchainInteractor";

const erc20Contract = loadERC20Contract();
const marketplaceContract = loadMarketplaceContract();

export async function getMintFees() {
  return await marketplaceContract.methods.mintFee().call();
}

export const mintNft = (collectionAddress, data) => {
  // getting mint fees  
  const mintFees = getMintFees();
  // approving the minting transaction
  approveSpenderERC20(collectionAddress, mintFees);
  // executing minting
  const tokenID = executeMinting();
  // creating new NFT
  createNftDB(data, tokenID, collectionAddress);
};

export const approveSpenderERC20 = async (
  collectionAddress = marketplaceContractAddress,
  mintFee
) => {
  let arg = {
    from: ethereum.selectedAddress,
    to: ERC20ContractAddress,
  };

  const gasLimit = await erc20Contract.methods
    .approve(collectionAddress, mintFee)
    .estimateGas(arg);

  await erc20Contract.methods.approve(collectionAddress, mintFee).send({
    ...arg,
    gasLimit,
  });
};

export const executeMinting = async () => {
  const arg = {
    from: ethereum.selectedAddress,
    to: marketplaceContractAddress,
  };
  const gasLimit = await marketplaceContract.methods.mint().estimateGas(arg);

  const tnx = await marketplaceContract.methods.mint().send({
    ...arg,
    gasLimit,
  });

  return getTokenIdFromTxn(tnx);
};

export function getTokenIdFromTxn(txn) {
  return Web3.utils.hexToNumber(txn.events[0].raw.topics[3]);
}

export const createNftDB = async (data, token, collectionAddress) => {
  const {
    upload,
    artworkName,
    artistName,
    email,
    description,
    rightsLevel,
    rightsDuration,
    walletAddress,
  } = data;

  const outputDataMap = {
    name: artworkName,
    artistName,
    description,
    image: "http://external_image.com",
    ownerAddress: walletAddress,
    isListed: false
  };

  console.log("*******************************************");
  console.log("CREATING NEW NFT");
  console.log("OUTPUT DATA MAP: " + JSON.stringify(outputDataMap));
  console.log("TOKEN: " + token);
  console.log("COLLECTION ADDRESS: " + collectionAddress);

  //call createNFTService to create new NFT
  await methods.post(
    `${apiUrl}collections/${collectionAddress}/nfts/${token}`,
    outputDataMap
  );
};
