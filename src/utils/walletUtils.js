import { web3 } from "./blockchainInteractor";

const optimizeWalletAddress = (address) => address.substring(0, 4) + "....." + address.slice(-4);

const sameAddress = (address1, address2) => {
    return web3.utils.toChecksumAddress(address1) === web3.utils.toChecksumAddress(address2);
}
export {
    optimizeWalletAddress,
    sameAddress
}
