import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { selectNftDetails, selectIsLoading } from "../../redux/nftReducer";
import { LOAD_NFT_DETAIL } from "../../saga/actions";
import { createAuction, nftLoader, placeBid, createListing } from "../../services/listingNft";
import { AUCTION } from "../../utils/foxConstantes";
import ListedAuctionNft from "./listedAuctionNft";
import NonListedNft from "./nonListedNft";

const MyNftDetails = () => {
  const nftDetails = useSelector(selectNftDetails);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoadingPage(isLoading);
  }, [isLoading]);

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
    console.log("Fixed value", values)
    setIsLoadingPage(true);
    const fixedPrice = Number(values.fixedPrice);
    await createListing(nftDetails.collectionAddress,
      nftDetails.tokenID, fixedPrice);
    reloadNft();
    setIsLoadingPage(false);
  }

  const reloadNft = () => {
    dispatch({
      type : LOAD_NFT_DETAIL,
      payload : {
        collectionAddress : nftDetails.collectionAddress,
        tokenID : nftDetails.tokenID
      }
    });
  }

  const onPlaceBid = async (price) => {
    console.log("####onPlaceBid###")
    setIsLoadingPage(true);
    await placeBid(nftDetails.auctionId - 1, price);
    setIsLoadingPage(false);
  };

  return isLoadingPage  ? (
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
            <ListedAuctionNft itemDetails={nftDetails} onPlaceBid={onPlaceBid}/>
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
