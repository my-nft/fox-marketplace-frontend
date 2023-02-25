//IMPORTANT import { Chain } from 'wagmi'

const fxChainId = Number(process.env.REACT_APP_RPC_CHAIN_ID_FX);

export const fxgChain = {
    id: fxChainId,
    name: 'FXG',
    network: 'FX',
    nativeCurrency: {
      decimals: 18,
      name: 'FXG',
      symbol: 'FXG',
    },
    rpcUrls: {
      default: { http: [process.env.REACT_APP_RPC_URL_FX] },
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: process.env.REACT_APP_BLOCEXPLORER_FX },
    },
  }

//IMPORTANT import { Chain } from 'wagmi'

const polygId = Number(process.env.REACT_APP_RPC_CHAIN_ID_POLYG);

export const polygChain = {
    id: polygId,
    name: 'mumbai',
    network: 'mumbai',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC',
    },
    rpcUrls: {
      default: { http: [process.env.REACT_APP_RPC_URL_POLYG] },
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: process.env.REACT_APP_BLOCEXPLORER_POLYG },
    },
  }