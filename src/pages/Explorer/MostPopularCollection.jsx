import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getCollections } from "../../api/collectionApi";
import ExplorePopularCollectionItem from "../../components/ExplorePopularCollectionItem";
import { putSliderIcons, settings } from "../Home/Utils";

const MostPopularCollection = () => {

  const [popularCollections, setPopularCollections] = useState([]);

  useEffect(() => {


    let items = getCollections(null, "MOST_POPULAR")
    if(items) {
      setPopularCollections(items)
    }

    putSliderIcons();
  }, []);

  

  return (
    <section id="marketPlace" className="container-fluid">
      <img src="./assets/images/Background.jpg" id="layer" />
      <h3 className="mb-2 mt-2 text-center">Most popular collection</h3>
      {
        popularCollections.length > 0
        ?
        <Slider {...settings}>
          {
            popularCollections.map((item, index) => {
              return (
                <ExplorePopularCollectionItem key={index} itemData={item} />
              )
            })
          }
         
        </Slider>
        : null
      }
      
    </section>
  );
};

export default MostPopularCollection;
