import { useEffect } from "react";
import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { getCollectionByAddress } from "../../api/collectionApi";
import MintInfo from "../../components/mintLimited/mintInfo/mintInfo";
import MintSideBar from "../../components/mintLimited/mintSideBar/mintSideBar";
import Spinner from "../../components/Spinner";
import Page404 from "../404/404";

const MintLimited = () => {
  const [maxForMint, setMaxForMint] = useState(2500);
  const [minted, setMinted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    getCollectionByAddress("0x9E4df6f08ceEcfEF170FCbF036B97789d5320ec3")
      .then((res) => {
        setMaxForMint(res.data.collection.totalSupply);
        setCollection(res.data.collection);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const mintAction = (amount) => {
    setMinted(minted + amount);
  };

  return (
    <div className="mintLimitedWrapper">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <MintSideBar
            maxForMint={maxForMint}
            minted={minted}
            collection={collection}
            mintAction={mintAction}
          />
          <MintInfo collection={collection} />
        </>
      )}
    </div>
  );
};

export default MintLimited;
