import { Chain } from 'wagmi'
 
export const fxgChain = {
  id: 43_114,
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
  /*
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11907934,
    },
  },
  */
}