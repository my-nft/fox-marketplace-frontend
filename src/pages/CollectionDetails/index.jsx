import FilterInput from "./FilterInput";
import HeaderAccount from "./HeaderAccount";
import ListNfts from "./ListNfts";
import { useState } from "react";

const CollectionDetails = () => {

  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState("CHANGE_FOR_MIN")

  const changeSelectedView = (selection) => {
    console.log(selection);
    setViewType(selection);
  }

  return (
    <>
      <HeaderAccount />
      <FilterInput onOpenClose={() => setVisible(!visible)} onChangeSelectedView={changeSelectedView}/>
      <ListNfts isVisible={visible} viewType={viewType}/>
    </>
  );
};

export default CollectionDetails;
