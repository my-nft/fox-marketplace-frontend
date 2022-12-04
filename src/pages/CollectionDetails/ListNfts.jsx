import AccordionPrice from "../Explorer/AccordionPrice";
import AccordingStatus from "./AccoringStatus";
import AccordingCollection from "../Explorer/AccordingCollection";
import AccordionCategory from "./AccordionCategory";
import MostPopularItem from "../../components/marketplace/MostPopularItem";
import ListActivities from "./ListActivities";
import { useEffect } from "react";
import { createPath } from "react-router-dom";

const ListNfts = ({ collectionNFTs, isVisible , viewType}) => {
  console.log("#####################",collectionNFTs)
  useEffect(() => {
    console.log("ListNfts", viewType);
  },[])

  console.log("tabsNft", viewType)

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
                
                  collectionNFTs.map((item, index) => {
                    return <MostPopularItem key={index} item={item} viewType={viewType} />
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
