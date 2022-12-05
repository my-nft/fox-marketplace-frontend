import { getUserByAddress } from "./userApi";
import { getCollectionById } from './collectionApi';
import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

const collectionEndpoint = apiUrl + "collections/";

export const getNftCall = (collectionAddress, tokenID) => {
  return methods.get(`${collectionEndpoint}/${collectionAddress}/nfts/${tokenID}`);

} 

export const getNfts = (filter, Sorting) => {
  return [
    {
      id: "",
      name: "",
      description: "",
      owner: "",
      image: "",
      createDate: "",
      soldDate: "",
      isListed: "true/false",
      attributes: [
        {
          propertyName: "",
          propertyValue: "",
        },
      ],
    },
  ];
};

export const getNFTById = (id) => {
  return {
    id: "",
    name: "-",
    description: "-",
    creator: getUserByAddress(""),
    collection: getCollectionById(""),
    image: "",
    createDate: "",
    soldDate: "",
    views: 0,
    favorites: 0,
    likes: 0,
    sale: {
      price: 0,
      isListed: true,
      saleEndDate: "12/15/2022",

    },
    auction: {
      minimumBid: 0,
      bestOffer: 0,
      isListed: true,
      auctionEndDate: "12/17/2022",
    }
  };
}
