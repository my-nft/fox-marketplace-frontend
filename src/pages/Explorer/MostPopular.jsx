import MostPopularItem from "../../components/marketplace/MostPopularItem";
const MostPopular = ({nfts}) => {
  return (
    <div className="wrapperMostPopular row">
      {
        nfts && nfts.map((item, index) => <MostPopularItem key={index} item={item} viewType={"CHANGE_FOR_MIN"}/>)
      }
      
    </div>
  );
};

export default MostPopular;
