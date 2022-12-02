import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { useEffect, useState } from "react";
import { getCollectionDetails, getCollectionNfts } from './../../api/collectionApi';

const CollectionDetails = () => {

  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState("CHANGE_FOR_MIN")
  const [collectionData, setCollectionData] = useState({
      id: "",
      address: "",
      image: "",
      name : "",
      description: "",
  
      imageBanner: "",
      //totalSupply : '' => from smart contract finally
      creationDate: "",
      owner: "",
      totalVolume: "",
      floorPrice: "",
      bestOffer: "",
      listed: "",
      owners: "",
      uniqueOwner: "",
  })
  const [nfts, setNfts] = useState({
    page: "",
    totalElements: "",
    nfts: []
  });

  const [collectionOwner, setCollectionOwner] = useState(false)

  const changeSelectedView = (selection) => {
    console.log(selection);
    setViewType(selection);
  }

  useEffect(() => {
      let collectionRetrieveData = getCollectionDetails();
      let collectionNFTs = getCollectionNfts();
      if(collectionRetrieveData){
        setCollectionData(collectionRetrieveData);
        setNfts(collectionNFTs);
      }
  }, [])

  return (
    <>
      <HeaderAccount collectionData={collectionData}  />
      <FilterInput onOpenClose={() => setVisible(!visible)} onChangeSelectedView={changeSelectedView}/>
      <ListNfts collectionNFTs={nfts.nfts} isVisible={visible} viewType={viewType}/>
    </>
  );
};

export default CollectionDetails;
