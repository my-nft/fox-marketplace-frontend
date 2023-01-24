const Spinner = ({ children, pageLoader = false }) => {
  return (
    <div className={`loader ${pageLoader && "pageLoader"}`}>
      <div className="loaderShadow">
        <img src="/assets/images/Logo_fox.png" alt="Loading..." />
      </div>
      <div className="loaderMessage">{children}</div>
    </div>
  );
};

export default Spinner;
