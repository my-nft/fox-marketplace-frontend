import {
  AUTIONContractAddress,
  ERC20ContractAddress,
  getCurrentWalletConnected,
  loadAuctionContract,
  loadERC721Contract,
  web3,
} from "../utils/blockchainInteractor";

const auctionContract = loadAuctionContract();

export const createAuction = async (
  collectionAddress,
  tokenID,
  initialPrice,
  endAuction
) => {
  console.table({
    collectionAddress,
    tokenID,
    initialPrice,
    endAuction,
  });
  const connectWallet = getCurrentWalletConnected();
  const price = web3.utils.toHex(initialPrice * 10 ** 18);

  const erc721Contract = loadERC721Contract(collectionAddress);

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

  auctionContract.methods
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
};
