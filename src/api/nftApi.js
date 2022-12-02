import { getUserByAddress } from "./userApi";

/*
Sorting = {
    sortedBy : "RECENTLY_LISTED"  (OR PRICE_ASC OR PRICE_DESC)
}

filter = {
    tage : "",
    userAddress : "",
    collectionAddress : "",
    isListed : true/false
}
*/
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
    collection: {
      id: "",
      contractAddress: "-",
      tokenId: "16912",
      tokenStandard: "ERC-721",
      chain: "ETWH",
      lastUpdate: "03/11/2022",
      creatorEarning : 2.6,
    },
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
