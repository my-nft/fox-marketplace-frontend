import AccordionPrice from "../Explorer/AccordionPrice";
import AccordingStatus from "./AccoringStatus";
import AccordingCollection from "../Explorer/AccordingCollection";
import AccordionCategory from "./AccordionCategory";
import MostPopularItem from "../../components/marketplace/MostPopularItem";
import ListActivities from "./ListActivities";
import { useEffect } from "react";

const ListNfts = ({ nfts, isVisible , viewType, handleSelectNfts}) => {


  console.log("(((((((((((((((((((",nfts);
  
  return (
    <section id="tabsNft" className="container-fluid accountListed">
      <div className="row" style={{ display: "flex" }}>
        <div
          className="col"
          id="filter"
          style={!isVisible ? { display: "none" } : { display: "block" }}
        >
          <div className="col pl-0">
            <AccordingStatus />
            <AccordionPrice />
            <AccordingCollection />
            <AccordionCategory />
          </div>
        </div>

        <div className="col" id="wrapperNFT">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-Items"
              role="tabpanel"
              aria-labelledby="pills-Items"
            >
              <div className="wrapperMostPopular row">
                {
                
                nfts.map((item, index) => {
                    return <MostPopularItem key={index} item={item} viewType={viewType} onSelectNfts={handleSelectNfts}/>
                  })
                
                }
              </div>
            </div>
            <ListActivities />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListNfts;
