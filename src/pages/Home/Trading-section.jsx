import { useEffect } from "react";
import Slider from "react-slick";
import Slide from "../../components/Slide";
import { putSliderIcons, settings } from "./Utils";

const TradingSection = () => {
  useEffect(() => {
    putSliderIcons();
  }, []);

  return (
    <section id="tradingNow" className="container-fluid">
      <h3 className="mb-2">Trending Now</h3>
      <Slider {...settings}>
        <Slide imgSuffix={"1"}/>
        <Slide imgSuffix={"2"}/>
        <Slide imgSuffix={"3"}/>
        <Slide imgSuffix={"4"}/>
        <Slide imgSuffix={"2"}/>
        <Slide imgSuffix={"1"}/>
        <Slide imgSuffix={"3"}/>

      </Slider>
    </section>
  );
};

export default TradingSection;
