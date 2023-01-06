import RankItem from "../../../components/RankItem";

const TopCollections = ({collections}) => {

  return (
    <>
      {
        collections && collections.length && (
          collections.map((item,index) => {
            return <RankItem key={index} itemData={item} />
          })
        )
       
      }
    </>
  );
};

export default TopCollections;
