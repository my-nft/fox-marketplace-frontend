import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOAD_NFT_DETAIL } from "../../saga/actions";
import {
  selectCollectionDetails,
  selectIsLoading,
  setCollectionDetails,
} from "../../redux/collectionReducer";
import Pagination from "../../components/pagination/pagination";
import { toast, ToastContainer } from "react-toastify";
import {
  getCollectionByAddress,
  getCollectionNftsCall,
} from "../../api/collectionApi";

const CollectionDetails = () => {
  const detailCollection = useSelector(selectCollectionDetails);

  const isLoadingCollection = useSelector(selectIsLoading);
  const [isLoadingNfts, setIsLoadingNfts] = useState(true);

  const [nfts, setNfts] = useState({});
  const { totalElements, content } = nfts;

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

  const initLoadNfts = async () => {
    setIsLoadingNfts(true);
    const nftsElements = await getCollectionNftsCall(
      detailCollection.collectionAddress,
      {
        page: pagination.page,
        numberElements: 20,
      }
    );
    setNfts(nftsElements.data);
    setIsLoadingNfts(false);
  };

  const changeSelectedView = (selection) => {
    setViewType(selection);
  };

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

  const updateProcessing = async (interval) => {
    const response = await getCollectionByAddress(
      detailCollection.collectionAddress
    );
    const tempCollection = response.data;
    if (!tempCollection.importProcessing) {
      toast.clearWaitingQueue();
      toast.dismiss();
      toast.success("Congratulation your collection has been imported...");
      dispatch(setCollectionDetails(tempCollection));
      clearInterval(interval);    
      return;
    }
  };

  useEffect(() => {
    if (detailCollection.importProcessing) {
      toast.loading("Import progressing...");
      const interval = setInterval(() => {
        updateProcessing(interval);
      }, 1000);
      return () => {
        toast.clearWaitingQueue();
        toast.dismiss();
        clearInterval(interval);
      };
    }
  }, []);

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
            pages={totalElements ? parseInt(totalElements / 20) : 1}
            setCurrentPage={changePage}
          />
        </>
      )}
    </>
  );
};

export default CollectionDetails;
