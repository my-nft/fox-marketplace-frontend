import React, { useEffect, useState } from "react";
import FirstSection from "./Top-section";
import PopularCollection from "./PopularCollection-section";
import RanksSection from "./Ranks-section";
import TradingSection from "./Trading-section";
import UpcomingMints from "./UpcomingMints";
import { getCollectionsCall } from "../../api/collectionApi";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [collections, setCollections] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    setIsLoading(true);
    const response = await getCollectionsCall({
      filter: {
        tag: "TRENDING"
      }
    });
    const {content} = response.data;
    setCollections(content);
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <FirstSection />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <TradingSection collections={collections} />
          <RanksSection trendingCollections={collections} topCollections={collections}/>
          <PopularCollection popularCollections={collections}/>
          <UpcomingMints />
        </>
      )}
    </>
  );
};

export default Home;
