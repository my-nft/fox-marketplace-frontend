import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { useEffect, useState } from "react";
import { getCollectionDetails } from './../../api/collectionApi';

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
      totalVolume: "",
      creationDate: "",
      owner: "",
      totalVolume: "",
      floorPrice: "",
      bestOffer: "",
      listed: "",
      owners: "",
      uniqueOwner: "",
  })

  const [collectionOwner, setCollectionOwner] = useState(false)

  const changeSelectedView = (selection) => {
    console.log(selection);
    setViewType(selection);
  }

  useEffect(() => {
      let collectionRetrieveData = getCollectionDetails();
      if(collectionRetrieveData){
        setCollectionData(collectionRetrieveData);

      }
  })

  return (
    <>
      <HeaderAccount collectionData={collectionData}  />
      <FilterInput onOpenClose={() => setVisible(!visible)} onChangeSelectedView={changeSelectedView}/>
      <ListNfts isVisible={visible} viewType={viewType}/>
    </>
  );
};

export default CollectionDetails;
