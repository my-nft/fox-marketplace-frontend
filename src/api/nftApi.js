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

export const setNftToListed = (body, token) => {
  const { collectionAddress, tokenID, ...rest } = body;

  return methods.put(
    `${collectionEndpoint}${collectionAddress}/nfts/${tokenID}/set-listed`,
    rest,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const setNftToUnlisted = (body, token) => {
  const { collectionAddress, tokenID, action } = body;

  return methods.put(
    `${collectionEndpoint}${collectionAddress}/nfts/${tokenID}/remove-listed`,
    {
      action
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const makeOffer = ({collectionAddress, tokenID, offer, token}) => {
  return methods.put(
    `${collectionEndpoint}${collectionAddress}/nfts/${tokenID}/make-offer`,
    {
      offer
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export const acceptOffer = (body, token) => {
  const { collectionAddress, tokenID } = body;

  return methods.put(
    `${collectionEndpoint}${collectionAddress}/nfts/${tokenID}/accept-offer`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export function addNftToIpfs({ collectionAddress, nft, image, token }) {
  let formData = new FormData();
  formData.append("image", image);

  formData.append(
    "nft",
    JSON.stringify({
      ...nft,
      collectionAddress,
    })
  );

  return methods.put(`${nftEndpoint}load-ipfs`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
}

export const getListedNfts = (
  page,
  numberElements,
  status,
  collectionAddress,
  minPrice,
  maxPrice,
  sortBy
) => {
  return methods.get(nftEndpoint + "listed", {
    params: {
      page,
      numberElements,
      status,
      collectionAddress,
      minPrice,
      maxPrice,
      sortBy,
    },
  });
};
