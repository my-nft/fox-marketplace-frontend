import { useLayoutEffect, useRef } from "react";
import PopularCollectionItem from "../../components/PopularCollectionItem";
import { popularAnimation } from "./Utils";

const PopularCollection = () => {
  const popularElements = useRef();

  useLayoutEffect(() => {
    const ctx = popularAnimation(popularElements);
    return () => ctx.revert();
  }, []);

  return (
    <section id="popular" className="container-fluid mt-5">
      <div id="headerPopular">
        <h3>Most Popular Collections</h3>
        <button>Browse Marketplace</button>
      </div>
      <div id="wrapperPopularItems" className="row" ref={popularElements}>
        <PopularCollectionItem />
        <PopularCollectionItem />
        <PopularCollectionItem />
        <PopularCollectionItem />
      </div>
    </section>
  );
};

export default PopularCollection;
