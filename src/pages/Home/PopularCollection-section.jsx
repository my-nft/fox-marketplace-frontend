import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getCollections } from "../../api/collectionApi";
import PopularCollectionItem from "../../components/PopularCollectionItem";
import Spinner from "../../components/Spinner";
import { popularAnimation } from "./Utils";
import { Link } from "react-router-dom";

const PopularCollection = ({popularCollections}) => {
  const popularElements = useRef();


  useLayoutEffect(() => {
    const ctx = popularAnimation(popularElements);
    return () => ctx.revert();
  }, []);



  return (
    <section id="popular" className="container-fluid mt-5">
      <div id="headerPopular">
        <h3>Most Popular Collections</h3>
        <Link to="/explore">
          <button>Browse Marketplace</button>
        </Link>
      </div>
      <div id="wrapperPopularItems" className="row" ref={popularElements}>
        {popularCollections.length === 0 ? (
          <Spinner />
        ) : (
          popularCollections.map((item, index) => {
            return <PopularCollectionItem key={index} itemData={item} />;
          })
        )}
      </div>
    </section>
  );
};

export default PopularCollection;
