import { useNavigate } from "react-router-dom";

const RankItem = ({elm = "", itemData, position}) => {

  const navigate = useNavigate();

  const goToCollection = () => {
    navigate(`/collection/${itemData.collectionAddress}`)
  }

  return (
    <tr onClick={goToCollection}>
      <th scope="row">{position}</th>
      <td>
        <img src={itemData.image} alt="" />
        <span>{itemData.name + elm }</span>
      </td>
      <td>{ itemData.floorPrice } FXG</td>
      <td>{ itemData.volume } FXG</td>
    </tr>
  );
};

export default RankItem;
