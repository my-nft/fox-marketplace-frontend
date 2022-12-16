import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getCollections } from "../../api/collectionApi";
import ExplorePopularCollectionItem from "../../components/ExplorePopularCollectionItem";
import { putSliderIcons, settings } from "../Home/Utils";

const MostPopularCollection = ({ collections }) => {
  const [popularCollections, setPopularCollections] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    if (!isDragging) {
      navigate(link);
    }
  };

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
        <Slider {...settings} className="explorer-slick">
          {popularCollections.map((item, index) => {
            return <ExplorePopularCollectionItem key={index} itemData={item} />;
          })}
        </Slider>
      ) : null}
    </section>
  );
};

export default MostPopularCollection;
