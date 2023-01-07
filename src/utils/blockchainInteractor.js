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

let infura = process.env.REACT_APP_RPC_URL;


export let web3Infura = new Web3(infura);
// injectProvider
export const authProviderInstance = authProvider();

export const marketplaceContractAddress = "";
export const ERC721ContractAddress = "";


export const FIXEDContractAddress = process.env.REACT_APP_FIXEDContractAddress;

export const ERC20ContractAddress = process.env.REACT_APP_ERC20ContractAddress;

export const AUTIONContractAddress = process.env.REACT_APP_AUTIONContractAddress;

export const LoaderContractAddress = process.env.REACT_APP_LoaderContractAddress;

export const OfferSystemAddress = process.env.REACT_APP_OfferSystemAddress;

export const foxMasterCollectionAddress = process.env.REACT_APP_foxMasterCollectionAddress;

export const factoryCollectionAddress = process.env.REACT_APP_factoryCollectionAddress;

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
