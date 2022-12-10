import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderInput from "../../components/marketplace/HeaderInput";
import Pagination from "../../components/pagination/pagination";
import Spinner from "../../components/Spinner";
import {
  selectMostPopularCollections,
  selectSearcheableCollection,
} from "../../redux/collectionReducer";

import {selectIsLoading, selectListedNfts} from '../../redux/nftReducer';

import {
  LOAD_MARKET_PLACE,
} from "../../saga/actions";
import AccordingCollection from "./AccordingCollection";
import AccordingStatus from "./AccordingStatus";
import AccordionPrice from "./AccordionPrice";
import Command from "./Command";
import MostPopular from "./MostPopular";
import MostPopularCollection from "./MostPopularCollection";

const Explorer = () => {
  const dispatch = useDispatch();

  const mostPopularCollections = useSelector(selectMostPopularCollections);
  const searcheableCollections = useSelector(selectSearcheableCollection);
  const marketPlaceNfts = useSelector(selectListedNfts);
 
  const isLoadingApi = useSelector(selectIsLoading);

  const [filtersVisible, setFiltersVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    numberElements: 10,
    page: 1,
    maxPages: 5
  })

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    buyToken: "ETH",
    status: "ALL",
    showRaritiy: false,
    sortBy: "RECENTLY_LISTED"
  })

  useEffect(() => {
    console.log(filters)
  }, [filters])

  useEffect(() => {
    setIsLoading(isLoadingApi);
  }, [isLoadingApi])

  const loadMarketPlace = () => {
    dispatch({
      type: LOAD_MARKET_PLACE,
      payload: {
        numberElements: pagination.numberElements,
        page: pagination.page,
      },
    });
  }

  useEffect(() => {
    loadMarketPlace();
  }, [pagination]);

  const changePage = (page) => {
    if( page < 1 || page > pagination.maxPages) return;
    setPagination({
      ...pagination,
      page
    })
  }


  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <MostPopularCollection collections={mostPopularCollections} />
      <section id="marketplace" class="container-fluid mb-5">
        <div class="row">
          <div id="sx" className={`col-md-3 filtersContainer filtersExplorer ${filtersVisible ? null : 'filtersHide'}`}>
            <Command filters={filters} changeFilterValue={setFilters} toggleFilters={() => setFiltersVisible(!filtersVisible)} />
            <div className="filtersCollapsible" >
              <AccordingStatus filters={filters} changeFilterValue={setFilters} />
              <AccordionPrice filters={filters} changeFilterValue={setFilters} />

              <AccordingCollection
                listSearcheableCollections={searcheableCollections}
              />
            </div>
          
          </div>
          <div id="dx" className={`col-md-9`}>
            <HeaderInput filters={filters} changeFilterValue={setFilters} />
            <MostPopular nfts={marketPlaceNfts} pagination={pagination} changePage={changePage} />
            <Pagination
              pages={pagination.maxPages}
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
