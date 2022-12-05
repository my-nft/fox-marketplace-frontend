import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { selectNftDetails, selectIsLoading } from "../../redux/nftReducer";
import { createAuction, nftLoader } from "../../services/listingNft";
import { AUCTION } from "../../utils/foxConstantes";
import ListedNft from "./listedNft";
import NonListedNft from "./nonListedNft";

const MyNftDetails = () => {
  const nftDetails = useSelector(selectNftDetails);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const isLoading = useSelector(selectIsLoading);

  // can take FIXED_PRICE or AUCTION
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
      76,
      auctionPrice,
      endAuction,
      AUCTION
    );
    console.log("Auction transaction", trx);
    setIsLoadingPage(false);
  };

  return isLoadingPage ? (
    <Spinner />
  ) : (
    <div className="container my-5" id="nftPage">
      <img src="./assets/images/Background.jpg" id="layer" />
      <h3 className="my-5 text-center">List Item for Sale</h3>
      <div className="row">
        <div className="col-md-12  col-lg-5 order-2 order-lg-1 ">
          <div id="imgNft" className="imgForSale">
            <img src={nftDetails.image} id="NFT" className="imgForSale" />
          </div>
        </div>
        <div className="col-md-12  col-lg-7 order-1 order-lg-2 ">
          <header id="infoNFT" className="mb-3">
            <h4>{nftDetails.name}</h4>
            <h2>RoboPunks number8 #1691</h2>
          </header>

          {!nftDetails.isListed ? (
            <NonListedNft
              nftDetails={nftDetails}
              handleAuction={handleAuction}
            />
          ) : null}

          {nftDetails.isListed && nftDetails.listingType === AUCTION ? (
            <ListedNft nftDetails={nftDetails} />
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
