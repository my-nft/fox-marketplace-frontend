import { useEffect, useState } from "react";
import { getCollectionsCall } from "../../api/collectionApi";
import { getListedNfts } from "../../api/nftApi";
import HeaderInput from "../../components/marketplace/HeaderInput";
import Pagination from "../../components/pagination/pagination";
import Spinner from "../../components/Spinner";

import AccordingCollection from "./AccordingCollection";
import AccordingStatus from "./AccordingStatus";
import AccordionPrice from "./AccordionPrice";
import MostPopular from "./MostPopular";
import MostPopularCollection from "./MostPopularCollection";
import { availableProperties } from "./properties";
import { scrollTop } from "../../components/scrollToTop";

const INIT_PAGINATION = {
  numberElements: 20,
  page: 1,
};

const Explorer = () => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [isLoadingMspl, setIsLoadingMspl] = useState(true);
  const [isLoadingSearcheableState, setIsLoadingSearcheableState] =
    useState(true);

  const [searcheableCollections, setSearcheableCollections] = useState([]);
  const [mostPopularCollections, setMostPopularCollections] = useState([]);
  const [nfts, setNfts] = useState({});

  const { totalElements, content } = nfts || {};

  const [filtersVisible, setFiltersVisible] = useState(false);

  const [pagination, setPagination] = useState(INIT_PAGINATION);

  const [filters, setFilters] = useState({
    sortBy: "RECENTLY_LISTED",
    collection: "",
    properties: availableProperties,
    collectionAddress: undefined,
    status: [],
    minPrice: undefined,
    maxPrice: undefined,
    buyToken: "FXG",
  });

  const loadMostPopular = async () => {
    setIsLoadingMspl(true);
    const mostPopular = await getCollectionsCall({
      numberElements: pagination.numberElements,
      page: pagination.page,
    });
    const { data } = mostPopular;
    setMostPopularCollections(data.content);
    setIsLoadingMspl(false);
  };

  const loadListedNfts = async () => {
    setIsLoadingState(true);
    const listedNfts = await getListedNfts(
      pagination.page,
      pagination.numberElements,
      filters.status,
      filters.collectionAddress,
      filters.minPrice,
      filters.maxPrice,
      filters.sortBy
    );
    setNfts(listedNfts.data);
    setIsLoadingState(false);
  };

  const loadSearchable = async () => {
    setIsLoadingSearcheableState(true);
    const searchableCollections = await getCollectionsCall({
      numberElements: pagination.numberElements,
      page: pagination.page,
    });

    const { data } = searchableCollections;
    setSearcheableCollections(data?.content);
    setIsLoadingSearcheableState(false);
  };

  useEffect(() => {
    loadMostPopular();
    loadListedNfts();
    loadSearchable();
  }, []);

  useEffect(() => {
    loadListedNfts();
  }, [pagination]);

  const changePage = (page) => {
    if (page < 1 || page > Math.ceil(totalElements / 20)) return;
    setPagination({
      ...pagination,
      page,
    });
    scrollTop();
  };

  useEffect(() => {
    console.log(filters);
    if (pagination === INIT_PAGINATION) {
      loadListedNfts();
    } else {
      setPagination(INIT_PAGINATION);
    }
  }, [filters]);

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
