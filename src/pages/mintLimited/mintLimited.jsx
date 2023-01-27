import { useEffect } from "react";
import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { getCollectionByAddress } from "../../api/collectionApi";
import MintInfo from "../../components/mintLimited/mintInfo/mintInfo";
import MintSideBar from "../../components/mintLimited/mintSideBar/mintSideBar";
import Spinner from "../../components/Spinner";
import { getMintingData } from "../../services/listingNft";
import Page404 from "../404/404";

const MintLimited = () => {
  const [maxForMint, setMaxForMint] = useState(2500);
  const [minted, setMinted] = useState(0);
  const [mintingData, setMintingData] = useState();

  const loaderData = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(null);

  const init = async () => {
    const data = await getMintingData();
    setMintingData(data);
  }

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
    init();
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
            mintingData={mintingData}
          />
          <MintInfo collection={collection} mintingData={mintingData}/>
        </>
      )}
    </div>
  );
};

export default MintLimited;
