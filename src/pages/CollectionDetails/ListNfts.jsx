import AccordionPrice from "../Explorer/AccordionPrice";
import AccordingStatus from "./AccoringStatus";
import AccordingCollection from "../Explorer/AccordingCollection";
import AccordionCategory from "./AccordionCategory";
import MostPopularItem from "../../components/marketplace/MostPopularItem";
import ListActivities from "./ListActivities";

const ListNfts = ({ nfts, isVisible , viewType, handleSelectNfts, filters, changeFilterValue}) => {
  
  return (
    <section id="tabsNft" className="container-fluid accountListed">
      <div className={`row collectionFilters ${!isVisible ? "filtersHide" : null}`} style={{ display: "flex" }}>
        <div
          className="col filtersCollapsible"
          id="filter"
          style={{display: 'block'}}
        >
          <div className="col pl-0">
            <AccordingStatus filters={filters} changeFilterValue={changeFilterValue} />
            <AccordionPrice filters={filters} changeFilterValue={changeFilterValue} />
            <AccordingCollection filters={filters} changeFilterValue={changeFilterValue} />
            <AccordionCategory filters={filters} changeFilterValue={changeFilterValue} />
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
