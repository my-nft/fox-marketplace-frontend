//IMPORTANT import { Chain } from 'wagmi'
 
const networkId = Number(process.env.REACT_APP_RPC_CHAIN_ID);

export const fxgChain = {
  id: networkId,
  name: 'FXG',
  network: 'FX',
  nativeCurrency: {
    decimals: 18,
    name: 'FXG',
    symbol: 'FXG',
  },
  rpcUrls: {
    default: { http: [process.env.REACT_APP_RPC_URL] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: process.env.REACT_APP_RPC_URL_EXPLORER },
  },
}