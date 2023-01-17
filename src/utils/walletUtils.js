import { web3Infura } from "./blockchainInteractor";



const optimizeWalletAddress = (address) => {
    if(!address) {
        return '';
    }
    return address.substring(0, 4) + "....." + address.slice(-4)
};

const sameAddress = (address1, address2) => {

    if(!address1 || !address2) {
        return false;
    }
    return web3Infura.utils.toChecksumAddress(address1) === web3Infura.utils.toChecksumAddress(address2);
}
export {
    optimizeWalletAddress,
    sameAddress
}
