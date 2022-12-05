import {
  AUTIONContractAddress,
  ERC20ContractAddress,
  getCurrentWalletConnected,
  loadAuctionContract,
  loadERC721Contract,
  loaderContract,
  web3,
} from "../utils/blockchainInteractor";

import { setNftToListed } from "../api/nftApi";
import { toast } from "react-toastify";

const auctionContract = loadAuctionContract();

export const nftLoader = async (collectionAddress) => {
  const contract = loaderContract();
  const connectWallet = getCurrentWalletConnected();

  const tx = await contract.methods
    .getTokens(connectWallet, 1, 100, collectionAddress)
    .call();

  console.log("MYNFTS", tx);
};

export const createAuction = async (
  collectionAddress,
  tokenID,
  initialPrice,
  endAuction,
  listingType
) => {
  try {
    const connectWallet = getCurrentWalletConnected();
    const price = web3.utils.toHex(initialPrice * 10 ** 18);
    const erc721Contract = loadERC721Contract(collectionAddress);

    console.log("TOKENID : ", tokenID);
    console.log("PRICE : ", collectionAddress);
    console.log("WALLET : ", connectWallet);

    const gasLimitApprouve = await erc721Contract.methods
      .approve(AUTIONContractAddress, tokenID)
      .estimateGas({
        from: connectWallet,
        to: collectionAddress,
      });

    await erc721Contract.methods.approve(AUTIONContractAddress, tokenID).send({
      from: connectWallet,
      to: collectionAddress,
      gasLimit: gasLimitApprouve,
    });

    const gasLimit = await auctionContract.methods
      .createAuction(
        collectionAddress,
        ERC20ContractAddress,
        tokenID,
        price,
        endAuction
      )
      .estimateGas({
        from: connectWallet,
        to: AUTIONContractAddress,
      });

    const tnx = await auctionContract.methods
      .createAuction(
        collectionAddress,
        ERC20ContractAddress,
        tokenID,
        price,
        endAuction
      )
      .send({
        from: connectWallet,
        to: AUTIONContractAddress,
        gasLimit,
      });

    // Mark the NFT as Listed in DB
    await setNftToListed(collectionAddress, tokenID, listingType);
    toast.success("Auction created with success !");

    return tnx;
  } catch (error) {
    toast.error("Something went wrong!");
    console.error(error);
  }
};
