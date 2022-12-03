import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

export const createNewNFT = async (data,token,collectionAddress) => {

    const {
        upload,
        artworkName,
        artistName,
        email,
        description,
        rightsLevel,
        rightsDuration,
        walletAddress
    } = data;

    const outputDataMap = {
        name: artworkName,
        artistName,
        description,
        image: upload,
        ownerAddress: walletAddress,
    }

    console.log("*******************************************")
    console.log("CREATING NEW NFT");
    console.log("OUTPUT DATA MAP: " + JSON.stringify(outputDataMap));
    console.log("TOKEN: " + token);
    console.log("COLLECTION ADDRESS: " + collectionAddress);


    //call createNFTService to create new NFT
    methods.post(`${apiUrl}collections/${collectionAddress}/nfts/${token}`, outputDataMap)
    .then(res => {
        console.log("NFT CREATE RESPONSE:",res);
    })
    .catch(err => {
        console.log("NFT CREATE ERROR:",err);
    })
    .finally(() => {
        return null;
    })
    

}