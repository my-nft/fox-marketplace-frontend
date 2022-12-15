export const ethereum = window.ethereum;



const connectWallet = () => {
  ethereum && ethereum.request({
    method: "eth_requestAccounts",
  });
}

const getCurrentWalletConnected = () => {
  return window.ethereum ? window.ethereum.selectedAddress : "";
}


export {
  connectWallet,
  getCurrentWalletConnected
}