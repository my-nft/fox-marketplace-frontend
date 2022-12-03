import { useEffect } from "react";
import { useState } from "react";
import { getNFTById } from "../../api/nftApi";
import InfoNftDetails from "./InfoNftDetails";
import NftImageDetails from "./NftImageDetails";

const NftDetails = () => {

  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState(false);

  useEffect(() => {
    setLoading(true);
    // get item details
    let details = getNFTById();
    console.log("details", details);
    if(details) {
      setItemDetails(details);
      setLoading(false);
    }
    
  }, [])

  return (
    <div class="container my-5" id="nftPage">
      {
        itemDetails === false
        ? <p>Loading...</p>
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
