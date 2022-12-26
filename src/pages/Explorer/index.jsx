import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionsCall } from "../../api/collectionApi";
import { getListedNfts } from "../../api/nftApi";
import HeaderInput from "../../components/marketplace/HeaderInput";
import Pagination from "../../components/pagination/pagination";
import Spinner from "../../components/Spinner";

import { LOAD_MARKET_PLACE } from "../../saga/actions";
import AccordingCollection from "./AccordingCollection";
import AccordingStatus from "./AccordingStatus";
import AccordionPrice from "./AccordionPrice";
import MostPopular from "./MostPopular";
import MostPopularCollection from "./MostPopularCollection";
import AccordionPropertiesFilter from "./PropertiesFilter";

const Explorer = () => {
  const dispatch = useDispatch();


  const [isLoadingState, setIsLoadingState] = useState(true);
  const [isLoadingMspl, setIsLoadingMspl] = useState(true);
  const [isLoadingSearcheableState, setIsLoadingSearcheableState] = useState(true);

  const [searcheableCollections, setSearcheableCollections] = useState([]);
  const [mostPopularCollections, setMostPopularCollections] = useState([]);
  const [nfts, setNfts] = useState({});

  const { totalElements, content } = nfts || {};

  const [filtersVisible, setFiltersVisible] = useState(false);

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
    collection: "",
    properties: [],
  });


  const loadMostPopular = async () => {
    setIsLoadingMspl(true);
    const mostPopular = await getCollectionsCall({
      numberElements: pagination.numberElements,
      page: pagination.page,
    });
    const {data} = mostPopular;
    setMostPopularCollections(data.content);
    setIsLoadingMspl(false);
  };
  
  const loadListedNfts = async () => {
    setIsLoadingState(true);
    const listedNfts = await getListedNfts(pagination.page, pagination.numberElements)
    setNfts(listedNfts.data);
    setIsLoadingState(false);
  }

  const loadSearchable = async () => {
    setIsLoadingSearcheableState(true);
    const searchableCollections = await getCollectionsCall({
      numberElements: pagination.numberElements,
      page: pagination.page,
    });

    const {data} = searchableCollections;
    setSearcheableCollections(data?.content);
    setIsLoadingSearcheableState(false);
  }



  useEffect(() => {
    loadMostPopular();
    loadListedNfts();
    loadSearchable();
  }, [pagination]);

  const changePage = (page) => {
    if (page < 1 || page > Math.ceil(totalElements / 20)) return;
    setPagination({
      ...pagination,
      page,
    });
  };

  return (
    <>
      {isLoadingMspl ? (
        <Spinner />
      ) : (
        <MostPopularCollection collections={mostPopularCollections} />
      )}

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

              {isLoadingSearcheableState ? (
                <Spinner />
              ) : (
                <AccordingCollection
                  listSearcheableCollections={searcheableCollections}
                  filters={filters}
                  changeFilterValue={setFilters}
                />
              )}

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

            {isLoadingState ? (
              <Spinner />
            ) : (
              <MostPopular
                nfts={content}
                pagination={pagination}
                changePage={changePage}
              />
            )}

              <Pagination
                pages={totalElements ? Math.ceil(totalElements / 20) : 1}
                currentPage={pagination.page}
                setCurrentPage={changePage}
              />
          </div>
        </div>
      </section>
    </>
  );
};

export default Explorer;
