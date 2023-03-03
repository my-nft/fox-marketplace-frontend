import { getAddressesByChain } from "../utils/blockchainInteractor";

const Transaction = ({ address, className, children }) => {
  return (
    <a
      className={`${className} addressLink`}
      href={`${getAddressesByChain().transactionExplorer}${address}`}
      target="_blank"
    >
      {children}
    </a>
  );
};

export default Transaction;
