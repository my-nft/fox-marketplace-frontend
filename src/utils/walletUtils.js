const optimizeWalletAddress = (address) => address.substring(0, 4) + "....." + address.slice(-4);

export {
    optimizeWalletAddress
}
