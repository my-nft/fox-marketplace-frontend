import { Suspense, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Await, Link, useLoaderData, useParams } from "react-router-dom";
import NftMoreInfos from "../../components/nft/details/NftMoreInfos";
import Spinner from "../../components/Spinner";
import { selectIsLoading, setIsLoading } from "../../redux/nftReducer";
import {
  ACCEPT_OFFER,
  MAKE_OFFER,
  WITHDRAW_OFFER,
} from "../../saga/blockchain.js/blockChainActions";
import {
  AUCTION,
  EVENT_ACCEPT_OFFER,
  EVENT_BUY_LISTING,
  EVENT_CREATE_AUCTION,
  EVENT_ENUM,
  EVENT_LISTING,
  EVENT_MAKE_OFFER,
  EVENT_PLACE_BID,
  EVENT_WIN_AUCTION,
  FIXED_PRICE,
} from "../../utils/foxConstantes";
import { optimizeWalletAddress, sameAddress } from "../../utils/walletUtils";
import ListedAuctionNft from "./listedAuctionNft";
import ListedFixedNft from "./listedFixedNft";
import NonListedMyNft from "./nonListedMyNft";
import NonListedNft from "./nonListedNft";
import { selectCurrentWallet } from "../../redux/userReducer";
import Address from "../../components/Address";
import Page404 from "../404/404";
import { OwnershipTransferPopup } from "../../components/popups/popups";
import Listings from "../../components/nft/listings";
import Offers from "../../components/nft/offers";
import PriceHistory from "../../components/nft/priceHistory";
import ItemActivity from "../../components/nft/activity";
import { getItemInfo } from "../../api/utilsApi";
import { ReactComponent as ItemsIcon } from "../../assets/icons/items.svg";
import { ReactComponent as OwnersIcon } from "../../assets/icons/owners.svg";

