import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cps } from "redux-saga/effects";
import Spinner from "../../components/Spinner";
import { selectNftDetails, selectIsLoading } from "../../redux/nftReducer";
import { LOAD_NFT_DETAIL, REMOVE_LISTING_FROM_NFT } from "../../saga/actions";
import { ACCEPT_OFFER, BUY_NFT, DELIST_ITEM, MAKE_OFFER } from "../../saga/blockchain.js/blockChainActions";
import {
  createAuction,
  nftLoader,
  placeBid,
  createListing,
  deListItem,
} from "../../services/listingNft";
import { AUCTION, FIXED_PRICE } from "../../utils/foxConstantes";
import ListedAuctionNft from "./listedAuctionNft";
import ListedFixedNft from "./listedFixedNft";
import NonListedNft from "./nonListedNft";

const MyNftDetails = () => {
  const nftDetailsSelector = useSelector(selectNftDetails);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [nftDetails, setNftDetails] = useState();
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoadingPage(isLoading);
  }, [isLoading]);

  useEffect(() => {

    setNftDetails(nftDetailsSelector);

  }, [nftDetailsSelector])

  // see my own NFTs
  useEffect(() => {
    if (nftDetails) {
      nftLoader(nftDetails.collectionAddress);
    }
  }, [nftDetails]);

  const handleAuction = async (values) => {
    setIsLoadingPage(true);
    const auctionPrice = Number(values.auctionPrice);
    const endAuction = Number(values.time);
    const trx = await createAuction(
      nftDetails.collectionAddress,
      nftDetails.tokenID,
      auctionPrice,
      endAuction,
      AUCTION
    );
    console.log("Auction transaction", trx);
    reloadNft();
    setIsLoadingPage(false);
  };

  const handleFixedPrice = async (values) => {
    console.log("Fixed value", values);
    setIsLoadingPage(true);
    const fixedPrice = Number(values.fixedPrice);
    await createListing(
      nftDetails.collectionAddress,
      nftDetails.tokenID,
      fixedPrice
    );
    reloadNft();
    setIsLoadingPage(false);
  };

  const reloadNft = () => {
    dispatch({
      type: LOAD_NFT_DETAIL,
      payload: {
        collectionAddress: nftDetails.collectionAddress,
        tokenID: nftDetails.tokenID,
      },
    });
  };

  const onBuyItem = async (price) => {
    dispatch({
      type: BUY_NFT,
      payload: {
        listingId: nftDetails.listingId,
        price,
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
      },
    });
  };

  const onMakeOffer = (offerPrice) => {
    console.log("HERRE");
    dispatch({
      type : MAKE_OFFER,
      payload: {
        listingId: nftDetails.listingId,
        price : offerPrice,
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
      },
    });
  };

  const onDelistItem = async () => {
    console.log("####onDelestItem###");
    dispatch({
      type : DELIST_ITEM,
      payload : {
        listingId: nftDetails.listingId,
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
      }
    })
  };

  const onAcceptOffer = () => {
    console.log("####onDelestItem###");
    dispatch({
      type : ACCEPT_OFFER,
      payload : {
        listingId: nftDetails.listingId,
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
      }
    })
  }

  const onPlaceBid = async (price) => {
    console.log("####onPlaceBid###");
    setIsLoadingPage(true);
    await placeBid(nftDetails.auctionId - 1, price);
    setIsLoadingPage(false);
  };

  const removeListingFromToken = () => {
    dispatch({
      type: REMOVE_LISTING_FROM_NFT,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
      },
    });
  };

  console.log(nftDetails);

  return isLoadingPage ? (
    <Spinner />
  ) : (
    <div className="container my-5" id="nftPage">
      <img src="./assets/images/Background.jpg" id="layer" />
      <h3 className="my-5 text-center">List Item for Sale</h3>
      <div className="row">
        <div className="col-md-12  col-lg-5 order-2 order-lg-1 ">
          <div id="imgNft" className="imgForSale">
            <img src={nftDetails?.image} id="NFT" className="imgForSale" />
          </div>
        </div>
        <div className="col-md-12  col-lg-7 order-1 order-lg-2 ">
          <header id="infoNFT" className="mb-3">
            <h4>{nftDetails?.name}</h4>
            <h2>RoboPunks number8 #1691</h2>
          </header>

          {!nftDetails?.isListed ? (
            <NonListedNft
              nftDetails={nftDetails}
              handleAuction={handleAuction}
              handleFixedPrice={handleFixedPrice}
            />
          ) : null}

          {nftDetails?.isListed && nftDetails.listingType === AUCTION ? (
            <ListedAuctionNft
              itemDetails={nftDetails}
              onPlaceBid={onPlaceBid}
              removeListingFromToken={removeListingFromToken}
            />
          ) : null}

          {nftDetails?.isListed && nftDetails.listingType === FIXED_PRICE ? (
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
