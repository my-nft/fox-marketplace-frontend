import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOAD_COLLECTION } from "../saga/actions";

const ExplorePopularCollectionItem = ({itemData}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowCollection = () => {
    dispatch({
      type: LOAD_COLLECTION,
      payload : {
        collectionAddress : itemData.collectionAddress,
      },
      onSuccess: () => navigate("/collection")
    })
  }

  return (
    <div className="listMostPopular" onClick={handleShowCollection}>
      <div className="wrapContent">
        <div className="wrapImg">
          <img
            src="./assets/images/marketplace/most1.jpg"
            className="bigImage"
            alt=""
          />
          <img
            src="./assets/images/marketplace/most1_icon.jpg"
            className="iconLogo"
            alt=""
          />
        </div>
        <div className="wrapText">
          <p>
            <label>{itemData.name}</label>
            <span>{itemData.tags}</span>
          </p>
          <p className="text-right">
            <label>Total Volume</label>
            <span>
              <b>f(x)</b> {itemData.totalVolume}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplorePopularCollectionItem;
