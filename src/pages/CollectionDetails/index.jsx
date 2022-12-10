import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { useEffect, useState } from "react";
import {
  getCollectionByAddress,
  getCollectionNftsCall,
} from "../../api/collectionApi";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOAD_NFT_DETAIL } from "../../saga/actions";
import {
  selectCollectionDetails,
  selectCurrentCollectionNfts,
  selectIsLoading,
  selectIsLoadingNfts,
} from "../../redux/collectionReducer";

const CollectionDetails = () => {
  
  
  const detailCollection = useSelector(selectCollectionDetails);
  const nfts = useSelector(selectCurrentCollectionNfts);

  const isLoadingCollection = useSelector(selectIsLoading);
  const isLoadingNfts = useSelector(selectIsLoadingNfts);

  const [pagination, setPagination] = useState({
    page: 1,
    numberElements: 100,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState("CHANGE_FOR_MIN");

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


  console.log("---------------------------", nfts);

  return isLoadingCollection ? (
    <Spinner />
  ) : (
    <>
      <HeaderAccount collectionData={detailCollection} />
      <FilterInput
        onOpenClose={() => setVisible(!visible)}
        onChangeSelectedView={changeSelectedView}
      />
      {isLoadingNfts ?  <Spinner /> : (
        <ListNfts
          nfts={nfts}
          isVisible={visible}
          viewType={viewType}
          handleSelectNfts={handleSelectNfts}
        />
      )}
    </>
  );
};

export default CollectionDetails;
