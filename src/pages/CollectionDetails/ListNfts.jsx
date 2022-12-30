import AccordionPrice from "../Explorer/AccordionPrice";
import AccordingStatus from "./AccoringStatus";
import AccordingCollection from "../Explorer/AccordingCollection";
import AccordionCategory from "./AccordionCategory";
import MostPopularItem from "../../components/marketplace/MostPopularItem";
import ListActivities from "./ListActivities";
import AccordionPropertiesFilter from "./PropertiesFilter";
import Pagination from "../../components/pagination/pagination";

const ListNfts = ({
  nfts,
  isVisible,
  viewType,
  handleSelectNfts,
  filters,
  changeFilterValue,
  isLoadingNfts = { isLoadingNfts },
  totalElements,
  changePage,
  paginationPage,
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
            {/* <AccordingCollection filters={filters} changeFilterValue={changeFilterValue} /> 
            <AccordionCategory
              filters={filters}
              changeFilterValue={changeFilterValue}
            />
            */
          }
            <AccordionPropertiesFilter
              filters={filters}
              changeFilterValue={changeFilterValue}
              properties={filters.properties}
            />
          </div>
        </div>

        {!isLoadingNfts && (
          <div className="col" id="wrapperNFT">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-Items"
                role="tabpanel"
                aria-labelledby="pills-Items"
              >
                <div className="wrapperMostPopular row">
                  {nfts.map((item, index) => (
                    <MostPopularItem
                      key={index}
                      item={item}
                      viewType={viewType}
                      onSelectNfts={handleSelectNfts}
                    />
                  ))}
                </div>
                {totalElements / 20 > 1 ? (
                  <Pagination
                    currentPage={paginationPage}
                    pages={totalElements ? parseInt(totalElements / 20) : 1}
                    setCurrentPage={changePage}
                  />
                ) : null}
              </div>
              <ListActivities />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListNfts;
