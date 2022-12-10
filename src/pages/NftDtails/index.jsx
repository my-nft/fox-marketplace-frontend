import { useEffect } from "react";
import { useState } from "react";
import { getNFTById } from "../../api/nftApi";
import Spinner from "../../components/Spinner";
import InfoNftDetails from "./InfoNftDetails";
import NftImageDetails from "./NftImageDetails";

const NftDetails = () => {

  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState(false);

  useEffect(() => {
    setLoading(true);
    // get item details
    let details = {};
    console.log("details", details);
    if(details) {
      setItemDetails(details);
      
    }
    
  }, [])

  return (
    <div class="container my-5" id="nftPage">
      {
        itemDetails === false
        ? <Spinner />
        : 

        <>
          <img src="./assets/images/Background.jpg" id="layer" />
          <div class="row">
            <NftImageDetails itemData={itemDetails} />
            <InfoNftDetails itemData={itemDetails} />
          </div>
        </>

      }
     
    </div>
  );
};

export default NftDetails;
