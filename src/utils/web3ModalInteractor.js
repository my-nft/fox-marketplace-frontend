import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";

let provider = null;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        [process.env.REACT_APP_RPC_CHAIN_ID]: process.env.REACT_APP_RPC_URL,
      },
      infuraId: process.env.REACT_APP_INFURA_ID,
      supportedChainIds: [process.env.REACT_APP_RPC_CHAIN_ID],
      chainId: process.env.REACT_APP_RPC_CHAIN_ID,
    },
  },
};

const web3Modal = new Web3Modal({
  //cacheProvider: false,
  disableInjectedProvider: false,
  cacheProvider: true, // very important
  providerOptions,
});



const verifyAndRequestChangeNetwork = async (chainId, providerInjected) => {
  console.log("verifyAndRequestChangeNetwork");

  if (chainId !== process.env.REACT_APP_RPC_CHAIN_ID) {
    await providerInjected.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: Web3.utils.toHex(process.env.REACT_APP_RPC_CHAIN_ID),
          rpcUrls: [process.env.REACT_APP_RPC_URL],
          chainName: process.env.REACT_APP_RPC_CHAIN_NAME,
          nativeCurrency: {
            name: process.env.REACT_APP_RPC_SYMBOL,
            symbol: process.env.REACT_APP_RPC_SYMBOL,
            decimals: 18
        },
          blockExplorerUrls: [process.env.REACT_APP_RPC_URL_EXPLORER]
        },
      ],
    });
  }
};

export const authProvider = () => {
  return {
    login: async () => {
      web3Modal.clearCachedProvider();
      provider = await web3Modal.connect();
      const ethersProvider = new providers.Web3Provider(provider);
      const userAddress = await ethersProvider.getSigner().getAddress();

      const { chainId } = await ethersProvider.getNetwork();

      console.log("CHAAAIN ID", chainId);
      
      await verifyAndRequestChangeNetwork(chainId, provider);
      

      return Promise.resolve(userAddress);
    },

    logout: async () => {
      console.log("logout");

      provider = await web3Modal.connect();
      if (provider && provider.close) {
        await provider.close();
      }
      web3Modal.clearCachedProvider();

      return Promise.resolve();
    },

    getInjectedWeb3: async () => {
      console.log("getInjectedWeb3");

      provider = await web3Modal.connect();
      return new Web3(provider);
    },

    getProvider: async () => {
      console.log("getProvider");
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
        await verifyAndRequestChangeNetwork(chainId, provider);
      });

      provider.on("disconnect", async () => {
        console.log("########disconnect##########");
        web3Modal.clearCachedProvider();
        clearSession();
      });
    },
  };
};
