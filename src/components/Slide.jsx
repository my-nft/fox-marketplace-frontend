import { useNavigate } from "react-router-dom";

const Slide = ({collectionDetails}) => {


  const navigate = useNavigate();

  const goToCollection = () => {
    navigate(`/collection/${collectionDetails.collectionAddress}`)
  }

  return (
    <>
      <div className="maskContainer" onClick={goToCollection}>   
          <img src={collectionDetails.image} alt="" />
      </div>
      <div className="textItems" onClick={goToCollection}>
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
    </>
  );
};

export default Slide;