import { Web3Provider } from "@ethersproject/providers";
import { signinUser, signupUser } from "../api/AuthUserApi";
import { authProviderInstance, web3Infura } from "../utils/blockchainInteractor";




export const signIn = async (address) => {

  console.log("SigIn user");
  const msg = `I would like to Sign in for user with address: ${address}`;

  let JSONBody = {
    address,
  };

  const provider = await authProviderInstance.getProvider();

  const signedMessage = await provider.send(
    'personal_sign',
    [ msg , address ]
  );

  JSONBody.signature = signedMessage;

  const response = await signinUser(JSONBody);
  return response.data;
};

export const signUp = async (address, formData) => {
  const msg = `I would like to Sign Up for user with address: ${address}`;

  let JSONBody = {
    address,
    ...formData,
  };

  const provider = await authProviderInstance.getProvider();

  const signedMessage = await provider.send(
    'personal_sign',
    [ msg , address ]
  );

  JSONBody.signature = signedMessage;


  const response = await signupUser(JSONBody);
  
  return response.data;
};
