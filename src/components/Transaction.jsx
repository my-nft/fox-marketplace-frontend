const Transaction = ({ address, className, children }) => {
  return (
    <a
      className={`${className} addressLink`}
      href={`${process.env.REACT_APP_TRANSACTION_EXPLORER}${address}`}
      target="_blank"
    >
      {children}
    </a>
  );
};

export default Transaction;
