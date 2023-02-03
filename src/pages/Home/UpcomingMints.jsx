import { useState } from "react";
import ItemMint from "../../components/ItemMint";
import FOXCollectionImage from "../../assets/images/fox_collection.jpg";
import Countdown from "../../components/Countdown";

const UpcomingMints = (props) => {
  const [loadLimit, setLoadLimit] = useState(4);

  return (
    <section id="upcomingMints" className="container-fluid mt-5">
      <h3 className="mb-5">Upcoming Mints</h3>

      <div id="wrapperMints" className="row">
        <div className="upcomingMintHighlight col-md-6 col-sm-12 col-lg-4">
          <img src={FOXCollectionImage} alt="" />
          <p>LIMITED FOX COLLECTION</p>
          <Countdown date="2023-02-03T22:00:00" link="/drops" />
          <div className="highlight"></div>
        </div>
        {
          // CODE BELOW IS USED FOR RENDERING UPCOMING MINTS LATER
        }
        {/* {
          props.mints && props.mints.map((item, index) => {
            if(index < loadLimit) return <ItemMint/>
          })
        } */}

        {
          // CODE BELOW IS USED FOR RENDERING TEST DATA
        }
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          if (index < loadLimit) return <ItemMint key={index} />;
        })}
      </div>
      <p
        onClick={() => setLoadLimit(loadLimit + 4)}
        className="viewMore mt-5 mb-5"
      >
        View more
      </p>
    </section>
  );
};

export default UpcomingMints;
