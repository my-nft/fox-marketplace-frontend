import Web3 from "web3";
import MarketPlace from "./contracts/marketPlace.json";
import ERC721 from "./contracts/ERC721.json";
import ERC20 from "./contracts/ERC20.json";
import AUCTION from "./contracts/AUCTION.json";
import LOADER from './contracts/LOADER.json';
import FIXED_PRICE from './contracts/MultiContractMarketPlaceABI.json'
import OFFER_SYSTEM from './contracts/OFFERSYSTEM.json';

let infura = "https://testnet-fx-json-web3.functionx.io:8545"
let web3Infura = new Web3(infura);



export const marketplaceContractAddress = "";
export const ERC721ContractAddress = "";


export const FIXEDContractAddress = "0xD4efCc65F493f9DD9A343Ef91B10706a5226E1a1";
export const ERC20ContractAddress = "0x7A060167b9d9508896c04a506a0BFf4e6A1C37e7";
export const AUTIONContractAddress = "0x8b428414eE3c481d6062d0e9314D6b7e4B140445";
export const LoaderContractAddress = "0x4e749ecaa475888eE8df3B749f69f92Ec42Cc514";
export const OfferSystemAddress = "0xF8716Ff8aFB1390B51FfFfE50C8Ff87e536Cf7b3";

export const ethereum = window.ethereum;
export const web3 = new Web3(ethereum);

export function loadMarketplaceContract(readOnly = false) {
  const web3Instance = readOnly ? web3Infura : web3;
  return  new web3Instance.eth.Contract(MarketPlace, marketplaceContractAddress);
}

export function loadERC721Contract(collectionAddress, readOnly = false) {
  const web3Instance = readOnly ? web3Infura : web3;
  return new web3Instance.eth.Contract(ERC721, collectionAddress);
}
export function loadERC20Contract() {
  return new web3.eth.Contract(ERC20, ERC20ContractAddress);
}

export function loadCollectionContract(collectionAddress) {
  return new web3.eth.Contract(ERC721ContractAddress, collectionAddress);
}

export function loadAuctionContract(readOnly = false) {
  const web3Instance = readOnly ? web3Infura : web3;
  return new web3Instance.eth.Contract(AUCTION, AUTIONContractAddress);
}


export function loadAFixedPriceContract(readOnly = false) {
  const web3Instance = readOnly ? web3Infura : web3;
  return new web3Instance.eth.Contract(FIXED_PRICE, FIXEDContractAddress);
}

export function loaderContract() {
  return new web3.eth.Contract(LOADER, LoaderContractAddress)
}

export function loadOfferSystemContract() {
  return new web3.eth.Contract(OFFER_SYSTEM, OfferSystemAddress)
}

export function connectWallet() {
  ethereum.request({
    method: "eth_requestAccounts",
  });
}
export function getCurrentWalletConnected() {
  return window.ethereum ? window.ethereum.selectedAddress : "";
}
