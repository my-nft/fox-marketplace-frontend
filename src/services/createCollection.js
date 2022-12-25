import apiUrl from "../config/api";
import methods from "../config/axiosConfig";
import {
  ERC20ContractAddress,
  factoryCollectionAddress,
  getCurrentWalletConnected,
  loadERC20Contract,
  loadFactoryContract,
} from "../utils/blockchainInteractor";

const factoryContract = loadFactoryContract();
const erc20Contract = loadERC20Contract();

export const mintCollection = async ({ name, symbol }) => {
  const connectedWallet = getCurrentWalletConnected();

  const ipfsUri = process.env.REACT_APP_IPFS_URI;

  const deploymentFee = await factoryContract.methods.deploymentFee().call();

  const allowance = await erc20Contract.methods
    .allowance(connectedWallet, factoryCollectionAddress)
    .call();

  if (allowance < deploymentFee) {
    const gasLimit = await erc20Contract.methods
      .approve(factoryCollectionAddress, deploymentFee)
      .estimateGas({
        from: connectedWallet,
        to: ERC20ContractAddress,
      });

    await erc20Contract.methods
      .approve(factoryCollectionAddress, deploymentFee)
      .send({
        from: connectedWallet,
        to: ERC20ContractAddress,
        gasLimit,
      });
  }

  const gasLimit = await factoryContract.methods
    .createNFT(name, symbol, ipfsUri)
    .estimateGas({
      from: connectedWallet,
      to: factoryCollectionAddress,
    });

  const tsx = await factoryContract.methods
    .createNFT(name, symbol, ipfsUri)
    .send({
      from: connectedWallet,
      to: factoryCollectionAddress,
      gasLimit,
    });

  console.log(tsx);

  // getting collection addresse from TSX
  // call import import collection
};

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
