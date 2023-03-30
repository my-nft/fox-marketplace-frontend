import apiUrl from "../config/api";
import methods from "../config/axiosConfig";
import { getAddressesByChain } from "../utils/blockchainInteractor";
const nft1155Endpoint = `${apiUrl}collections/erc1155/tokens`;

export const getListedNfts1155 = () => {
    return methods.get(`${nft1155Endpoint}`, {
      headers: {
        "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
      },
    });
  };