import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { useEffect, useState } from "react";
import {
  getCollectionByAddress,
  getCollectionNftsCall,
} from "./../../api/collectionApi";
import Spinner from "../../components/Spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOAD_NFT_DETAIL } from "../../saga/actions";


export const collectionAddress_tochange = '0xAFac09848E595061B22415159608bfD7bD8A83A7';

const CollectionDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [detailCollection, setDetailCollection] = useState();
  const [nfts, setNfts] = useState([]);
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

  const init = async () => {
    let collectionData = await getCollectionByAddress(collectionAddress_tochange);
    let collectionNFTs = await getCollectionNftsCall(collectionAddress_tochange, pagination);

    setDetailCollection(collectionData.data);
    setNfts(collectionNFTs.data);
    setIsLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  const handleSelectNfts = (tokenID) => {
    dispatch({
      type : LOAD_NFT_DETAIL,
      payload : {
        collectionAddress : collectionAddress_tochange,
        tokenID : tokenID
      }
    });
    navigate('/my-nft')
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <HeaderAccount collectionData={detailCollection} />
      <FilterInput
        onOpenClose={() => setVisible(!visible)}
        onChangeSelectedView={changeSelectedView}
      />
      <ListNfts collectionNFTs={nfts} isVisible={visible} viewType={viewType} handleSelectNfts={handleSelectNfts} />
    </>
  );
};

export default CollectionDetails;
