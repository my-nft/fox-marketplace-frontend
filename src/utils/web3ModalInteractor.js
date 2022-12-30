import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";

let provider = null;

const STORAGE_PROVIDER = "STORAGE_PROVIDER"

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: { 90001: "https://testnet-fx-json-web3.functionx.io:8545" },
      infuraId: "9c7e70b4bf234955945ff87b8149926e",
    },
  },
};

const web3Modal = new Web3Modal({
  //cacheProvider: false,
  disableInjectedProvider: false,
  cacheProvider: true, // very important
  providerOptions,
});

export const authProvider = () => {
  return {
    login: async () => {
      web3Modal.clearCachedProvider();
      provider = await web3Modal.connect();
      const ethersProvider = new providers.Web3Provider(provider)
      const userAddress = await ethersProvider.getSigner().getAddress()
      return Promise.resolve(userAddress);
    },

    connectedWallet: async () => {
      provider = await web3Modal.connect();
      const ethersProvider = new providers.Web3Provider(provider)
      const userAddress = await ethersProvider.getSigner().getAddress()
      return Promise.resolve(userAddress);
    },

    logout: async () => {
      provider = await web3Modal.connect();
      if (provider && provider.close) {
        await provider.close();
      }
      web3Modal.clearCachedProvider();
      
      return Promise.resolve();
    },

    getInjectedWeb3: async () => {
      console.log("########getInjectedWeb3##########");
      provider = await web3Modal.connect();
      return new Web3(provider);
    },

    getProvider: async () => {
      provider = await web3Modal.connect();
      return provider;
    },

    getSigner :  async () => {
      provider = await web3Modal.connect();
      const etherProvider = new ethers.providers.Web3Provider(provider); 
      const signer = etherProvider.getSigner();    
      return signer;
    },

    addListners: async ({ clearSession = () => {} }) => {
      provider = await web3Modal.connect();
      provider.on("accountsChanged", (accounts) => {
        console.log("########accountsChanged##########");
        clearSession();
      });

      // Subscribe to chainId change
      provider.on("chainChanged", async (chainId) => {
        console.log("########chainChanged##########");
        web3Modal.clearCachedProvider();
        clearSession();
      });

      provider.on("disconnect", async (chainId) => {
        console.log("########disconnect##########");
        web3Modal.clearCachedProvider();
        clearSession();
      });
    },
  };
};
