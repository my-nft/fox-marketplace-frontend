import Web3 from "web3";
import { fetchSigner } from '@wagmi/core'
 
export const authProvider = () => {
  return {
    getInjectedWeb3: async () => {
      const signer = await fetchSigner()
      return new Web3(signer?.provider?.provider)
    }
  };
};