const MyNftDetails = () => {
  const connectedWallet = useSelector(selectCurrentWallet);
  const isLoading = useSelector(selectIsLoading);
  const [nftDetails, setNftDetails] = useState();
  const [collectionDetails, setCollectionDetails] = useState();
  const [showTransferPopup, setShowTransferPopup] = useState(false);
  const dispatch = useDispatch();

  //activitiesList priceHistoList offersList listingList

  const [activitiesList, setActivitiesList] = useState([]);
  const [priceHistoList, setPriceHistoList] = useState([]);
  const [offersList, setOffersList] = useState([]);
  const [listingList, setListingList] = useState([]);
  const [isLoadingExtraData, setIsLoadingExtraData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const loaderData = useLoaderData();
  const params = useParams();

  const getExtraInfo = async () => {
    try {
      setIsLoadingExtraData(true);

      const responseAll = await getItemInfo(
        params.tokenID,
        params.collectionAddress
      );
      setActivitiesList(responseAll.data);

      const responsePriceHist = await getItemInfo(
        params.tokenID,
        params.collectionAddress,
        [EVENT_BUY_LISTING, EVENT_WIN_AUCTION, EVENT_ACCEPT_OFFER]
      );
      setPriceHistoList(responsePriceHist.data);

      const responseOfferList = await getItemInfo(
        params.tokenID,
        params.collectionAddress,
        [EVENT_MAKE_OFFER, EVENT_PLACE_BID]
      );
      setOffersList(responseOfferList?.data);

      const responseListingList = await getItemInfo(
        params.tokenID,
        params.collectionAddress,
        [EVENT_CREATE_AUCTION, EVENT_LISTING]
      );
      setListingList(responseListingList.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingExtraData(false);
    }
  };

  useEffect(() => {
    getExtraInfo();
  }, []);

  useEffect(() => {
    loaderData.dataPromise
      .then((data) => {
        setNftDetails(data[0].data.nft);
        setCollectionDetails(data[0].data.collection);
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoading(false));
      });
  }, []);

  const onMakeOffer = (offerPrice) => {
    dispatch({
      type: MAKE_OFFER,
      payload: {
        price: Number(offerPrice),
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        from: connectedWallet,
        to: nftDetails.ownerAddress,
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onAcceptOffer = (bestOffer) => {
    const { royaltyAddress, royaltyPercent } = collectionDetails;
    dispatch({
      type: ACCEPT_OFFER,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        royaltyAddress: royaltyAddress
          ? royaltyAddress
          : collectionDetails.ownerAddress,
        royaltyPercent: royaltyPercent ? royaltyPercent : 0,

        from: nftDetails.ownerAddress,
        to: bestOffer.offerOwner,
        price: Number(bestOffer.price),
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const onWithdrawOffer = (bestOffer) => {
    dispatch({
      type: WITHDRAW_OFFER,
      payload: {
        tokenID: nftDetails.tokenID,
        collectionAddress: nftDetails.collectionAddress,
        from: bestOffer.offerOwner,
        to: nftDetails.ownerAddress,
        price: Number(bestOffer.price),
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  const handleQuantityChange = (value) => {
    if (value < 0 && quantity > 1) {
      setQuantity(quantity + value);
      return;
    }
    if (value > 0 && quantity < 25) {
      setQuantity(quantity + value);
    }
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={loaderData.dataPromise} errorElement={<Page404 />}>
        {() => {
          return (
            <>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="container my-5" id="nftPage">
                  <img src="/assets/images/Background.jpg" id="layer" />
                  <h3 className="my-5 text-center ">
                    <Link
                      to={`/collection/${collectionDetails?.collectionAddress}`}
                      className="motherCollection"
                    >
                      {collectionDetails?.name}
                    </Link>
                  </h3>
                  <div className="row">
                    <div className="col-md-12  col-lg-5 order-1 order-lg-1 ">
                      <div id="imgNft" className="imgForSale">
                        <img
                          src={nftDetails?.image}
                          id="NFT"
                          className="imgForSale"
                        />
                      </div>
                      <NftMoreInfos
                        nftDetails={nftDetails}
                        collectionDetails={collectionDetails}
                      />
                    </div>
                    <div className="mt-5 mt-lg-0 col-md-12  col-lg-7 order-2 order-lg-2 ">
                      <header id="infoNFT" className="mb-3">
                        <div>
                          <h3>
                            {`${nftDetails?.name}(${nftDetails?.tokenID})`}{" "}
                          </h3>
                          <h4>
                            {!collectionDetails.isErc1155 && (
                              <>
                                Owned by{" "}
                                {sameAddress(
                                  connectedWallet,
                                  nftDetails.ownerAddress
                                ) ? (
                                  "You"
                                ) : (
                                  <Address address={nftDetails.ownerAddress}>
                                    {optimizeWalletAddress(
                                      nftDetails.ownerAddress
                                    )}
                                  </Address>
                                )}
                              </>
                            )}
                          </h4>
                        </div>

                        {collectionDetails?.isErc1155 && (
                          <div class="itemCounts">
                            <div className="owners countHighlight">
                              <OwnersIcon />
                              <p>1 Owner</p>
                            </div>
                            <div className="ietms countHighlight">
                              <ItemsIcon />
                              <p>{nftDetails.recurences} Items</p>
                            </div>
                          </div>
                        )}
                      </header>

                      {
                        /*
                          CASE OF MY NFT
                        */
                        !nftDetails.isListed &&
                        sameAddress(
                          connectedWallet,
                          nftDetails.ownerAddress
                        ) ? (
                          <NonListedMyNft
                            nftDetails={nftDetails}
                            handleAcceptOffer={onAcceptOffer}
                            onWithdrawOffer={onWithdrawOffer}
                            setNftDetails={setNftDetails}
                            quantity={quantity}
                            handleQuantityChange={handleQuantityChange}
                            collectionDetails={collectionDetails}
                          />
                        ) : null
                      }

                      {
                        /*
                      CASE OF NOT MY NFT
                      */

                        !nftDetails.isListed &&
                        !sameAddress(
                          connectedWallet,
                          nftDetails.ownerAddress
                        ) ? (
                          <NonListedNft
                            nftDetails={nftDetails}
                            handleMakeOffer={onMakeOffer}
                            onWithdrawOffer={onWithdrawOffer}
                            quantity={quantity}
                            handleQuantityChange={handleQuantityChange}
                            collectionDetails={collectionDetails}
                          />
                        ) : null
                      }

                      {nftDetails.isListed &&
                      nftDetails.listingType === AUCTION ? (
                        <ListedAuctionNft
                          nftDetails={nftDetails}
                          setNftDetails={setNftDetails}
                          collectionDetails={collectionDetails}
                          quantity={quantity}
                          handleQuantityChange={handleQuantityChange}
                        />
                      ) : null}

                      {nftDetails.isListed &&
                      nftDetails.listingType === FIXED_PRICE ? (
                        <ListedFixedNft
                          nftDetails={nftDetails}
                          setNftDetails={setNftDetails}
                          collectionDetails={collectionDetails}
                          onMakeOffer={onMakeOffer}
                          onAcceptOffer={onAcceptOffer}
                          onWithdrawOffer={onWithdrawOffer}
                          quantity={quantity}
                          handleQuantityChange={handleQuantityChange}
                        />
                      ) : null}
                    </div>
                  </div>
                  <OwnershipTransferPopup
                    popupType={showTransferPopup}
                    popupCloseAction={() => setShowTransferPopup(false)}
                    submitAction={(e) => {
                      e.preventDefault();
                      setShowTransferPopup(false);
                    }}
                  />
                  <div className="mt-5">
                    {/**
                     * BUY WIN_ACUTION ACCET OFFER
                     *
                     */}
                    <Listings
                      itemExtra={listingList}
                      isLoading={isLoadingExtraData}
                    />
                    {/**
                     * SEND OFFER, ACCEPT OFFER
                     *
                     */}
                    <Offers
                      itemExtra={offersList}
                      isLoading={isLoadingExtraData}
                    />
                    {/**
                     * BUY WIN_ACUTION ACCET OFFER
                     */}
                    <PriceHistory
                      itemExtra={priceHistoList}
                      isLoading={isLoadingExtraData}
                    />
                    {/**
                     * ALL
                     */}
                    <ItemActivity
                      activity={activitiesList}
                      isLoading={isLoadingExtraData}
                    />
                  </div>
                </div>
              )}
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default MyNftDetails;
