import { useNavigate } from "react-router-dom";

const PopularCollectionItem = (props) => {
  const { itemData } = props;
  const navigate = useNavigate();
  
  const goToCollection = () => {
    navigate(`/collection/${itemData.collectionAddress}`)
  }

  return (
    <div className="popularItems col-sm-6 col-md-3" onClick={goToCollection}>
      <img src={itemData.image} alt="" />
      <div className="nameItem">
        <span className="name">{itemData.name}</span>
        <span>
          {itemData.likes}{" "}
          <img
            src="/assets/images/Iconmonstr-favorite-2-16.png"
            style={{ width: "16px" }}
            alt=""
          />
        </span>
      </div>
      <p>{itemData.totalSupply} NFTs</p>
    </div>
  );
};

export default PopularCollectionItem;
