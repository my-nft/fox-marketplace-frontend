import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

const collectionEndpoint = apiUrl + "collections/";

export function importCollectionCall(collectionAddress, token, sameOrigin) {
  return methods.post(`${collectionEndpoint}${collectionAddress}/import`, {
      sameOrigin : sameOrigin ? true : false
  } ,{
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}


export function importCollectionToken(collectionAddress, tokenID, token) {
  return methods.post(`${collectionEndpoint}${collectionAddress}/${tokenID}/import`, {} ,{
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function getCollectionByAddress(collectionAddress) {
  return methods.get(`${collectionEndpoint}${collectionAddress}`);
}

export function getCollectionsCall(body) {
  return methods.get(collectionEndpoint, { params: body });
}

export function getCollectionNftsCall(collectionAddress, body) {
  return methods.get(collectionEndpoint + collectionAddress + `/nfts`, {
    params: body,
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
      Authorization: "Bearer " + token
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
  });
};
