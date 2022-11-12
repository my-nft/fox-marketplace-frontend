import ItemMint from "../../components/ItemMint";

const UpcomingMints = (props) => {
  return (
    <section id="upcomingMints" className="container-fluid mt-5">
      <h3 className="mb-5">Upcoming Mints</h3>
      <div id="wrapperMints" class="row">
        <ItemMint/>
        <ItemMint/>
        <ItemMint/>
        <ItemMint/>
      </div>
      <p class="viewMore mt-5 mb-5">View more</p>
    </section>
  );
};

export default UpcomingMints;
