//IMPORTANT import { Chain } from 'wagmi'

import { rpc_chain_id_fx, rpc_chain_id_polyg } from "./variables";


export const fxgChain = {
    id: Number(rpc_chain_id_fx),
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


export const polygChain = {
    id: Number(rpc_chain_id_polyg),
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