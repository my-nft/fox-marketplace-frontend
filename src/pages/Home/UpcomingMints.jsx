import { useState } from "react";
import ItemMint from "../../components/ItemMint";

const UpcomingMints = (props) => {

  const [loadLimit, setLoadLimit] = useState(4);


  return (
    <section id="upcomingMints" className="container-fluid mt-5">
      <h3 className="mb-5">Upcoming Mints</h3>
      <div id="wrapperMints" className="row">
        
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
        {
          [1,2,3,4,5,6,7,8,9,10].map((item, index) => {
            if(index < loadLimit) return <ItemMint key={index}/>
          })
        }
 
      </div>
      <p onClick={() => setLoadLimit(loadLimit + 4)} className="viewMore mt-5 mb-5">View more</p>
    </section>
  );
};

export default UpcomingMints;
