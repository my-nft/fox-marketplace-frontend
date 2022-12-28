import apiUrl from "../config/api";
import methods from "../config/axiosConfig";

const userEndpoint = apiUrl + "user/";

export function getUserByAddress(address) {
  return methods.get(userEndpoint + address);
}

export function createUser(address) {
  return methods.post(userEndpoint, {
    address,
  });
}


export const createUserByAddress = (walletAddress) => {
  return {
    id: "1",
    walletAddress: { walletAddress },
  };
};

export const updateUser = (userform) => {
  return {
    id: "1",
    username: userform.username,
    bio: userform.bio,
    email: userform.email,
    links: userform.links,
    walletAddress: userform.walletAddress,
    profilImage: userform.profilImage,
    profileImageBanner: userform.profileImageBanner,
  };
};

export const updateUserToDatabase = (data) => {
  const { address } = data;

  console.log(data);

  return methods.put(
    userEndpoint + address,
    {
      image: data.image,
      banner: data.banner,
      user: JSON.stringify(data.formData),
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};



// collection => 0 *n NFT
