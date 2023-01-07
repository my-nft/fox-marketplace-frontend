import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getNftCall } from "../../api/nftApi";
import { getCollectionByAddress } from "../../api/collectionApi";
import NftMoreInfos from "../../components/nft/details/NftMoreInfos";
import Spinner from "../../components/Spinner";
import { selectIsLoading, setIsLoading } from "../../redux/nftReducer";
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

const MyNftDetails = () => {
  const { collectionAddress, tokenID } = useParams();

  const connectedWallet = useSelector(selectCurrentWallet);
  const isLoading = useSelector(selectIsLoading);
  const [nftDetails, setNftDetails] = useState();
  const [collectionDetails, setCollectionDetails] = useState();
  const dispatch = useDispatch();

  const loadNft = async () => {
    try {
      dispatch(setIsLoading(true));
      console.log("HERRE");
      const nft = await getNftCall(collectionAddress, tokenID);
      const collection = await getCollectionByAddress(collectionAddress);
      setNftDetails(nft.data);
      setCollectionDetails(collection.data.collection);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    loadNft();
  }, []);

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

  const onAcceptOffer = () => {
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
      },
      onSuccess: (nft) => setNftDetails(nft),
    });
  };

  return isLoading || !nftDetails ? (
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
            <img src={nftDetails?.image} id="NFT" className="imgForSale" />
          </div>
          <NftMoreInfos
            nftDetails={nftDetails}
            collectionDetails={collectionDetails}
          />
        </div>
        <div className="col-md-12  col-lg-7 order-1 order-lg-2 ">
          <header id="infoNFT" className="mb-3">
            <h3>{`${nftDetails?.name}(${nftDetails?.tokenID})`} </h3>
            <h4>
              Owned by{" "}
              {sameAddress(connectedWallet, nftDetails.ownerAddress) ? (
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
            sameAddress(connectedWallet, nftDetails.ownerAddress) ? (
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
            !sameAddress(connectedWallet, nftDetails.ownerAddress) ? (
              <NonListedNft
                nftDetails={nftDetails}
                handleMakeOffer={onMakeOffer}
              />
            ) : null
          }

          {nftDetails.isListed && nftDetails.listingType === AUCTION ? (
            <ListedAuctionNft
              nftDetails={nftDetails}
              setNftDetails={setNftDetails}
              collectionDetails={collectionDetails}
            />
          ) : null}

          {nftDetails.isListed && nftDetails.listingType === FIXED_PRICE ? (
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
    </div>
  );
};

export default MyNftDetails;
