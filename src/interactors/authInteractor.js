import Web3 from "web3";
import { signinUser, signupUser } from "../api/AuthUserApi";


export const web3 = new Web3(Web3.givenProvider);


export const signIn = async (address) => {

  console.log("SigIn user");
  const msg = `I would like to Sign in for user with address: ${address}`;

  let JSONBody = {
    address,
  };

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

  let JSONBody = {
    address,
    ...formData,
  };

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
