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
import { getNetwork } from "@wagmi/core";
import {
  AUTIONContractAddressFX,
  AUTIONContractAddressPOLYG,
  blockExplorerFX,
  blockExplorerPOLYG,
  ERC20ContractAddressFX,
  ERC20ContractAddressPOLYG,
  factoryCollectionAddressFX,
  factoryCollectionAddressPOLYG,
  FIXEDContractAddressFX,
  FIXEDContractAddressPOLYG,
  foxGenesisCollectionAddressFX,
  foxGenesisCollectionAddressPOLYG,
  foxMasterCollectionAddressFX,
  foxMasterCollectionAddressPOLYG,
  LoaderContractAddressFX,
  LoaderContractAddressPOLYG,
  OfferSystemAddressFX,
  OfferSystemAddressPOLYG,
  rpc_chain_id_fx,
  rpc_chain_id_polyg,
  rpc_url_fx,
  rpc_url_polyg,
  transactionExplorerFX,
  transactionExplorerPOLYG,
} from "./chains/variables";

// injectProvider
export const authProviderInstance = authProvider();

export const marketplaceContractAddress = "";
export const ERC721ContractAddress = "";

export function getAddressesByChain() {
  const { chain } = getNetwork();

  if (chain?.id === Number(rpc_chain_id_polyg)) {
    return {
      FIXEDContractAddress: FIXEDContractAddressPOLYG,
      ERC20ContractAddress: ERC20ContractAddressPOLYG,
      AUTIONContractAddress: AUTIONContractAddressPOLYG,
      LoaderContractAddress: LoaderContractAddressPOLYG,
      OfferSystemAddress: OfferSystemAddressPOLYG,
      foxMasterCollectionAddress: foxMasterCollectionAddressPOLYG,
      factoryCollectionAddress: factoryCollectionAddressPOLYG,
      foxGenesisCollectionAddress: foxGenesisCollectionAddressPOLYG,
      rpc_url: rpc_url_polyg,
      rpc_chain_id: rpc_chain_id_polyg,
      blockExplorer: blockExplorerPOLYG,
      transactionExplorer: transactionExplorerPOLYG,
    };
  } else {
    return {
      FIXEDContractAddress: FIXEDContractAddressFX,
      ERC20ContractAddress: ERC20ContractAddressFX,
      AUTIONContractAddress: AUTIONContractAddressFX,
      LoaderContractAddress: LoaderContractAddressFX,
      OfferSystemAddress: OfferSystemAddressFX,
      foxMasterCollectionAddress: foxMasterCollectionAddressFX,
      factoryCollectionAddress: factoryCollectionAddressFX,
      foxGenesisCollectionAddress: foxGenesisCollectionAddressFX,
      rpc_url: rpc_url_fx,
      rpc_chain_id: rpc_chain_id_fx,
      blockExplorer: blockExplorerFX,
      transactionExplorer: transactionExplorerFX,
    };
  }
}

export let web3Infura = () => new Web3(getAddressesByChain().rpc_url);

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export async function loadMarketplaceContract(readOnly = false) {
  let web3Instance = web3Infura();
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(MarketPlace, marketplaceContractAddress);
}

export async function loadERC721Contract(collectionAddress, readOnly = false) {
  let web3Instance = web3Infura();
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(ERC721, collectionAddress);
}
export async function loadERC20Contract(readOnly = false) {
  let web3Instance = web3Infura();
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
  let web3Instance = web3Infura();
  if (!readOnly) {
    web3Instance = await authProviderInstance.getInjectedWeb3();
  }
  return new web3Instance.eth.Contract(
    AUCTION,
    getAddressesByChain().AUTIONContractAddress
  );
}

export async function loadAFixedPriceContract(readOnly = false) {
  let web3Instance = web3Infura();
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
  let web3Instance = web3Infura();
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
  let web3Instance = web3Infura();
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
