import { useEffect } from "react";
import { useState } from "react";
import CardBody from "../../components/nft/CardBody";
import CardHeader from "../../components/nft/CardHeader";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { getAuctionInfos } from "../../services/listingNft";
const ListedNft = ({ itemDetails }) => {

  const [itemInfos, setItemInfos] = useState();

  const init = async () => {
    const infos = await getAuctionInfos(itemDetails.auctionId - 1);
    setItemInfos(infos);
  };

  useEffect(() => {
    init();
  }, []);


  return (
    <CardNftWrapper>
      <CardHeader endDate={itemDetails.endAuction} />
      <CardBody
        title={"Minimum bid"}
        price={itemInfos.currentBidPrice}
        priceDollar={itemInfos.currentBidPrice}
      >
        <button id="placeBid" class="btn">
          Minimum bid
        </button>
      </CardBody>
    </CardNftWrapper>
  );
};

export default ListedNft;
