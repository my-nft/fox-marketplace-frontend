import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Slide from "../../components/Slide";
import { putSliderIcons, settings } from "./Utils";

import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";

const TradingSection = ({collections = []}) => {
  const sliderRef = useRef(null);

  const [slidesToShow, setSlidesToShow] = useState(6);
  const [activeSlide, setActiveSlide] = useState(0);

  useLayoutEffect(() => {
    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }

    function handleResize() {
      const width = getWindowDimensions().width;

      if (width < 1440 && width > 1024) {
        setSlidesToShow(5);
      } else if (width < 1024 && width > 900) {
        setSlidesToShow(4);
      } else if (width < 900 && width > 500) {
        setSlidesToShow(2);
      } else if (width < 500) {
        setSlidesToShow(1);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  console.table({
    slidesToShow,
    activeSlide,
  });

  return (
    <section id="tradingNow" className="container-fluid">
      <h3 className="mb-2">Trending Now</h3>

      <div className="slickArrowsContainer">
        <Arrow
          className={`slickArrow slickArrowPrev ${
            activeSlide > 1 ? "slickArrowShow" : ""
          }`}
          onClick={() => {
            sliderRef?.current.slickPrev();
          }}
        />
        <Slider
          ref={sliderRef}
          {...settings}
          afterChange={(slide) => {
            setActiveSlide(slide + 1);
          }}
        >

          {
            collections && collections.map((item, i) => (<Slide key={i} collectionDetails={item} />))
          }
        </Slider>
        <Arrow
          className={`slickArrow slickArrowNext ${
            activeSlide < 7 - slidesToShow ? "slickArrowShow" : ""
          }`}
          onClick={() => {
            sliderRef?.current.slickNext();
          }}
        />
      </div>
    </section>
  );
};

export default TradingSection;
