
const Slide = (props) => {
  return (
    <div className="slide" onClick={props.onClick}>
      <div className="maskContainer">
        <a href="/assets/images/Slide2.jpg">
          <img src="/assets/images/Slide2.jpg" alt="" />
        </a>
      </div>
      <div className="textItems">
        <h4>name</h4>
        <div className="description">
          <p>
            <label>Total Volume</label>
            <span>1500 ETH</span>
          </p>
          <p>
            <label>Floor Price</label>
            <span>5 ETH</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide;