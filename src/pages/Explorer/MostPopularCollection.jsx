import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getCollections } from "../../api/collectionApi";
import ExplorePopularCollectionItem from "../../components/ExplorePopularCollectionItem";
import { putSliderIcons, settings } from "../Home/Utils";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";

const MostPopularCollection = ({ collections }) => {
  const [popularCollections, setPopularCollections] = useState([]);

  const [slidesToShow, setSlidesToShow] = useState(6);
  const [activeSlide, setActiveSlide] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const handleLinkClick = (link) => {
    if (!isDragging) {
      navigate(link);
    }
  };

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

  useEffect(() => {
    console.log("DRAGGING", isDragging);
  }, [isDragging]);

  useEffect(() => {
    setPopularCollections(collections);
    putSliderIcons();
  }, []);

  return (
    <section id="marketPlace" className="container-fluid">
      <img src="/assets/images/Background.jpg" id="layer" />
      <h3 className="mb-2 mt-2 text-center">Most popular collection</h3>
      {popularCollections.length > 0 ? (
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
            className="explorer-slick"
            afterChange={(slide) => {
              setActiveSlide(slide + 1);
            }}
          >
            {popularCollections.map((item, index) => {
              return (
                <ExplorePopularCollectionItem key={index} itemData={item} />
              );
            })}
          </Slider>
          <Arrow
            className={`slickArrow slickArrowNext ${
              activeSlide < popularCollections.length - slidesToShow
                ? "slickArrowShow"
                : ""
            }`}
            onClick={() => {
              sliderRef?.current.slickNext();
            }}
          />
        </div>
      ) : null}
    </section>
  );
};

export default MostPopularCollection;
