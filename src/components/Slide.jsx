
const Slide = ({imgSuffix}) => {
  return (
    <>
      <div className="maskContainer">
        <a href={"/assets/images/Slide"+ imgSuffix + ".jpg"}>
          <img src={"/assets/images/Slide"+ imgSuffix + ".jpg"} alt="" />
        </a>
      </div>
      <div className="textItems">
        <h4>name</h4>
        <div className="description">
          <p>
            <label>Total Volume</label>
            <span>1500 FXG</span>
          </p>
          <p>
            <label>Floor Price</label>
            <span>5 FXG</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Slide;