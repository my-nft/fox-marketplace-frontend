import { useNavigate } from "react-router-dom";

const ListItemCollection = ({
  collectionActive,
  handleChangeCollection = () => {},
  collection,
}) => {
  const navigate = useNavigate();

  return (
    <div className="listItemCollection">
      <img src="./assets/images/marketplace/icon1_collection.jpg" alt="" />
      <div className="itemText">
        <p>{collection.name}</p>
        <p>
          <span>28868 ETH </span>
          <b>/Floor:3.3 ETH</b>
        </p>
      </div>
      <input
        type="radio"
        name="collection"
        checked={collectionActive === collection.collectionAddress}
        onChange={() => {
          console.log("CHANGE COLLECTION", collection);
          handleChangeCollection(collection.collectionAddress);
        }}
      />
    </div>
  );
};

export default ListItemCollection;
