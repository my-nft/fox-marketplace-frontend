import AccordionPrice from "../Explorer/AccordionPrice";

import MostPopularItem from "../../components/marketplace/MostPopularItem";
import AccordingStatus from "./../CollectionDetails/AccoringStatus";
import AccordionCategory from "./../CollectionDetails/AccordionCategory";
import ListActivities from "./../CollectionDetails/ListActivities";
import AccordingCollection from "./../Explorer/AccordingCollection";
import ExplorePopularCollectionItem from "../../components/ExplorePopularCollectionItem";

const ListNfts = ({
  nfts,
  collections,
  isVisible,
  viewType,
  activeSection,
  filters,
  changeFilterValue,
}) => {
  return (
    <section id="tabsNft" className="container-fluid accountListed">
      <div
        className={`row collectionFilters ${!isVisible ? "filtersHide" : null}`}
        style={{ display: "flex" }}
      >
        <div
          className="col filtersCollapsible"
          id="filter"
          style={{ display: "block" }}
        >
          <div className="col pl-0">
            <AccordingStatus
              filters={filters}
              changeFilterValue={changeFilterValue}
            />
            <AccordionPrice
              filters={filters}
              changeFilterValue={changeFilterValue}
            />
            <AccordingCollection listSearcheableCollections={[]} />
            <AccordionCategory
              filters={filters}
              changeFilterValue={changeFilterValue}
            />
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
              <div className="wrapperMostPopular row gap-5">
                {activeSection === "COLLECTIONS"
                  ? collections.map((item, index) => {
                      return (
                        <ExplorePopularCollectionItem
                          key={index}
                          itemData={item}
                          viewType={viewType}
                        />
                      );
                    })
                  : null}
                {activeSection !== "COLLECTIONS"
                  ? nfts.map((item, index) => {
                      return (
                        <MostPopularItem
                          key={index}
                          item={item}
                          viewType={viewType}
                        />
                      );
                    })
                  : null}
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
