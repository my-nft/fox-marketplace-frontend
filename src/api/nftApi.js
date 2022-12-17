import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

const collectionEndpoint = apiUrl + "collections/";
const nftEndpoint = apiUrl + "tokens/";

export const getNftCall = (collectionAddress, tokenID) => {
  return methods.get(
    `${collectionEndpoint}${collectionAddress}/nfts/${tokenID}`
  );
};

export const getNftsCall = ({
  creatorAddress,
  ownerAddress,
  isListed,
  collectedOnly,
  page,
  numberElements,
}) => {
  return methods.get(`${nftEndpoint}`, {
    params: {
      creatorAddress,
      ownerAddress,
      isListed,
      collectedOnly,
      page,
      numberElements,
    },
  });
};

export const setNftToListed = (body) => {
  const { collectionAddress, tokenID, ...rest } = body;

  return methods.put(
    `${collectionEndpoint}${collectionAddress}/nfts/${tokenID}/set-listed`,
    rest
  );
};

export const setNftToUnlisted = (body) => {
  const { collectionAddress, tokenID } = body;

  return methods.put(
    `${collectionEndpoint}${collectionAddress}/nfts/${tokenID}/remove-listed`
  );
};

export const acceptOffer = (body) => {
  const { collectionAddress, tokenID } = body;

  return methods.put(
    `${collectionEndpoint}${collectionAddress}/nfts/${tokenID}/accept-offer`
  );
};


export const getListedNfts = (page, numberElements) => {
  return methods.get(nftEndpoint + "listed", {
    params: {
      page,
      numberElements,
    },
  });
};
