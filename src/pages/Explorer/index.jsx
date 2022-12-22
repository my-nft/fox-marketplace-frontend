import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderInput from "../../components/marketplace/HeaderInput";
import Pagination from "../../components/pagination/pagination";
import Spinner from "../../components/Spinner";
import {
  selectMostPopularCollections,
  selectSearcheableCollection,
} from "../../redux/collectionReducer";

import { selectIsLoading, selectListedNfts } from "../../redux/nftReducer";

import { LOAD_MARKET_PLACE } from "../../saga/actions";
import AccordingCollection from "./AccordingCollection";
import AccordingStatus from "./AccordingStatus";
import AccordionPrice from "./AccordionPrice";
import MostPopular from "./MostPopular";
import MostPopularCollection from "./MostPopularCollection";
import AccordionPropertiesFilter from "./PropertiesFilter";

const Explorer = () => {
  const dispatch = useDispatch();

  const mostPopularCollections = useSelector(selectMostPopularCollections);
  const searcheableCollections = useSelector(selectSearcheableCollection);
  const marketPlaceNfts = useSelector(selectListedNfts);

  const { totalElements, content } = marketPlaceNfts || {};

  const isLoadingApi = useSelector(selectIsLoading);

  const [filtersVisible, setFiltersVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    numberElements: 20,
    page: 1,
  });

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    buyToken: "ETH",
    status: "ALL",
    showRaritiy: false,
    sortBy: "RECENTLY_LISTED",
    properties: [],
  });

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    setIsLoading(isLoadingApi);
  }, [isLoadingApi]);

  const loadMarketPlace = () => {
    dispatch({
      type: LOAD_MARKET_PLACE,
      payload: {
        numberElements: pagination.numberElements,
        page: pagination.page,
      },
    });
  };

  useEffect(() => {
    console.log("INITIAL RENDER");
  }, []);

  useEffect(() => {
    console.log("MARKETPLACE LOAD CALL", pagination);
    loadMarketPlace();
  }, [pagination]);

  const changePage = (page) => {
    if (page < 1 || page > parseInt(totalElements / 20)) return;
    setPagination({
      ...pagination,
      page,
    });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <MostPopularCollection collections={mostPopularCollections} />
      <section id="marketplace" className="container-fluid mb-5">
        <div className="row flex-nowrap md-flex-row flex-col">
          <div
            id="sx"
            className={`filtersContainer filtersExplorer ${
              filtersVisible ? null : "filtersHide"
            }`}
          >
            <div className="filtersCollapsible">
              <AccordingStatus
                filters={filters}
                changeFilterValue={setFilters}
              />
              <AccordionPrice
                filters={filters}
                changeFilterValue={setFilters}
              />

              <AccordingCollection
                listSearcheableCollections={searcheableCollections}
              />
              <AccordionPropertiesFilter
                availableProperties={["Lmao", "Test"]}
                filters={filters}
                propertiesFilter={filters.properties}
                changeFilterValue={setFilters}
              />
            </div>
          </div>
          <div id="dx" className={`explorerItems ml-4`}>
            <HeaderInput
              filters={filters}
              changeFilterValue={setFilters}
              filtersVisible={filtersVisible}
              setFiltersVisible={setFiltersVisible}
            />
            <MostPopular
              nfts={content}
              pagination={pagination}
              changePage={changePage}
            />

            {totalElements && parseInt(totalElements / 20) > 0 ? (
              <Pagination
                pages={totalElements ? parseInt(totalElements / 20) : 1}
                currentPage={pagination.page}
                setCurrentPage={changePage}
              />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default Explorer;
