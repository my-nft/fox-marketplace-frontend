import { useEffect, useRef } from "react";
import Slider from "react-slick";
import Slide from "../../components/Slide";
import { putSliderIcons, settings } from "./Utils";

import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";

const TradingSection = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    putSliderIcons();
  }, []);

  return (
    <section id="tradingNow" className="container-fluid">
      <h3 className="mb-2">Trending Now</h3>

      <div className="slickArrowsContainer">
        <Arrow
          className="slickArrow slickArrowPrev"
          onClick={() => {
            sliderRef?.current.slickPrev();
          }}
        />
        <Slider ref={sliderRef} {...settings}>
          <Slide imgSuffix={"1"} />
          <Slide imgSuffix={"2"} />
          <Slide imgSuffix={"3"} />
          <Slide imgSuffix={"4"} />
          <Slide imgSuffix={"2"} />
          <Slide imgSuffix={"1"} />
          <Slide imgSuffix={"3"} />
        </Slider>
        <Arrow
          className="slickArrow slickArrowNext"
          onClick={() => {
            sliderRef?.current.slickNext();
          }}
        />
      </div>
    </section>
  );
};

export default TradingSection;
