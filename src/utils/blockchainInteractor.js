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
import FOX_GENISIS from "./contracts/FOX_GENESIS.json";
import { authProvider } from "./web3ModalInteractor";

// injectProvider
export const authProviderInstance = authProvider();

export const marketplaceContractAddress = "";
export const ERC721ContractAddress = "";

const addressFactory = {
  fx: {
    FIXEDContractAddress: process.env.REACT_APP_FIXEDContractAddressFX,
    ERC20ContractAddress: process.env.REACT_APP_ERC20ContractAddressFX,
    AUTIONContractAddress: process.env.REACT_APP_AUTIONContractAddressFX,
    LoaderContractAddress: process.env.REACT_APP_LoaderContractAddressFX,
    OfferSystemAddress: process.env.REACT_APP_OfferSystemAddressFX,
    foxMasterCollectionAddress:
      process.env.REACT_APP_foxMasterCollectionAddressFX,
    factoryCollectionAddress: process.env.REACT_APP_factoryCollectionAddressFX,
    foxGenesisCollectionAddress:
      process.env.REACT_APP_foxGenesisCollectionAddressFX,
    rpc_url: process.env.REACT_APP_RPC_URL_FX,
    rpc_chain_id: process.env.REACT_APP_RPC_CHAIN_ID_FX,
    blockExplorer: process.env.REACT_APP_BLOCEXPLORER_FX,
    transactionExplorer: process.env.REACT_APP_TRANSACTION_EXPLORER_FX,
  },
  poly: {
    FIXEDContractAddress: process.env.REACT_APP_FIXEDContractAddressPOLYG,
    ERC20ContractAddress: process.env.REACT_APP_ERC20ContractAddressPOLYG,
    AUTIONContractAddress: process.env.REACT_APP_AUTIONContractAddressPOLYG,
    LoaderContractAddress: process.env.REACT_APP_LoaderContractAddressPOLYG,
    OfferSystemAddress: process.env.REACT_APP_OfferSystemAddressPOLYG,
    foxMasterCollectionAddress:
      process.env.REACT_APP_foxMasterCollectionAddressPOLYG,
    factoryCollectionAddress:
      process.env.REACT_APP_factoryCollectionAddressPOLYG,
    foxGenesisCollectionAddress:
      process.env.REACT_APP_foxGenesisCollectionAddressPOLYG,
    rpc_url: process.env.REACT_APP_RPC_URL_POLYG,
    rpc_chain_id: process.env.REACT_APP_RPC_CHAIN_ID_POLYG,
    blockExplorer: process.env.REACT_APP_BLOCEXPLORER_POLYG,
    transactionExplorer: process.env.REACT_APP_TRANSACTION_EXPLORER_POLYG,
  },
};

export function getAddressesByChain() {
  let chain = localStorage.getItem("chainId")
    ? JSON.parse(localStorage.getItem("chainId"))?.label.toLowerCase()
    : "fx";
  if (chain === "fx") {
    return {
      FIXEDContractAddress: process.env.REACT_APP_FIXEDContractAddressFX,
      ERC20ContractAddress: process.env.REACT_APP_ERC20ContractAddressFX,
      AUTIONContractAddress: process.env.REACT_APP_AUTIONContractAddressFX,
      LoaderContractAddress: process.env.REACT_APP_LoaderContractAddressFX,
      OfferSystemAddress: process.env.REACT_APP_OfferSystemAddressFX,
      foxMasterCollectionAddress:
        process.env.REACT_APP_foxMasterCollectionAddressFX,
      factoryCollectionAddress:
        process.env.REACT_APP_factoryCollectionAddressFX,
      foxGenesisCollectionAddress:
        process.env.REACT_APP_foxGenesisCollectionAddressFX,
      rpc_url: process.env.REACT_APP_RPC_URL_FX,
      rpc_chain_id: process.env.REACT_APP_RPC_CHAIN_ID_FX,
      blockExplorer: process.env.REACT_APP_BLOCEXPLORER_FX,
      transactionExplorer: process.env.REACT_APP_TRANSACTION_EXPLORER_FX,
    };
  } else if (chain === "poly") {
    return {
      FIXEDContractAddress: process.env.REACT_APP_FIXEDContractAddressPOLYG,
      ERC20ContractAddress: process.env.REACT_APP_ERC20ContractAddressPOLYG,
      AUTIONContractAddress: process.env.REACT_APP_AUTIONContractAddressPOLYG,
      LoaderContractAddress: process.env.REACT_APP_LoaderContractAddressPOLYG,
      OfferSystemAddress: process.env.REACT_APP_OfferSystemAddressPOLYG,
      foxMasterCollectionAddress:
        process.env.REACT_APP_foxMasterCollectionAddressPOLYG,
      factoryCollectionAddress:
        process.env.REACT_APP_factoryCollectionAddressPOLYG,
      foxGenesisCollectionAddress:
        process.env.REACT_APP_foxGenesisCollectionAddressPOLYG,
      rpc_url: process.env.REACT_APP_RPC_URL_POLYG,
      rpc_chain_id: process.env.REACT_APP_RPC_CHAIN_ID_POLYG,
      blockExplorer: process.env.REACT_APP_BLOCEXPLORER_POLYG,
      transactionExplorer: process.env.REACT_APP_TRANSACTION_EXPLORER_POLYG,
    };
  }
}

export let web3Infura = new Web3(getAddressesByChain().rpc_url);

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
  return new web3Instance.eth.Contract(
    ERC20,
    getAddressesByChain().ERC20ContractAddress
  );
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
  return new web3Instance.eth.Contract(
    AUCTION,
    getAddressesByChain().AUTIONContractAddress
  );
}

export async function loadAFixedPriceContract(readOnly = false) {
  let web3Instance = web3Infura;
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(
    FIXED_PRICE,
    getAddressesByChain().FIXEDContractAddress
  );
}

export async function loaderContract() {
  const web3 = await authProviderInstance.getInjectedWeb3();

  return new web3.eth.Contract(
    LOADER,
    getAddressesByChain().LoaderContractAddress
  );
}

export async function loadOfferSystemContract(readOnly = false) {
  let web3Instance = web3Infura;
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(
    OFFER_SYSTEM,
    getAddressesByChain().OfferSystemAddress
  );
}

export async function loadFoxMasterCollectionContract(collectionAddress) {
  const web3 = await authProviderInstance.getInjectedWeb3();

  return new web3.eth.Contract(FOX_MASTER, collectionAddress);
}

export async function loadFoxGenisisContract(readOnly = false) {
  console.log("##########", getAddressesByChain().foxGenesisCollectionAddress);
  let web3Instance = web3Infura;
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(
    FOX_GENISIS,
    getAddressesByChain().foxGenesisCollectionAddress
  );
}

export async function loadFactoryContract() {
  const web3 = await authProviderInstance.getInjectedWeb3();

  return new web3.eth.Contract(
    FACTORY,
    getAddressesByChain().factoryCollectionAddress
  );
}

export const getCurrentWalletConnected = async () => {
  const web3 = await authProviderInstance.getInjectedWeb3();

  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};
