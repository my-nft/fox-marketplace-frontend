export const getUserByAddress = (walletAddress) => {
  return {
    id: "1",
    username: "mohammed",
    bio: "la vie est belle",
    email: "moh...@gmail.com",
    links: "http://myLink-url.com",
    walletAddress: "address:000011001010xxxx",
    profilImage: "http://my-image.com",
    profileImageBanner: "http://my-profileImage-banner.com",
  };
};

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

// collection => 0 *n NFT
