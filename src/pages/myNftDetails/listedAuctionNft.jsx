import { useEffect } from "react";
import { useState } from "react";
import CardBody from "../../components/nft/CardBody";
import CardHeader from "../../components/nft/CardHeader";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { getAuctionInfos, placeBid } from "../../services/listingNft";
import PlaceBid from "../../components/nft/PlaceBid";

const ListedNft = ({ itemDetails, onPlaceBid }) => {
  const [itemInfos, setItemInfos] = useState();
  const [isLoading, setIsLoading] = useState(true);


  const setAuctionItemInfos = async () => {
    const infos = await getAuctionInfos(itemDetails.auctionId - 1);
    setItemInfos(infos);
  }

  const init = async () => {
    setIsLoading(true);
    await setAuctionItemInfos();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);


  return (
    !isLoading && (
      <>
        <CardNftWrapper>
          <CardHeader endDate={Number(itemInfos.endAuction)} />
          <CardBody
            title={"Minimum bid"}
            price={itemInfos?.currentBidPrice / 10 ** 18}
            priceDollar={itemInfos?.currentBidPrice / 10 ** 18}
          >
            <button id="placeBid" class="btn">
              Minimum bid
            </button>
          </CardBody>
        </CardNftWrapper>
        <PlaceBid onPlaceBid={onPlaceBid} />
      </>
    )
  );
};

export default ListedNft;
