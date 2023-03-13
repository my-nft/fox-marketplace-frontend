import { getAddressesByChain } from "../utils/blockchainInteractor";

const Address = ({ address, className, children }) => {
  return (
    <a
      className={`${className} addressLink`}
      href={`${getAddressesByChain().blockExplorer}${address}`}
      target="_blank"
    >
      {children}
    </a>
  );
};

export default Address;
