import { useEffect } from "react";
import Slider from "react-slick";
import Slide from "../../components/layout/Slide";

const settings = {
  slidesToShow: 6,
  arrows: true,
  dots: false,
  speed: 500,
  autoplay: false,
  pauseOnHover: false,
  pauseOnFocus: false,
  autoplaySpeed: 0,
  customPaging: function () {
    return "";
  },
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 5,
      },
    },

    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
  ]
};

const TradingSection = () => {
  useEffect(() => {
    document.getElementsByClassName("slick-prev")[0].innerHTML = "<";
    document.getElementsByClassName("slick-next")[0].innerHTML = ">";
  }, []);

  return (
    <section id="tradingNow" className="container-fluid">
      <h3 className="mb-2">Trading Now</h3>
      <Slider {...settings}>
        <Slide onClick = {() => console.log("ici")} />
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
        <Slide />
        <Slide />
      </Slider>
    </section>
  );
};

export default TradingSection;
