import apiUrl from "../config/api";
import methods from "../config/axiosConfig";
import { getAddressesByChain } from "../utils/blockchainInteractor";

const utilsApiEndpoint = apiUrl + "utils/";

export function getStats() {
  return methods.get(utilsApiEndpoint + "stats");
}

export function getItemInfo(tokenID, collectionAddress, events) {
  return methods.get(utilsApiEndpoint + "events", {
    params: {
      tokenID,
      collectionAddress,
      events,
    },
    headers: {
      "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
    },
  });
}

export const postTraceTransaction = (
  {
    fromAddress,
    toAddress,
    price,
    collectionAddress,
    tokenID,
    event,
    transactionId,
    link,
  },
  token
) => {
  return methods.post(
    utilsApiEndpoint + "trace-transaction",
    {
      fromAddress,
      toAddress,
      price,
      collectionAddress,
      tokenID,
      event,
      transactionId,
      link,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
        "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
      },
    }
  );
};

export const sendInscription = ({ imageFile, fileSize, receiverAddress, token }) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append(
    "dto",
    JSON.stringify({
      mintfileSize: fileSize,
      receiverAddress: receiverAddress,
    })
  );

  return methods.post(`${utilsApiEndpoint}send-inscription`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
    },
  });
};

export const getInscriptionBalance = (token) => {
  return methods.get(`${utilsApiEndpoint}inscription-filled`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-CHAIN-ID": getAddressesByChain().rpc_chain_id,
    },
  });
}
