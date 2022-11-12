import { useLayoutEffect, useRef } from "react";
import { topAnimation } from "./Utils";

const FirstSection = () => {
  const elements = useRef();

  useLayoutEffect(() => {
    const ctx = topAnimation(elements);
    return () => ctx.revert();
  }, []);

  return (
    <section id="topSection" className="mb-5">
      <img src="/assets/images/Background.jpg" id="layer" alt="" />

      <h2 className="text-center mt-5 mb-5">
        {" "}
        THE FIRST NFT MARKETPLACE MADE ON FUNCTIONX
      </h2>
      <h3 className="text-center mb-5">
        Explore, trade and collect digital art
      </h3>
      <div id="bannerHome" className="mb-5">
        <img src="/assets/images/listElements.png" id="oneElement" alt="" />

        <div id="wrappedBannerHome" ref={elements}>
          <img
            src="/assets/images/Element1.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element2.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element3.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element4.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element5.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element6.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element7.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element8.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element9.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element10.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element11.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element12.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element13.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element14.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element15.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element16.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element17.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element18.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element19.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element20.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element21.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element22.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element23.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element24.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element25.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element26.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element27.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element28.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element29.png"
            className="listElements"
            alt=""
          />
          <img
            src="/assets/images/Element30.png"
            className="listElements"
            alt=""
          />
        </div>
        <img src="/assets/images/Logo_fox.png" id="foxLogo" alt="" />
      </div>
    </section>
  );
};

export default FirstSection;
