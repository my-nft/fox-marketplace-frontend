import AccordionPrice from "../Explorer/AccordionPrice";


import MostPopularItem from "../../components/marketplace/MostPopularItem";
import AccordingStatus from './../CollectionDetails/AccoringStatus';
import AccordionCategory from './../CollectionDetails/AccordionCategory';
import ListActivities from './../CollectionDetails/ListActivities';
import AccordingCollection from './../Explorer/AccordingCollection';

const ListNfts = ({ nfts, collections, isVisible , viewType, activeSection}) => {

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
            <AccordingCollection listSearcheableCollections={[]}  />
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
                  activeSection === 'COLLECTIONS' ?
                  collections.map((item, index) => {
                    return <MostPopularItem key={index} item={item} viewType={viewType} />
                  }) : null
                }
                {
                  activeSection !== 'COLLECTIONS' ?
                  nfts.map((item, index) => {
                    return <MostPopularItem key={index} item={item} viewType={viewType} />
                  }) : null
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
