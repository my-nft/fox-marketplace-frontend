const RankItem = ({elm = "", itemData, position}) => {
  return (
    <tr>
      <th scope="row">{position}</th>
      <td>
        <img src={itemData.image} alt="" />
        <span>{itemData.name + elm }</span>
      </td>
      <td>{ itemData.floorPrice } ETH</td>
      <td>{ itemData.volume } ETH</td>
    </tr>
  );
};

export default RankItem;
