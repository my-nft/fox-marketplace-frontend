import ActivityItem from '../../components/collectionDetails/ActivityItem'

const ListActivities = () => {
  return (
    <div
      className="tab-pane fade"
      id="pills-Activity"
      role="tabpanel"
      aria-labelledby="pills-Activity-tab"
    >
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">From</th>
            <th scope="col">to</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          <ActivityItem id="1" />
          <ActivityItem id="2" />
          <ActivityItem id="3" />
          <ActivityItem id="4" />
          <ActivityItem id="5" />
        </tbody>
      </table>
    </div>
  );
};

export default ListActivities;
