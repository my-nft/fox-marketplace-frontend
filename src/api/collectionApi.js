import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

const collectionEndpoint = apiUrl + "collections/";

export function importCollectionCall(collectionAddress) {
  return methods.post(`${collectionEndpoint}/${collectionAddress}/import`);
}

export function getCollectionByAddress(collectionAddress) {
  return methods.get(`${collectionEndpoint}/${collectionAddress}`);
}

export function getCollectionsCall(body) {
  return methods.get(collectionEndpoint, { params: body });
}

export function getCollectionNftsCall(collectionAddress, body) {
  return methods.get(collectionEndpoint + collectionAddress + `/nfts`, {
    params: body,
  });
}


export const getAccountCollections = (collectionAddress, page, numberElements, filter) => {
    return methods.get(
      `${apiUrl}collections`,
      {
        params: {
          ownerAddress: collectionAddress,
          page: page,
          numberElements: numberElements,
          filter: filter,
        }
      }
    )
}

export const getCollectionNfts = (page, numberPerPage, sort) => {
  /**
   * sort => recently listed, price desc, price asc, recently created, recently sold
   */

  return {
    page: "",
    totalElements: "",
    nfts: [
      {
        id: "",
        name: "",
        description: "",
        owner: "",
        image: "",
        createDate: "",
        soldDate: "12/15/2022",
        attributes: [
          {
            propertyName: "",
            propertyValue: "",
          },
        ],
      },
    ],
  };
};

// remove collections fiter from collection page

//---------------------------------Home page
