import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { Suspense, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useDispatch } from "react-redux";
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/pagination/pagination";
import { toast } from "react-toastify";
import {
  getCollectionByAddress,
  getCollectionNftsCall,
} from "../../api/collectionApi";
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
  const { collectionAddress } = useParams();
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

    minPrice: 0,
    maxPrice: 0,
    buyToken: "FXG",
    sortBy: "RECENTLY_LISTED",
    categories: [],
    properties: [],
    status: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState("CHANGE_FOR_MIN");

  const data = useLoaderData();

  const loadNFTs = async () => {
    try {
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
      const nftsElements = await getCollectionNftsCall(collectionAddress, {
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
      });

      setNfts(nftsElements.data);
      setIsLoadingNfts(false);
    } catch (error) {
      console.log(error);
      toast.error("Error loading NFTs");
    }
  };

  useEffect(() => {
    loadNFTs();
  }, [filters]);

  useEffect(() => {
    console.log("LOADING NFTS");
    loadNFTs();
  }, []);

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
    loadNFTs();
  }, [collectionDetails, pagination]);

  // const updateProcessing = async (interval) => {
  //   const response = await getCollectionByAddress(
  //     collectionDetails.collectionAddress
  //   );
  //   const tempCollection = response.data;
  //   if (!tempCollection.importProcessing) {
  //     toast.clearWaitingQueue();
  //     toast.dismiss();
  //     toast.success("Congratulation your collection has been imported...");
  //     dispatch(setCollectionDetails(tempCollection.collection));
  //     clearInterval(interval);
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   if (collectionDetails && collectionDetails.importProcessing) {
  //     toast.loading("Import progressing...");
  //     const interval = setInterval(() => {
  //       updateProcessing(interval);
  //     }, 30000);
  //     return () => {
  //       toast.clearWaitingQueue();
  //       toast.dismiss();
  //       clearInterval(interval);
  //     };
  //   }
  // }, [collectionDetails]);

  useEffect(() => {
    data.dataPromise
      .then((promiseData) => {
        setFilters({
          ...filters,
          properties: prepareProperties(promiseData[0].data.attributes),
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={data.dataPromise} errorElement={<Page404 />}>
        {(data) => {
          console.log(data);
          const collectionDetails = data[0].data.collection;

          return (
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
            </>
          );
        }}
      </Await>
    </Suspense>

  );
};

export default CollectionDetails;
