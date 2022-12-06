import { useEffect } from "react";
import { useState } from "react";
import CardBody from "../../components/nft/CardBody";
import CardHeader from "../../components/nft/CardHeader";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { getAuctionInfos } from "../../services/listingNft";
const ListedNft = ({ itemDetails }) => {
  const [itemInfos, setItemInfos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  

  const init = async () => {
    setIsLoading(true);
    const infos = await getAuctionInfos(itemDetails.auctionId - 1);
    setItemInfos(infos);
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    !isLoading && <CardNftWrapper>
      <CardHeader endDate={Number(itemInfos.endAuction)} />
      <CardBody
        title={"Minimum bid"}
        price={itemInfos?.currentBidPrice / 10**18}
        priceDollar={itemInfos?.currentBidPrice / 10**18}
      >
        <button id="placeBid" class="btn">
          Minimum bid
        </button>
      </CardBody>
    </CardNftWrapper>
  );
};

export default ListedNft;
