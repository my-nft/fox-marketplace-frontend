import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNftCall } from "../../api/nftApi";
import NftMoreInfos from "../../components/nft/details/NftMoreInfos";
import Spinner from "../../components/Spinner";
import { selectNftDetails, selectIsLoading } from "../../redux/nftReducer";
import {
  ACCEPT_OFFER,
  BUY_NFT,
  CLAIM_NFT,
  CLAIM_TOKEN,
  DELIST_ITEM,
  LISTING_AUCTION,
  LISTING_FIXED_PRICE,
  MAKE_OFFER,
  PLACE_BID,
  REFUND_NFT,
} from "../../saga/blockchain.js/blockChainActions";
import { getCurrentWalletConnected } from "../../utils/blockchainInteractor";
import { AUCTION, FIXED_PRICE } from "../../utils/foxConstantes";
import { sameAddress } from "../../utils/walletUtils";
import ListedAuctionNft from "./listedAuctionNft";
import ListedFixedNft from "./listedFixedNft";
import NonListedMyNft from "./nonListedMyNft";
import NonListedNft from "./nonListedNft";

const MyNftDetails = () => {
  const { collectionAddress, tokenID } = useParams();
  const connectedWallet = getCurrentWalletConnected();
  const isLoading = useSelector(selectIsLoading);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [nftDetails, setNftDetails] = useState();
  const dispatch = useDispatch();

  const loadNft = async () => {
    setIsLoadingPage(true);
    const nft = await getNftCall(collectionAddress, tokenID);
    setNftDetails(nft.data);
    setIsLoadingPage(false);
  };

  useEffect(() => {
    loadNft();
  }, []);

  const handleAuction = async (values) => {
    const auctionPrice = Number(values.auctionPrice);
    const endAuction = Number(values.time);
    dispatch({
      type: LISTING_AUCTION,
      payload: {
        collectionAddress: nftDetails.collectionAddress,
        tokenID: nftDetails.tokenID,
        auctionPrice: auctionPrice,
        endAuction: endAuction,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const handleRefund = async () => {
    dispatch({
      type: REFUND_NFT,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        auctionId: nftDetails.auctionId - 1,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const handleClaimNFT = async () => {
    dispatch({
      type: CLAIM_NFT,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        auctionId: nftDetails.auctionId - 1,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const handleClaimToken = async () => {
    dispatch({
      type: CLAIM_TOKEN,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        auctionId: nftDetails.auctionId - 1,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const handleFixedPrice = async (values) => {
    const fixedPrice = Number(values.fixedPrice);
    dispatch({
      type: LISTING_FIXED_PRICE,
      payload: {
        collectionAddress: nftDetails.collectionAddress,
        tokenID: nftDetails.tokenID,
        fixedPrice: fixedPrice,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onBuyItem = async (price) => {
    dispatch({
      type: BUY_NFT,
      payload: {
        listingId: nftDetails.listingId,
        price: Number(price),
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onMakeOffer = (offerPrice) => {
    dispatch({
      type: MAKE_OFFER,
      payload: {
        price: Number(offerPrice),
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onDelistItem = async () => {
    dispatch({
      type: DELIST_ITEM,
      payload: {
        listingId: nftDetails.listingId,
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onAcceptOffer = () => {
    dispatch({
      type: ACCEPT_OFFER,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
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
        auctionId: nftDetails.auctionId - 1,
        price,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  return isLoadingPage || isLoading ? (
    <Spinner />
  ) : (
    <div className="container my-5" id="nftPage">
      <img src="/assets/images/Background.jpg" id="layer" />
      <h3 className="my-5 text-center">List Item for Sale</h3>
      <div className="row">
        <div className="col-md-12  col-lg-5 order-2 order-lg-1 ">
          <div id="imgNft" className="imgForSale">
            <img src={nftDetails?.image} id="NFT" className="imgForSale" />
          </div>
          <NftMoreInfos nftDetails={nftDetails} />
        </div>
        <div className="col-md-12  col-lg-7 order-1 order-lg-2 ">
          <header id="infoNFT" className="mb-3">
            <h4>{nftDetails?.name}</h4>
            <h2>RoboPunks number8 #1691</h2>
          </header>

          {
            /*
              CASE OF MY NFT
            */
            !nftDetails.isListed &&
            sameAddress(connectedWallet, nftDetails.ownerAddress) ? (
              <NonListedMyNft
                nftDetails={nftDetails}
                handleAuction={handleAuction}
                handleFixedPrice={handleFixedPrice}
              />
            ) : null
          }

          {
            /*
              CASE OF NOT MY NFT
              */

            !nftDetails.isListed &&
            !sameAddress(connectedWallet, nftDetails.ownerAddress) ? (
              <NonListedNft
                itemDetails={nftDetails}
                handleMakeOffer={onMakeOffer}
              />
            ) : null
          }

          {nftDetails.isListed && nftDetails.listingType === AUCTION ? (
            <ListedAuctionNft
              itemDetails={nftDetails}
              onPlaceBid={onPlaceBid}
              onRefund={handleRefund}
              onClaimNft={handleClaimNFT}
              onClaimToken={handleClaimToken}
            />
          ) : null}

          {nftDetails.isListed && nftDetails.listingType === FIXED_PRICE ? (
            <ListedFixedNft
              itemDetails={nftDetails}
              onBuyItem={onBuyItem}
              onMakeOffer={onMakeOffer}
              onDelist={onDelistItem}
              onAcceptOffer={onAcceptOffer}
            />
          ) : null}

          <div className="card" id="fees">
            <div className="card-body">
              <div className="card-text">
                <ul>
                  <li>
                    <span>Services fees </span>
                    <strong>10 fxg</strong>
                  </li>
                  <li>
                    <span>Creator fees</span> <strong>10 fxg</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNftDetails;
