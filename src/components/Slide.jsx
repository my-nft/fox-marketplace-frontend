const Slide = ({ collectionDetails }) => {
  return (
    <div className="slide">
      <div className="maskContainer">
        <a href={collectionDetails.image}>
          <img src={collectionDetails.image} alt="" />
        </a>
      </div>
      <div className="textItems">
        <h4>{collectionDetails.name}</h4>
        <div className="description">
          <p>
            <label>Total Volume</label>
            <span>-</span>
          </p>
          <p>
            <label>Floor Price</label>
            <span>-</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide;
