export const getCollections = (filter, type, pagination) => {
    /*
            type in (
                // MOST_POPULAR
                // HIGHT_VOLUME (TOP)
                // TRENDING
                // NEW COLLECTIONS => (created in X days before -> today)
            )
        */
  };
  
  // To show collections on left part of the page
// on explorer filters
export const getTrendingCollection = () => {
    // with type TRENDING
};

  

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
      address: "",
      image: "",
      name : "",
      description: "",
  
      imageBanner: "",
      //totalSupply : '' => from smart contract finally
      creationDate: "01/01/1972",
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
          soldDate: "",
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
  