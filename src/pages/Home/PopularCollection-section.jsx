import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getCollections } from "../../api/collectionApi";
import PopularCollectionItem from "../../components/PopularCollectionItem";
import Spinner from "../../components/Spinner";
import { popularAnimation } from "./Utils";

const PopularCollection = () => {
  const popularElements = useRef();

  const [popularCollections, setPopularCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const ctx = popularAnimation(popularElements);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setLoading(true)
    //let items = getCollections(null, "MOST_POPULAR");
    let items = [];

    if(items.length !== 0) {
      setPopularCollections(items);
    }
    
  }, [])

  return (
    <section id="popular" className="container-fluid mt-5">
      <div id="headerPopular">
        <h3>Most Popular Collections</h3>
        <button>Browse Marketplace</button>
      </div>
      <div id="wrapperPopularItems" className="row" ref={popularElements}>
        {
          loading && popularCollections.length === 0
          ? <Spinner />
          : popularCollections.map((item, index) => {
            return <PopularCollectionItem key={index} itemData={item} />
          })
        }
   
      </div>
    </section>
  );
};

export default PopularCollection;
