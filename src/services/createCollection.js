import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

export const createNewCollection = async (data) => {
  const {
    collectionTokenName,
    collectionTokenSymbol,
    collectionAddress,
    walletAddress,
    artistName,
    email,
    description,
    rightsLevel,
    rightsDuration,
    upload,
  } = data;

  console.log("UPLOAD: " + JSON.stringify(upload));

  const outputDataMap = {
    name: collectionTokenName,
    description,
    artistName,
    ownerAddress: walletAddress,
    image: upload,
  };

  console.log("*******************************************");
  console.log("CREATING NEW COLLECTION");
  console.log("OUTPUT DATA MAP: " + JSON.stringify(outputDataMap));
  console.log("COLLECTION ADDRESS: " + collectionAddress);

  // call createCollectionService to create new collection
  methods
    .post(`${apiUrl}collections/${collectionAddress}`, outputDataMap, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("COLLECTION CREATE RESPONSE:", res);
    })
    .catch((err) => {
      console.log("COLLECTION CREATE ERROR:", err);
    })
    .finally(() => {
      return null;
    });
};
