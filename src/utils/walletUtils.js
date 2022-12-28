import Web3 from "web3";



const optimizeWalletAddress = (address) => address.substring(0, 4) + "....." + address.slice(-4);

const sameAddress = (address1, address2) => {
    const web3 = new Web3(Web3.givenProvider);

    if(!address1 || !address2) {
        return false;
    }
    return web3.utils.toChecksumAddress(address1) === web3.utils.toChecksumAddress(address2);
}
export {
    optimizeWalletAddress,
    sameAddress
}
