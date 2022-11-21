import Slider from "react-slick";
import ExplorePopularCollectionItem from "../../components/ExplorePopularCollectionItem";
import { settings } from "../Home/Utils";

const MostPopularCollection = () => {
  return (
    <section id="marketPlace" className="container-fluid">
      <img src="./assets/images/Background.jpg" id="layer" />
      <h3 className="mb-2 mt-2 text-center">Most popular collection</h3>
      <Slider {...settings}>
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
        <ExplorePopularCollectionItem />
      </Slider>
    </section>
  );
};

export default MostPopularCollection;
