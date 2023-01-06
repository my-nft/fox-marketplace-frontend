import { FXG_PRICE } from "../utils/foxConstantes";

const PopularCollectionItem = (props) => {
  const { itemData } = props;

  return (
    <div className="popularItems col-sm-6 col-md-3">
      <img src={itemData.image} alt="" />
      <div className="nameItem">
        <span className="name">{itemData.name}</span>
        <span>
          {itemData.likes}{" "}
          <img
            src="/assets/images/Iconmonstr-favorite-2-16.png"
            style={{ width: "20px" }}
            alt=""
          />
        </span>
      </div>
      <p>{itemData.totalSupply} NFTs</p>
    </div>
  );
};

export default PopularCollectionItem;
