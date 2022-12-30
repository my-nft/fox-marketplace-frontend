import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/pagination/pagination";
import { toast } from "react-toastify";
import {
  getCollectionByAddress,
  getCollectionNftsCall,
} from "../../api/collectionApi";

const prepareProperties = (attributes) => {
  return (
    attributes.map((attribute) => {
      let properties = attribute.values.map((value) => ({
        title: value,
        active: false,
      }));

      const propertyItem = {
        name: attribute.name,
        tokens: attribute.tokens,
        properties,
      };

      return propertyItem;
    }) || []
  );
};

const CollectionDetails = () => {
  let { collectionAddress } = useParams();
  const [isLoadingCollection, setIsLoadingCollection] = useState(true);
  const [isLoadingNfts, setIsLoadingNfts] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState();

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
    properties: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState("CHANGE_FOR_MIN");

  useEffect(() => {
    initLoadCollection();
  }, []);

  const initLoadCollection = async () => {
    setIsLoadingCollection(true);
    const response = await getCollectionByAddress(collectionAddress);
    const { collection, attributes } = response.data;
    console.log("RESPONSE: ", response.data);
    setCollectionDetails(collection);
    console.log("ATTRIBUTES: ", attributes);
    console.log("PROPERTIES: ", prepareProperties(attributes));
    setFilters({
      ...filters,
      properties: prepareProperties(attributes),
    });
    setIsLoadingCollection(false);
  };

  const loadNFTs = async () => {
    if (collectionDetails) {
      const propertiesForExport = [];
      filters.properties.map((category) => {
        let propObj = {
          name: category.name,
          values: [],
        };
        category.properties.map((property) => {
          if (property.active) {
            propObj.values.push(property.title);
          }
        });
        if (propObj.values.length > 0) {
          propertiesForExport.push(propObj);
        }
      });

      setIsLoadingNfts(true);
      const nftsElements = await getCollectionNftsCall(
        collectionDetails.collectionAddress,
        {
          page: pagination.page,
          numberElements: 20,
          categories: filters.categories,

          searchPrompt: filters.searchPrompt,
          buyNow: filters.buyNow,
          isAuction: filters.isAuction,
          isNew: filters.isNew,
          hasOffers: filters.hasOffers,
          buyWithCard: filters.buyWithCard,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          buyToken: filters.buyToken,
          sortBy: filters.sortBy,
          properties: propertiesForExport,
        }
      );

      setNfts(nftsElements.data);
      setIsLoadingNfts(false);
    }
  };

  useEffect(() => {
    loadNFTs();
  }, [collectionDetails, filters]);

  const initLoadNfts = async () => {
    setIsLoadingNfts(true);
    const nftsElements = await getCollectionNftsCall(
      collectionDetails.collectionAddress,
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
    navigate(`/collection/${collectionDetails.collectionAddress}/${tokenID}`);
  };

  const changePage = (page) => {
    if (page < 1 || page > totalElements) return;
    setPagination({
      ...pagination,
      page,
    });
  };

  useEffect(() => {
    if (collectionDetails) {
      initLoadNfts();
    }
  }, [collectionDetails, pagination]);

  const updateProcessing = async (interval) => {
    const response = await getCollectionByAddress(
      collectionDetails.collectionAddress
    );
    const tempCollection = response.data;
    if (!tempCollection.importProcessing) {
      toast.clearWaitingQueue();
      toast.dismiss();
      toast.success("Congratulation your collection has been imported...");
      dispatch(setCollectionDetails(tempCollection.collection));
      clearInterval(interval);
      return;
    }
  };

  useEffect(() => {
    if (collectionDetails && collectionDetails.importProcessing) {
      toast.loading("Import progressing...");
      const interval = setInterval(() => {
        updateProcessing(interval);
      }, 10000);
      return () => {
        toast.clearWaitingQueue();
        toast.dismiss();
        clearInterval(interval);
      };
    }
  }, [collectionDetails]);

  return isLoadingCollection ? (
    <Spinner />
  ) : (
    <>
      <HeaderAccount collectionData={collectionDetails} />
      <FilterInput
        onOpenClose={() => setVisible(!visible)}
        onChangeSelectedView={changeSelectedView}
        filters={filters}
        changeFilterValue={setFilters}
      />
      <ListNfts
        nfts={content}
        isVisible={visible}
        viewType={viewType}
        handleSelectNfts={handleSelectNfts}
        filters={filters}
        changeFilterValue={setFilters}
        pagination={pagination}
        totalElements={totalElements}
        isLoadingNfts={isLoadingNfts}
        changePage={changePage}
        paginationPage={pagination.page}
      />
      {/* {isLoadingNfts ? (
        <Spinner />
      ) : (
        <>
          {!isLoadingNfts && (
            <>
              {totalElements / 20 > 1 ? (
                <Pagination
                  currentPage={pagination.page}
                  pages={totalElements ? parseInt(totalElements / 20) : 1}
                  setCurrentPage={changePage}
                />
              ) : null}
            </>
          )}
        </>
      )} */}
    </>
  );
};

export default CollectionDetails;
