import Web3 from "web3";
import MarketPlace from "./contracts/marketPlace.json";
import ERC721 from "./contracts/ERC721.json";
import ERC20 from "./contracts/ERC20.json";

export const marketplaceContractAddress = "";
export const ERC721ContractAddress = "";
export const ERC20ContractAddress = "";

export const ethereum = window.ethereum;
export const web3 = new Web3(ethereum);

export function loadMarketplaceContract() {
  return new web3.eth.Contract(MarketPlace, marketplaceContractAddress);
}

export function loadERC721Contract() {
  return new web3.eth.Contract(ERC721, ERC721ContractAddress);
}
export function loadERC20Contract() {
  return new web3.eth.Contract(ERC20, ERC20ContractAddress);
}

export function loadCollectionContract(collectionAddress) {
  return new web3.eth.Contract(ERC721ContractAddress, collectionAddress);
}

export function connectWallet() {
  ethereum.request({
    method: "eth_requestAccounts",
  });
}
export function getCurrentWalletConnected() {
  return window.ethereum ? window.ethereum.selectedAddress : "";
}
