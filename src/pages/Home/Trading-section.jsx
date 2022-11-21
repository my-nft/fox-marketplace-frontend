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
      <h3 className="mb-2">Trading Now</h3>
      <Slider {...settings}>
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
        <Slide />
      </Slider>
    </section>
  );
};

export default TradingSection;
