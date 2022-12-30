const Address = ({ address, className, children }) => {
  return (
    <a
      className={`${className} addressLink`}
      href={`${process.env.REACT_APP_BLOCEXPLORER}${address}`}
    >
      {children}
    </a>
  );
};

export default Address;
