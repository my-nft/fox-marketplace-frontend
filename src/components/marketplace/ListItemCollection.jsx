import { useNavigate } from "react-router-dom";

const ListItemCollection = () => {

  const navigate = useNavigate();

  return (
    <div class="listItemCollection" onClick={() => navigate("/nft")}>
      <img src="./assets/images/marketplace/icon1_collection.jpg" alt="" />
      <div class="itemText">
        <p>Moon Apes Pow Club</p>
        <p>
          <span>28868 ETH </span>
          <b>/Floor:3.3 ETH</b>
        </p>
      </div>
      <input type="radio" name="collection" />
    </div>
  );
};

export default ListItemCollection;
