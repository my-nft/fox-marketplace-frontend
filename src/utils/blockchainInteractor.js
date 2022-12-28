import Web3 from "web3";
import MarketPlace from "./contracts/marketPlace.json";
import ERC721 from "./contracts/ERC721.json";
import ERC20 from "./contracts/ERC20.json";
import AUCTION from "./contracts/AUCTION.json";
import LOADER from "./contracts/LOADER.json";
import FIXED_PRICE from "./contracts/MultiContractMarketPlaceABI.json";
import OFFER_SYSTEM from "./contracts/OFFERSYSTEM.json";
import FOX_MASTER from "./contracts/FOX_MASTER.json";
import FACTORY from "./contracts/FACTORY.json";
import { authProvider } from "./web3ModalInteractor";

let infura = "https://testnet-fx-json-web3.functionx.io:8545";
export let web3Infura = new Web3(infura);
// injectProvider
export const authProviderInstance = authProvider();

export const marketplaceContractAddress = "";
export const ERC721ContractAddress = "";

export const FIXEDContractAddress =
  "0x50f29e8dcf778Cb25405Bb74218A10eB3460B622";

export const ERC20ContractAddress =
  "0x7A060167b9d9508896c04a506a0BFf4e6A1C37e7";

export const AUTIONContractAddress =
  "0xB0BCED0883272Bda6fA4Ae45bB4a56624BC140e7";

export const LoaderContractAddress =
  "0x4e749ecaa475888eE8df3B749f69f92Ec42Cc514";

export const OfferSystemAddress = "0x2d6e99Accd37f6A267943fdf005e3122A96F6b9D";

export const foxMasterCollectionAddress =
  "0x2C9952D9CE9494cF63E16e398EcE65522651C41c";

export const factoryCollectionAddress =
  "0xcc63AccC3d63e8e2f0075cfcd994197f7923233F";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export async function loadMarketplaceContract(readOnly = false) {
  let web3Instance = web3Infura;
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(MarketPlace, marketplaceContractAddress);
}

export async function loadERC721Contract(collectionAddress, readOnly = false) {
  let web3Instance = web3Infura;
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(ERC721, collectionAddress);
}
export async function loadERC20Contract(readOnly = false) {
  let web3Instance = web3Infura;
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(ERC20, ERC20ContractAddress);
}

export async function loadCollectionContract(collectionAddress) {
  const web3 = await authProviderInstance.getInjectedWeb3();

  return new web3.eth.Contract(ERC721ContractAddress, collectionAddress);
}

export async function loadAuctionContract(readOnly = false) {
  let web3Instance = web3Infura;
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(AUCTION, AUTIONContractAddress);
}

export async function loadAFixedPriceContract(readOnly = false) {
  let web3Instance = web3Infura;
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(FIXED_PRICE, FIXEDContractAddress);
}

export async function loaderContract() {
  const web3 = await authProviderInstance.getInjectedWeb3();

  return new web3.eth.Contract(LOADER, LoaderContractAddress);
}

export async function loadOfferSystemContract(readOnly = false) {
  let web3Instance = web3Infura;
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(OFFER_SYSTEM, OfferSystemAddress);
}

export async function loadFoxMasterCollectionContract(collectionAddress) {
  const web3 = await authProviderInstance.getInjectedWeb3();

  return new web3.eth.Contract(FOX_MASTER, collectionAddress);
}

export async function loadFactoryContract() {
  const web3 = await authProviderInstance.getInjectedWeb3();

  return new web3.eth.Contract(FACTORY, factoryCollectionAddress);
}

export const getCurrentWalletConnected = async () => {
  const web3 = await authProviderInstance.getInjectedWeb3();

  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};
