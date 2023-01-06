import { useEffect } from "react";
import { useState } from "react";
import CardBody from "../../components/nft/CardBody";
import CardHeader from "../../components/nft/CardHeader";
import CardNftWrapper from "../../components/nft/CardNftWrapper";
import { getAuctionInfos } from "../../services/listingNft";
import PlaceBid from "../../components/nft/PlaceBid";
import { sameAddress } from "../../utils/walletUtils";
import { selectCurrentWallet } from "../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  CLAIM_NFT,
  CLAIM_TOKEN,
  PLACE_BID,
  REFUND_NFT,
} from "../../saga/blockchain.js/blockChainActions";

const ListedAuctionNft = ({ itemDetails, collectionDetails }) => {
  const [itemInfos, setItemInfos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nftDetails, setNftDetails] = useState(itemDetails);
  const currentBidOwner = itemInfos?.currentBidOwner;
  const bidCount = itemInfos?.bidCount;
  const currentWallet = useSelector(selectCurrentWallet);
  const dispatch = useDispatch();

  const onRefund = async () => {
    dispatch({
      type: REFUND_NFT,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        auctionId: nftDetails.auctionId,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onPlaceBid = async (price) => {
    dispatch({
      type: PLACE_BID,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        auctionId: nftDetails.auctionId,
        price,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onClaimToken = async () => {
    const { royaltyAddress, royaltyPercent } = collectionDetails;
    dispatch({
      type: CLAIM_TOKEN,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        auctionId: nftDetails.auctionId,
        royaltyAddress: royaltyAddress
          ? royaltyAddress
          : collectionDetails.ownerAddress,
        royaltyPercent: royaltyPercent ? royaltyPercent : 0,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onClaimNft = async () => {
    const { royaltyAddress, royaltyPercent } = collectionDetails;
    dispatch({
      type: CLAIM_NFT,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        auctionId: nftDetails.auctionId,
        royaltyAddress: royaltyAddress
          ? royaltyAddress
          : collectionDetails.ownerAddress,
        royaltyPercent: royaltyPercent ? royaltyPercent : 0,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const isTokenExpired = (endAuction) => {
    if (endAuction && !isNaN(endAuction)) {
      const end = endAuction * 1000;
      const now = new Date().getTime();
      return end - now < 0;
    }
    return true;
  };

  const setAuctionItemInfos = async () => {
    const infos = await getAuctionInfos(itemDetails.auctionId);
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

  const creator = nftDetails?.creator;

  return (
    !isLoading && (
      <>
        <CardNftWrapper>
          <CardHeader endDate={Number(nftDetails?.endAuction)} />
          <CardBody
            title={Number(bidCount) === 0 ? "Minimum bid" : "Current bid"}
            price={nftDetails?.currentBidPrice / 10 ** 18}
            priceDollar={nftDetails?.currentBidPrice / 10 ** 18}
          >
            {sameAddress(currentWallet, creator) &&
              Number(bidCount) === 0 &&
              isTokenExpired(Number(nftDetails?.endAuction)) && (
                <button id="buyItem" className="btn" onClick={onRefund}>
                  Refund
                </button>
              )}

            {sameAddress(currentWallet, currentBidOwner) &&
              isTokenExpired(Number(nftDetails?.endAuction)) &&
              Number(bidCount) > 0 && (
                <button id="buyItem" className="btn" onClick={onClaimNft}>
                  Claim NFT
                </button>
              )}

            {sameAddress(currentWallet, creator) &&
              Number(bidCount) > 0 &&
              isTokenExpired(Number(nftDetails?.endAuction)) &&
              Number(bidCount) > 0 && (
                <button id="buyItem" className="btn" onClick={onClaimToken}>
                  Claim Token
                </button>
              )}
          </CardBody>
        </CardNftWrapper>
        {!isTokenExpired(Number(nftDetails?.endAuction)) &&
          !sameAddress(currentBidOwner, currentWallet) &&
          !sameAddress(creator, currentWallet) && (
            <PlaceBid onPlaceBid={onPlaceBid} />
          )}
      </>
    )
  );
};

export default ListedAuctionNft;
