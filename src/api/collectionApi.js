import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

const collectionEndpoint = apiUrl + "collections/";

export function getCollectionsCall(body) {
  return methods.get(collectionEndpoint, { params: body } );
}




export const getCollections = (filter, type, pagination) => {

    if (type === "MOST_POPULAR"){
      return [
        {
          id: "",
          name: "Placeholder",
          image: "/assets/images/Popluar_1.png",
          lowestAsk: 0,
          likes: 0,
          tokens: 0,
          totalVolume: 0,
          items: 0,
        },
        {
          id: "",
          name: "Placeholder",
          image: "/assets/images/Popluar_1.png",
          lowestAsk: 0,
          likes: 0,
          tokens: 0,
          totalVolume: 0,
          items: 0,
        },
        {
          id: "",
          name: "Placeholder",
          image: "/assets/images/Popluar_1.png",
          lowestAsk: 0,
          likes: 0,
          tokens: 0,
          totalVolume: 0,
          items: 0,
        },
        {
          id: "",
          name: "Placeholder",
          image: "/assets/images/Popluar_1.png",
          lowestAsk: 0,
          likes: 0,
          tokens: 0,
          totalVolume: 0,
          items: 0,
        },
      ]
    }
    if(type === 'TRENDING'){
      return [
        {
          id: "",
          image: "/assets/images/Icon2.png",
          name: "Template",
          floorPrice: 0,
          volume: 0
        },
        {
          id: "",
          image: "/assets/images/Icon2.png",
          name: "Template",
          floorPrice: 0,
          volume: 0
        },
        {
          id: "",
          image: "/assets/images/Icon2.png",
          name: "Template",
          floorPrice: 0,
          volume: 0
        },
        {
          id: "",
          image: "/assets/images/Icon2.png",
          name: "Template",
          floorPrice: 0,
          volume: 0
        },
      ]
    }
    if(type === 'TOP'){
      return [
        {
          id: "",
          image: "/assets/images/Icon2.png",
          name: "Template",
          floorPrice: 0,
          volume: 0
        },
        {
          id: "",
          image: "/assets/images/Icon2.png",
          name: "Template",
          floorPrice: 0,
          volume: 0
        },
        {
          id: "",
          image: "/assets/images/Icon2.png",
          name: "Template",
          floorPrice: 0,
          volume: 0
        },
        {
          id: "",
          image: "/assets/images/Icon2.png",
          name: "Template",
          floorPrice: 0,
          volume: 0
        },
      ]
    }
};

  
  // To show collections on left part of the page
// on explorer filters
export const getTrendingCollection = () => {
    // with type TRENDING
};


export const getCollectionById = (id) => {
  return {
      id: "",
      address: "-",
      image: "",
      name : "",
      description: "",
      imageBanner: "",
      //totalSupply : '' => from smart contract finally
      creationDate: "01/01/1972",
      lastUpdate: "03/11/2022",
      tokenStandard: "ERC721",
      tokenId: "16912",
      chain: "ETHW",
      creatorEarnings: 2.6,
      owner: "",
      totalVolume: 0,
      floorPrice: 0,
      bestOffer: 0,
      listed: 0,
      owners: 0,
      uniqueOwner: 0,
      items: 0,
  }
}

//---------------------Collection page
// For a collection having address
export const getCollectionDetails = (
    page,
    elementsPerPage,
    filter = {
      buyNow: "",
      onAuction: "",
      new: "",
      hasOffers: "",
      buyWithCard: "",
      price: {
        min: "",
        max: "",
      },
    }
  ) => {
    return {
      id: "",
      address: "-",
      image: "",
      name : "",
      description: "",
  
      imageBanner: "",
      //totalSupply : '' => from smart contract finally
      creationDate: "01/01/1972",
      lastUpdate: "03/11/2022",
      tokenStandard: "ERC721",
      tokenId: "16912",
      chain: "ETHW",
      creatorEarnings: 2.6,
      owner: "",
      totalVolume: 0,
      floorPrice: 0,
      bestOffer: 0,
      listed: 0,
      owners: 0,
      uniqueOwner: 0,
    };
  };
  


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
  