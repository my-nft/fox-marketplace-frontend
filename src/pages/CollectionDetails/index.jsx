import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { useEffect, useState } from "react";
import {
  getCollectionByAddress,
  getCollectionById,
  getCollectionDetails,
  getCollectionNftsCall,
} from "./../../api/collectionApi";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";


const collectionAddress_tochange = '0xAFac09848E595061B22415159608bfD7bD8A83A7';

const CollectionDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [detailCollection, setDetailCollection] = useState();
  const [nfts, setNfts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    numberElements: 20,
  });

  useEffect(() => {

  }, []);

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

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <HeaderAccount collectionData={detailCollection} />
      <FilterInput
        onOpenClose={() => setVisible(!visible)}
        onChangeSelectedView={changeSelectedView}
      />
      <ListNfts collectionNFTs={nfts} isVisible={visible} viewType={viewType} />
    </>
  );
};

export default CollectionDetails;
