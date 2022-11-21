const RankItem = ({elm = ""}) => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>
        <img src="/assets/images/Icon2.png" alt="" />
        <span>{"Monthz(When lamp)" + elm }</span>
      </td>
      <td>0.008 ETH</td>
      <td>339 ETH</td>
    </tr>
  );
};

export default RankItem;
