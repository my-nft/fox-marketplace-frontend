import FilterInput from "./Filters";
import ListNfts from "./NFTs";
import { useState } from "react";
import AccountHeader from "./AccountHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCollections,
  selectIsLoadingAccount,
  selectNfts,
} from "../../redux/accountReducer";
import Spinner from "../../components/Spinner";
import {
  LOAD_ACCOUNT_COLLECTIONS,
  LOAD_ACCOUNT_NFTS,
  LOAD_USER,
} from "../../saga/actions";
import Pagination from "../../components/pagination/pagination";
import { getCurrentWalletConnected } from "../../utils/blockchainInteractor";
import { selectConnectedUser } from "../../redux/userReducer";

const AccountPage = () => {
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState("CHANGE_FOR_MIN");
  const [activeSection, setActiveSection] = useState("COLLECTIONS");
  const collections = useSelector(selectCollections);
  const nfts = useSelector(selectNfts);

  let content = [];
  let totalElements = 0;

  if(activeSection === 'COLLECTIONS') {
    content = collections?.content || [];
    totalElements = collections?.totalElements || 0;
  } else {
    content = nfts?.content || [];
    totalElements = nfts?.totalElements || 0;
  }

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
    categories: [],
    sortBy: "RECENTLY_LISTED",
  });

  const dispatch = useDispatch();
  const connectedWallet = getCurrentWalletConnected();
  const user = useSelector(selectConnectedUser);
  const isLoading = useSelector(selectIsLoadingAccount);

  const changePage = (page) => {
    if (page < 1 || page > pagination.maxPages) return;
    setPagination({
      ...pagination,
      page,
    });
  };

  const runDispatchNfts = (body) => {
    dispatch({
      type: LOAD_ACCOUNT_NFTS,
      payload: {
        ...body,
        page: pagination.page,
        numberElements: pagination.numberElements,
      },
    });
  };

  const runInit = () => {
    if (activeSection === "COLLECTIONS") {
      dispatch({
        type: LOAD_ACCOUNT_COLLECTIONS,
        payload: {
          ...pagination,
          ownerAddress: connectedWallet,
          page: pagination.page,
          numberElements: pagination.numberElements,
        },
      });
    } else if (activeSection === "NFTS") {
      runDispatchNfts({
        ownerAddress: connectedWallet,
      });
    } else if (activeSection === "CREATED") {
      runDispatchNfts({
        creatorAddress: connectedWallet,
      });
    } else if (activeSection === "COLLECTED") {
      runDispatchNfts({
        ownerAddress: connectedWallet,
        collectedOnly: true,
      });
    } else if (activeSection === "LISTED") {
      runDispatchNfts({
        isListed: true,
        ownerAddress: connectedWallet,
      });
    }
  };

  useEffect(() => {
    runInit();
  }, [pagination]);

  useEffect(() => {
    setPagination({
      ...pagination,
      page: 1,
    });
    runInit();
  }, [activeSection]);

  useEffect(() => {
    dispatch({
      type: LOAD_USER,
      payload: connectedWallet,
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <AccountHeader user={user} />
          <FilterInput
            onOpenClose={() => setVisible(!visible)}
            onChangeSelectedView={setViewType}
            onChangeActiveSection={setActiveSection}
            changeFilterValue={setFilters}
            filters={filters}
            activeSection={activeSection}
          />
          <ListNfts
            activeSection={activeSection}
            isVisible={visible}
            viewType={viewType}
            nfts={content}
            collections={content}
            filters={filters}
            changeFilterValue={setFilters}
          />
            <Pagination
              currentPage={pagination.page}
              setCurrentPage={changePage}
              pages={totalElements ? Math.ceil(totalElements / 20) : 1}
            />
        </>
      )}
      <span className="d-block mt-4 mb-5"></span>
    </div>
  );
};

export default AccountPage;
