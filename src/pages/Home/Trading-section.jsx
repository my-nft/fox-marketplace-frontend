import { useEffect } from "react";
import Slider from "react-slick";
import Slide from "../../components/Slide";
import { settings } from "./Utils";

const TradingSection = () => {
  useEffect(() => {

    const prev = document.getElementsByClassName("slick-prev")[0];
    const next = document.getElementsByClassName("slick-next")[0];

    if(prev) {
      prev.innerHTML = "<";
    }

    if(next) {
      next.innerHTML = ">";
    }

    
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
