import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";

let provider = null;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: { [process.env.REACT_APP_RPC_CHAIN_ID]: process.env.REACT_APP_RPC_URL },
      infuraId: process.env.REACT_APP_INFURA_ID,
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

    logout: async () => {
      provider = await web3Modal.connect();
      if (provider && provider.close) {
        await provider.close();
      }
      web3Modal.clearCachedProvider();
      
      return Promise.resolve();
    },

    getInjectedWeb3: async () => {
      provider = await web3Modal.connect();
      return new Web3(provider);
    },

    getProvider: async () => {
      provider = await web3Modal.connect();
      const web3Provider = new providers.Web3Provider(provider);
      return web3Provider;
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
