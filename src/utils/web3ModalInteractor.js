import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";

let provider = null;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "9c7e70b4bf234955945ff87b8149926e",
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // very important
  providerOptions,
});


export const authProvider = () => {
  return {
    login: async () => {
      provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      return Promise.resolve({
        address: accounts[0]
      });
    },

    logout: async () => {
      provider = await web3Modal.connect();
      if (provider && provider.close) {
        await provider.close;

        provider = null;
        web3Modal.clearCachedProvider();
      }
      return Promise.resolve();
    },

    getInjectedWeb3: async () => {
      provider = await web3Modal.connect();
      return new Web3(provider);
    },

    addListners : ({clearSession = () => {}}) => {
      provider.on("accountsChanged", (accounts) => {
        clearSession();
        window.location.reload()
      });
      
      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        clearSession();
        window.location.reload()
      });
    }
  };
};
