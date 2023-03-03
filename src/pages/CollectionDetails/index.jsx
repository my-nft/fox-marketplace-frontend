import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { Suspense, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import {
  Await,
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCollectionByAddress,
  getCollectionNftsCall,
} from "../../api/collectionApi";

import ConfirmationPopup from "./../../components/confirmationPopup/confirmationPopup";
import Page404 from "../404/404";

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
  const [isLoadingNfts, setIsLoadingNfts] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState();
  const [isProcessing, setIsProcessing] = useState("noProcess");
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState("CHANGE_FOR_MIN");
  const [pagination, setPagination] = useState({
    page: 1,
    numberElements: 20,
  });

  const [filters, setFilters] = useState({
    searchPrompt: "",

    minPrice: 0,
    maxPrice: 0,
    buyToken: "FXG",
    sortBy: "RECENTLY_LISTED",
    categories: [],
    properties: [],
    status: [],
  });
  const [nfts, setNfts] = useState({});
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setPagination({
      ...pagination,
      page: Number(searchParams.get("page")) || 1,
    });
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, [searchParams]);

  const navigate = useNavigate();

  const { totalElements, content } = nfts;

  useEffect(() => {
    loaderData.dataPromise.then((data) => {
      setCollectionDetails(data.data.collection);
      setFilters({
        ...filters,
        properties: prepareProperties(data.data.attributes),
      });
    });
  }, []);

  // load nfts for collection
  const loadNFTs = async () => {
    try {
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
            status: filters.status,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            buyToken: filters.buyToken,
            sortBy: filters.sortBy,
            properties: propertiesForExport,
          }
        );

        setNfts(nftsElements.data);
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading NFTs");
    } finally {
      setIsLoadingNfts(false);
    }
  };

  useEffect(() => {
    if (collectionDetails) loadNFTs();
  }, [collectionDetails, filters, pagination]);

  const changeSelectedView = (selection) => {
    setViewType(selection);
  };

  const handleSelectNfts = (tokenID) => {
    navigate(`/collection/${collectionDetails.collectionAddress}/${tokenID}`);
  };

  const changePage = (page) => {
    if (page < 1 || page > totalElements) return;
    setSearchParams({ page: page });
  };

  // import processing
  const updateProcessing = async (interval) => {
    const response = await getCollectionByAddress(
      collectionDetails.collectionAddress
    );
    const tempCollection = response.data;
    if (!tempCollection.collection.importProcessing) {
      setIsProcessing("processingFinished");
      toast.clearWaitingQueue();
      toast.dismiss();
      setCollectionDetails(tempCollection.collection);
      clearInterval(interval);
    }
  };

  useEffect(() => {
    if (collectionDetails && collectionDetails.importProcessing) {
      toast.loading("Import progressing...");
      setIsProcessing("isProcessing");
      const interval = setInterval(() => {
        updateProcessing(interval);
      }, 15000);
      return () => {
        toast.clearWaitingQueue();
        toast.dismiss();
        clearInterval(interval);
      };
    }
  }, [collectionDetails]);
  

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={loaderData.dataPromise} errorElement={<Page404 />}>
        {() => {
          return (
            <>
              {collectionDetails && (
                <>
                  {isProcessing === "processingFinished" && (
                    <ConfirmationPopup
                      title="Import has been finished"
                      message="Congratulation your collection has been imported. Do you want to refresh the page?"
                      onConfirm={() => window.location.reload()}
                      onCancel={() => {}}
                    />
                  )}
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
                </>
              )}
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default CollectionDetails;
