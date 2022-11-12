import React from "react";
import FirstSection from "./Top-section";
import PopularCollection from "./PopularCollection-section";
import RanksSection from "./Ranks-section";
import TradingSection from "./Trading-section";
import UpcomingMints from "./UpcomingMints";

const Home = () => {
  return (
    <>
      <FirstSection />
      <TradingSection />
      <RanksSection />
      <PopularCollection />
      <UpcomingMints />
    </>
  );
};

export default Home;
