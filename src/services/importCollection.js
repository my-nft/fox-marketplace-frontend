import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

export const importCollectionFromAddress = async (address, ownerAddress, image) => {

    const requestBody = {
        ownerAddress,
        image
    }

    console.log("IMPORTING COLLECTION FROM ADDRESS: " + address);
    console.log("OWNER ADDRESS: " + ownerAddress);
    console.log("REQUEST BODY: " + JSON.stringify(requestBody));

    // call importCollectionService to import collection from address
    methods.post(`${apiUrl}collections/${address}`, requestBody)
    .then(res => {
        console.log("COLLECTION IMPORT RESPONSE:",res);
    })
    .catch(err => {
        console.log("COLLECTION IMPORT ERROR:",err);
    })
    .finally(() => {
        return null;
    })

    
    
    

}