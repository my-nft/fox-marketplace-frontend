import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOAD_COLLECTION_NFTS, LOAD_NFT_DETAIL } from "../../saga/actions";
import {
  selectCollectionDetails,
  selectCurrentCollectionNfts,
  selectIsLoading,
  selectIsLoadingNfts,
} from "../../redux/collectionReducer";
import Pagination from "../../components/pagination/pagination";

const CollectionDetails = () => {
  const detailCollection = useSelector(selectCollectionDetails);

  const isLoadingCollection = useSelector(selectIsLoading);
  const isLoadingNftsSelector = useSelector(selectIsLoadingNfts);
  const [isLoadingNfts, setIsLoadingNfts] = useState(true);

  const nftsSelector = useSelector(selectCurrentCollectionNfts);
  const {totalElements, content} = nftsSelector || {};

  useEffect(() => {
    setIsLoadingNfts(isLoadingNftsSelector);
  }, [isLoadingNftsSelector])

  const [pagination, setPagination] = useState({
    page: 1,
    numberElements: 20,
  });

  const [filters, setFilters] = useState({
    searchPrompt: "",
    buyNow: false,
    isAuction: false,
    isNew: false,
    hasOffers: false,
    buyWithCard: false,
    minPrice: 0,
    maxPrice: 0,
    buyToken: "ETH",
    sortBy: "RECENTLY_LISTED",
    categories: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState("CHANGE_FOR_MIN");

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    initLoadNfts();
  }, []);

  const initLoadNfts = () => {
    dispatch({
      type: LOAD_COLLECTION_NFTS,
      payload: {
        collectionAddress: detailCollection.collectionAddress,
        page: pagination.page,
        numberElements: 20,
      },
    });
  };

  const changeSelectedView = (selection) => {
    console.log(selection);
    setViewType(selection);
  };

  useEffect(() => {
    if (detailCollection && detailCollection.importProcessing) {
      // dispatch in timer to reload
    }
  }, [detailCollection]);

  const handleSelectNfts = (tokenID) => {
    dispatch({
      type: LOAD_NFT_DETAIL,
      payload: {
        collectionAddress: detailCollection.collectionAddress,
        tokenID: tokenID,
      },
    });
    navigate("/my-nft");
  };

  const changePage = (page) => {
    if (page < 1 || page > totalElements) return;
    setPagination({
      ...pagination,
      page,
    });
  };

  useEffect(() => {
    initLoadNfts();
  }, [pagination]);

  return isLoadingCollection ? (
    <Spinner />
  ) : (
    <>
      <HeaderAccount collectionData={detailCollection} />
      <FilterInput
        onOpenClose={() => setVisible(!visible)}
        onChangeSelectedView={changeSelectedView}
        filters={filters}
        changeFilterValue={setFilters}
      />
      {isLoadingNfts ? (
        <Spinner />
      ) : (
        <>
          <ListNfts
            nfts={content}
            isVisible={visible}
            viewType={viewType}
            handleSelectNfts={handleSelectNfts}
            filters={filters}
            changeFilterValue={setFilters}
          />
          <Pagination
            currentPage={pagination.page}
            pages={totalElements}
            setCurrentPage={changePage}
          />
        </>
      )}
    </>
  );
};

export default CollectionDetails;
