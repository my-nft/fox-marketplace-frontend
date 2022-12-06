import AccordionPrice from "../Explorer/AccordionPrice";


import MostPopularItem from "../../components/marketplace/MostPopularItem";
import { useEffect } from "react";
import { createPath } from "react-router-dom";
import AccordingStatus from './../CollectionDetails/AccoringStatus';
import AccordionCategory from './../CollectionDetails/AccordionCategory';
import ListActivities from './../CollectionDetails/ListActivities';
import AccordingCollection from './../Explorer/AccordingCollection';

const ListNfts = ({ collectionNFTs, isVisible , viewType, activeSection}) => {
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
            <AccordingCollection listSearcheableCollections={collectionNFTs["COLLECTIONS"]}  />
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
                
                  collectionNFTs[activeSection].map((item, index) => {
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
