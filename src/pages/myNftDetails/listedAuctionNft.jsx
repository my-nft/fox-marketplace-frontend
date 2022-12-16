import { useEffect } from "react";
import { useState } from "react";
import CardBody from "../../components/nft/CardBody";
import CardHeader from "../../components/nft/CardHeader";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import {
  getAuctionInfos,
} from "../../services/listingNft";
import PlaceBid from "../../components/nft/PlaceBid";
import { getCurrentWalletConnected } from "../../utils/blockchainInteractor";
import { sameAddress } from "../../utils/walletUtils";


const ListedAuctionNft = ({ itemDetails, onPlaceBid, onRefund, onClaimNft, onClaimToken }) => {
  const [itemInfos, setItemInfos] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const isTokenExpired = (endAuction) => {
    if(endAuction) {
      const date = new Date(0);
      date.setUTCSeconds(endAuction);
      return new Date() - date > 0;
    }
    return false;
  };
  

  const setAuctionItemInfos = async () => {
    const infos = await getAuctionInfos(itemDetails.auctionId - 1);
    setItemInfos(infos);
  };

  const init = async () => {
    setIsLoading(true);
    await setAuctionItemInfos();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
    
  }, []);

  const currentBidOwner = itemInfos?.currentBidOwner;
  const bidCount = itemInfos?.bidCount;
  const currentWallet = getCurrentWalletConnected();
  const creator = itemInfos?.creator;

  return (
    !isLoading && (
      <>
        <CardNftWrapper>
          <CardHeader endDate={Number(itemInfos?.endAuction)} />
          <CardBody
            title={Number(bidCount) === 0 ? "Minimum bid" : "Current bid"}
            price={itemInfos?.currentBidPrice / 10 ** 18}
            priceDollar={itemInfos?.currentBidPrice / 10 ** 18}
          >
            {sameAddress(currentWallet, creator) && Number(bidCount) === 0 &&  isTokenExpired(
                Number(itemInfos?.endAuction))
               && (
              <button id="buyItem" className="btn" onClick={onRefund}>
                Refund
              </button>
            )}

            {sameAddress(currentWallet, currentBidOwner) &&
              isTokenExpired(
                Number(itemInfos?.endAuction)) && Number(bidCount) > 0
               && (
                <button id="buyItem" className="btn" onClick={onClaimNft}>
                  Claim NFT
                </button>
              )}

            {sameAddress(currentWallet, creator) &&
              Number(bidCount) > 0 &&
              isTokenExpired(
                Number(itemInfos?.endAuction)) && Number(bidCount) > 0 &&
              (
                <button id="buyItem" className="btn" onClick={onClaimToken}>
                  Claim Token
                </button>
              )}
          </CardBody>
        </CardNftWrapper>
        {!isTokenExpired(
                Number(itemInfos?.endAuction)) && !sameAddress(currentBidOwner, currentWallet) && !sameAddress(creator ,currentWallet) && (
          <PlaceBid onPlaceBid={onPlaceBid} />
        )}
      </>
    )
  );
};

export default ListedAuctionNft;
