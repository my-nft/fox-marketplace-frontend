import { Web3Provider } from "@ethersproject/providers";
import { signinUser, signupUser } from "../api/AuthUserApi";
import { authProviderInstance, web3Infura } from "../utils/blockchainInteractor";




export const signIn = async (address) => {

  console.log("SigIn user");
  const msg = `I would like to Sign in for user with address: ${address}`;

  let JSONBody = {
    address,
  };

  const web3 = await authProviderInstance.getInjectedWeb3()

  await web3.eth.personal.sign(msg, address, (err, signature) => {
    JSONBody.signature = signature;
  });

  try {
    const response = await signinUser(JSONBody);
    return response.data;
  } catch (err) {
    return {
      success: false,
    };
  }
};

export const signUp = async (address, formData) => {
  const msg = `I would like to Sign Up for user with address: ${address}`;

  console.log(address);

  let JSONBody = {
    address,
    ...formData,
  };

  const web3 = await authProviderInstance.getInjectedWeb3()

  await web3.eth.personal.sign(msg, address, (err, signature) => {
    JSONBody.signature = signature;
  });

  try {
    const response = await signupUser(JSONBody);
    return response.data;
  } catch (err) {
    return {
      success: false,
    };
  }
};
