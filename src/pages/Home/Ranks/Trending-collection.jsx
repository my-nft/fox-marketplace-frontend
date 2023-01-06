import { useEffect, useState } from "react";
import { getCollections } from "../../../api/collectionApi";
import RankItem from "../../../components/RankItem"
import Spinner from "../../../components/Spinner";

const TrendingCollection = ({collections}) => {

  return (
    <>
    {
      collections && collections.length && (
        collections.map((item,index) => {
          return <RankItem key={index} position={index+1} itemData={item} />
        })
      ) 
    }
      
    </>
  );
};

export default TrendingCollection;
