import RankItem from "../../../components/RankItem"

const TrendingCollection = ({collections}) => {

  return (
    <>
    {
      collections && collections.length && (
        collections.map((item,index) => {
          return <RankItem key={index} position={index+1} itemData={item} />
        })
      ) 
    }
      
    </>
  );
};

export default TrendingCollection;
