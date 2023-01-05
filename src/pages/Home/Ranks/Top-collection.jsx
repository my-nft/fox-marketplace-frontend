import { useEffect, useState } from "react";
import { getCollections } from "../../../api/collectionApi";
import RankItem from "../../../components/RankItem";
import Spinner from "../../../components/Spinner";

const TopCollections = ({collections}) => {

  return (
    <>
      {
        collections && collections.length && (
          collections.map((item,index) => {
            return <RankItem key={index} itemData={item} />
          })
        )
       
      }
    </>
  );
};

export default TopCollections;
