export const getUserByAddress = (walletAddress) => {
  return {
    id: "1",
    username: "mohammed",
    bio: "la vie est belle",
    email: "moh...@gmail.com",
    links: "http://myLink-url.com",
    walletAddress: "address:000011001010xxxx",
    profilImage: "http://my-image.com",
    profileImageBanner: "http://my-profileImage-banner.com",
  };
};


export const createUserByAddress = (walletAddress) => {
    // create user
    // can finish his profile on profile page
}

export const updateUser = (UserForm) => {
  // call API to update User
};

export const getCollections = (type) => {
  /*
        type in (
            // MOST_POPULAR
            // HIGHT_VOLUME (TOP)
            // TRENDING
            // NEW COLLECTIONS => (created in X days before -> today)
        )
    */
};

// collection => 0 *n NFT

export const getListedNfts = (filter, Sorting) => {
  // in first impl
  // we will sort by (RECENTLY_LISTED, PRICE_ASC/PRICE_DESC )
  // can filter by address collection
};

// To show collections on left part of the page
// on explorer filters
export const getTrendingCollection = () => {
    // with type TRENDING
};

export const getUserCollectionById = () => {};

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
    totalVolume: "",
    creationDate: "",
    owner: "",
    totalVolume: "",
    floorPrice: "",
    bestOffer: "",
    listed: "",
    owners: "",
    uniqueOwner: "",
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
