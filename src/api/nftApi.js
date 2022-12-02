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


