import { useEffect } from "react";
import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
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

  const init = async () => {
    const data = await getMintingData();
    setMintingData(data);
  }

  useEffect(() => {
    if (loaderData.dataPromise) {
      loaderData.dataPromise.then((data) => {
        const { collection } = data[0].data;
        setMaxForMint(collection.totalSupply);
      });
    }

    init();
    
  }, []);

  const mintAction = (amount) => {
    setMinted(minted + amount);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={loaderData.dataPromise} errorElement={<Page404 />}>
        {(data) => {
          const { collection } = data[0].data;
          return (
            <div className="mintLimitedWrapper">
              <MintSideBar
                maxForMint={maxForMint}
                minted={minted}
                collection={collection}
                mintAction={mintAction}
                mintingData={mintingData}
              />
              <MintInfo collection={collection} mintingData={mintingData} />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default MintLimited;
