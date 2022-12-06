import MostPopularItem from "../../components/marketplace/MostPopularItem";

const MostPopular = ({nfts}) => {
  return (
    <div class="wrapperMostPopular row">
      {
        nfts && nfts.map(item => <MostPopularItem item={item} viewType={"CHANGE_FOR_MIN"}/>)
      }
    </div>
  );
};

export default MostPopular;
