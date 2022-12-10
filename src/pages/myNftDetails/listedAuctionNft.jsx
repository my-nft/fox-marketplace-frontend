import { useEffect } from "react";
import { useState } from "react";
import CardBody from "../../components/nft/CardBody";
import CardHeader from "../../components/nft/CardHeader";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import {
  claimNFT,
  claimToken,
  getAuctionInfos,
  refundNft,
} from "../../services/listingNft";
import PlaceBid from "../../components/nft/PlaceBid";
import { getCurrentWalletConnected } from "../../utils/blockchainInteractor";
import { sameAddress } from "../../utils/walletUtils";


const ListedNft = ({ itemDetails, onPlaceBid, removeListingFromToken }) => {
  const [itemInfos, setItemInfos] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const isTokenExpired = (endAuction) => {
    const date = new Date(0);
    date.setUTCSeconds(endAuction);
  
    return new Date() - date > 0;
  };
  

  const setAuctionItemInfos = async () => {
    const infos = await getAuctionInfos(itemDetails.auctionId - 1);
    setItemInfos(infos);
  };

  const handleRefund = async () => {
    await refundNft(itemDetails.auctionId - 1);
    removeListingFromToken();
  };

  const handleClaimNFT = async () => {
    await claimNFT(itemDetails.auctionId - 1);
    removeListingFromToken();
  };

  const handleClaimToken = async () => {
    await claimToken(itemDetails.auctionId - 1);
    removeListingFromToken();
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

  console.table(currentBidOwner, bidCount, currentWallet, creator);

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
                Number(itemInfos.endAuction)) && Number(bidCount) > 0
               && (
              <button id="buyItem" class="btn" onClick={handleRefund}>
                Refund
              </button>
            )}

            {sameAddress(currentWallet, currentBidOwner) &&
              isTokenExpired(
                Number(itemInfos.endAuction) && Number(bidCount) > 0
              ) && (
                <button id="buyItem" class="btn" onClick={handleClaimNFT}>
                  Claim NFT
                </button>
              )}

            {sameAddress(currentWallet, creator) &&
              Number(bidCount) > 0 &&
              isTokenExpired(
                Number(itemInfos.endAuction)) && Number(bidCount) > 0 &&
              (
                <button id="buyItem" class="btn" onClick={handleClaimToken}>
                  Claim Token
                </button>
              )}
          </CardBody>
        </CardNftWrapper>
        {currentBidOwner === currentWallet && (
          <PlaceBid onPlaceBid={onPlaceBid} />
        )}
      </>
    )
  );
};

export default ListedNft;
