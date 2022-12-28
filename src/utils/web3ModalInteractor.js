import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";

let provider = null;

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
  cacheProvider: true, // very important
  providerOptions,
});

export const authProvider = () => {
  return {
    login: async () => {
      provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      return Promise.resolve(accounts[0]);
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
      await provider.enable();
      return new Web3(provider);
    },

    addListners: async ({ clearSession = () => {} }) => {
      provider = await web3Modal.connect();
      provider.on("accountsChanged", (accounts) => {
        console.log("########accountsChanged##########");
        clearSession();
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        console.log("########chainChanged##########");
        clearSession();
      });

      provider.on("disconnect", (chainId) => {
        console.log("########disconnect##########");
        clearSession();
      });
    },
  };
};
