export const ethereum = window.ethereum;



const connectWallet = async () => {
  if(ethereum) {
    const connected = await ethereum.request({
      method: "eth_requestAccounts",
    });
    return connected;
  }
}

const getCurrentWalletConnected = () => {
  return window.ethereum ? window.ethereum.selectedAddress : "";
}


export {
  connectWallet,
  getCurrentWalletConnected
}