import apiUrl from "../config/api";
import methods from "../config/axiosConfig";
import { getAddressesByChain } from "../utils/blockchainInteractor";

const collectionEndpoint = apiUrl + "collections/";

export function importCollectionCall(collectionAddress, token, sameOrigin) {
  return methods.post(
    `${collectionEndpoint}${collectionAddress}/import`,
    {
      sameOrigin: sameOrigin ? true : false,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
        "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
      },
    }
  );
}

export function importCollectionCall1155(collectionAddress, token, tokens) {
  return methods.post(
    `${collectionEndpoint}${collectionAddress}/import-erc1155`,
    {
      tokens,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
        "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
      },
    }
  );
}

export function importCollectionToken(collectionAddress, tokenID, token) {
  return methods.post(
    `${collectionEndpoint}${collectionAddress}/${tokenID}/import`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
        "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
      },
    }
  );
}

export function getCollectionByAddress(collectionAddress, contract) {
  return methods.get(
    `${collectionEndpoint}${collectionAddress}?isErc1155=${
      contract === "ERC-1155" ? true : false
    }`,
    {
      headers: {
        "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
      },
    }
  );
}

export function getERC1155NftsByCollectionAddress(collectionAddress) {
  return methods.get(
    `${collectionEndpoint}erc1155/${collectionAddress}/tokens`,
    {
      headers: {
        "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
      },
    }
  );
}

export function getCollectionsCall(body) {
  return methods.get(`${collectionEndpoint}`, {
    params: body,
    headers: {
      "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
    },
  });
}

export function getCollectionNftsCall(collectionAddress, body) {
  return methods.get(collectionEndpoint + collectionAddress + `/nfts`, {
    params: body,
    headers: {
      "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
    },
  });
}

export function updateCollection(collectionAddress, body, token) {
  console.log("COLLECTION ADDRESS", collectionAddress);
  console.log("BODY", body);
  let formData = new FormData();
  formData.append("image", body.image);
  formData.append("banner", body.banner);
  formData.append("collection", JSON.stringify(body.collection));

  return methods.put(collectionEndpoint + collectionAddress, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
      "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
    },
  });
}

export const getAccountCollections = (
  collectionAddress,
  page,
  numberElements,
  filter
) => {
  return methods.get(`${apiUrl}collections`, {
    params: {
      ownerAddress: collectionAddress,
      page: page,
      numberElements: numberElements,
      filter: filter,
    },
    headers: {
      "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
    },
  });
};
