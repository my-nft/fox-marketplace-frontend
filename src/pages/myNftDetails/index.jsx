import { Suspense, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Await, Link, useLoaderData } from "react-router-dom";
import NftMoreInfos from "../../components/nft/details/NftMoreInfos";
import Spinner from "../../components/Spinner";
import { selectIsLoading } from "../../redux/nftReducer";
import {
  ACCEPT_OFFER,
  MAKE_OFFER,
} from "../../saga/blockchain.js/blockChainActions";
import { AUCTION, FIXED_PRICE } from "../../utils/foxConstantes";
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

const MyNftDetails = () => {
  const connectedWallet = useSelector(selectCurrentWallet);
  const isLoading = useSelector(selectIsLoading);
  const [nftDetails, setNftDetails] = useState();
  const [collectionDetails, setCollectionDetails] = useState();
  const [showTransferPopup, setShowTransferPopup] = useState(false);
  const dispatch = useDispatch();
  const [itemExtraData, setItemExtraData] = useState([]);

  const loaderData = useLoaderData();

  useEffect(() => {
    loaderData.dataPromise
      .then((data) => {
        console.log(data);
        setNftDetails(data[0].data);
        setCollectionDetails(data[1].data.collection);
        setItemExtraData(data[2].data);
      })
      .catch((err) => {
        console.log(err);
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

        from: connectedWallet,
        to: nftDetails.ownerAddress,
        price: Number(bestOffer),
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
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
                    <div className="col-md-12  col-lg-5 order-2 order-lg-1 ">
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
                    <div className="col-md-12  col-lg-7 order-1 order-lg-2 ">
                      <header id="infoNFT" className="mb-3">
                        <h3>
                          {`${nftDetails?.name}(${nftDetails?.tokenID})`}{" "}
                        </h3>
                        <h4>
                          Owned by{" "}
                          {sameAddress(
                            connectedWallet,
                            nftDetails.ownerAddress
                          ) ? (
                            "You"
                          ) : (
                            <Address address={nftDetails.ownerAddress}>
                              {optimizeWalletAddress(nftDetails.ownerAddress)}
                            </Address>
                          )}
                        </h4>
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
                            setNftDetails={setNftDetails}
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
                          />
                        ) : null
                      }

                      {nftDetails.isListed &&
                      nftDetails.listingType === AUCTION ? (
                        <ListedAuctionNft
                          nftDetails={nftDetails}
                          setNftDetails={setNftDetails}
                          collectionDetails={collectionDetails}
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
                        />
                      ) : null}

                      <div className="card" id="fees">
                        <div className="card-body">
                          <div className="card-text">
                            <ul>
                              <li>
                                <span>Services fees </span>
                                <strong>1%</strong>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
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
                    <Listings />
                    <Offers />
                    <PriceHistory itemExtra={itemExtraData} />
                    <ItemActivity activity={itemExtraData} />
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
