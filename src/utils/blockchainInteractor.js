import Web3 from "web3";
import MarketPlace from "./contracts/marketPlace.json";
import ERC721 from "./contracts/ERC721.json";
import ERC20 from "./contracts/ERC20.json";
import AUCTION from "./contracts/AUCTION.json";


export const marketplaceContractAddress = "";
export const ERC721ContractAddress = "";
export const ERC20ContractAddress = "0x7A060167b9d9508896c04a506a0BFf4e6A1C37e7";
export const AUTIONContractAddress = "0xD22A29FbAeb5fF894673735cde19b47f790e08aa";

export const ethereum = window.ethereum;
export const web3 = new Web3(ethereum);

export function loadMarketplaceContract() {
  return new web3.eth.Contract(MarketPlace, marketplaceContractAddress);
}

export function loadERC721Contract(collectionAddress) {
  return new web3.eth.Contract(ERC721, collectionAddress);
}
export function loadERC20Contract() {
  return new web3.eth.Contract(ERC20, ERC20ContractAddress);
}

export function loadCollectionContract(collectionAddress) {
  return new web3.eth.Contract(ERC721ContractAddress, collectionAddress);
}

export function loadAuctionContract() {
  return new web3.eth.Contract(AUCTION, AUTIONContractAddress);
}

export function connectWallet() {
  ethereum.request({
    method: "eth_requestAccounts",
  });
}
export function getCurrentWalletConnected() {
  return window.ethereum ? window.ethereum.selectedAddress : "";
}
