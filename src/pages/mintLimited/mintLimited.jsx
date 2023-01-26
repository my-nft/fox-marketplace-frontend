import { useEffect } from "react";
import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import MintInfo from "../../components/mintLimited/mintInfo/mintInfo";
import MintSideBar from "../../components/mintLimited/mintSideBar/mintSideBar";
import Spinner from "../../components/Spinner";
import Page404 from "../404/404";

const MintLimited = () => {
  const [maxForMint, setMaxForMint] = useState(2500);
  const [minted, setMinted] = useState(0);

  const loaderData = useLoaderData();

  useEffect(() => {
    if (loaderData.dataPromise) {
      loaderData.dataPromise.then((data) => {
        const { collection } = data[0].data;
        setMaxForMint(collection.totalSupply);
      });
    }
  }, []);

  const mintAction = (amount) => {
    setMinted(minted + amount);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={loaderData.dataPromise} errorElement={<Page404 />}>
        {(data) => {
          const { collection } = data[0].data;
          console.log(collection);
          return (
            <div className="mintLimitedWrapper">
              <MintSideBar
                maxForMint={maxForMint}
                minted={minted}
                collection={collection}
                mintAction={mintAction}
              />
              <MintInfo collection={collection} />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default MintLimited;
