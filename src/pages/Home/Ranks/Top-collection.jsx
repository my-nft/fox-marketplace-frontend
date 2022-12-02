import { useEffect, useState } from "react";
import { getCollections } from "../../../api/collectionApi";
import RankItem from "../../../components/RankItem";

const TopCollections = (props) => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setItems(getCollections(null,'TOP'))
    setLoading(false)
  }, [])

  return (
    <>
      {
        loading && items.length === 0
        ?
        <div>Loading...</div>
        : 
        items.map((item,index) => {
          return <RankItem key={index} itemData={item} />
        })
      }
    </>
  );
};

export default TopCollections;
