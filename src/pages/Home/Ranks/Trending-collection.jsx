import { useEffect, useState } from "react";
import { getCollections } from "../../../api/collectionApi";
import RankItem from "../../../components/RankItem"

const TrendingCollection = (props) => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setItems(getCollections(null,'TRENDING'))
    setLoading(false)
  }, [])

  console.log(items)

  return (
    <>
    {
      loading && items.length === 0
      ?
      <div>Loading...</div>
      : 
      items.map((item,index) => {
        return <RankItem key={index} position={index+1} itemData={item} />
      })
    }
      
    </>
  );
};

export default TrendingCollection;
