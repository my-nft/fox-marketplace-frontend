import { useEffect } from "react";
import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { getCollectionByAddress } from "../../api/collectionApi";
import MintInfo from "../../components/mintLimited/mintInfo/mintInfo";
import MintSideBar from "../../components/mintLimited/mintSideBar/mintSideBar";
import Spinner from "../../components/Spinner";
import { getMintingData, mintNfts } from "../../services/listingNft";

const MintLimited = () => {
  const [minted, setMinted] = useState(0);
  const [mintingData, setMintingData] = useState();

  const [loading, setLoading] = useState(false);

  const init = async () => {
    const data = await getMintingData();
    setMintingData(data);
};

  const handleMinting = async (count) => {
    try {
      setLoading(true);
      await mintNfts(count);
      // relead stats
      init();
      setLoading(false);
      toast.success("Minting success");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try{
      init();
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
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
            minted={minted}
            mintAction={mintAction}
            mintingData={mintingData}
            handleMinting={handleMinting}
          />
          <MintInfo mintingData={mintingData} />
        </>
      )}
    </div>
  );
};

export default MintLimited;
