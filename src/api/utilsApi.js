import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

const utilsApiEndpoint = apiUrl + "utils/";

export function getStats() {
  return methods.get(utilsApiEndpoint + "stats");
}

export const postTraceTransaction = ({
  fromAddress,
  toAddress,
  price,
  collectionAddress,
  tokenID,
  event,
  transactionId,
  link,
}, token) => {
  return methods.post(utilsApiEndpoint + "trace-transaction", {
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
    },
  });
}