import CardBody from "../../components/nft/CardBody";
import CardHeader from "../../components/nft/CardHeader";
import CardNftWrapper from "../../components/nft/CardNftWrapper";

const InfoNftDetails = ({itemData}) => {

  const convertPriceToUSD = (price) => {
    let priceCoef = 2;
    return price * priceCoef;
  }

  console.log(itemData)

  return (
    
    <>
      {
        itemData
        ?
        <div class="col-md-12  col-lg-7 order-1 order-lg-2 ">
      <header id="infoNFT" class="mb-3">
        <h4>RoboNTF name</h4>
        <h2>{itemData.name}</h2>
        <span id="owned">
          Owned by <strong>{itemData.creator.username}</strong>
        </span>
        <span id="view">{itemData.views} views</span>
        <span id="fovaorite">{itemData.favorites} favorite{itemData.favorites > 1 ? 's' : null}</span>

        <ul id="iconAction">
          <li class="contIcon withGlow">
            <div class=" withGlow">
              <img src="./assets/images/transfer_icon.png" class="withGlow" />
            </div>
          </li>
        </ul>
      </header>

      
      {
        itemData.sale.isListed
        ?
        <CardNftWrapper>
          <CardHeader endDate={itemData.sale.saleEndDate}  />
          <CardBody
            title={"Current price"}
            price={itemData.sale.price}
            priceDollar={convertPriceToUSD(itemData.sale.price)}
          >
            <button id="buyItem" class="btn">
              Buy item
            </button>
            <button id="makeOffer" class="btn" onclick="openFixed()">
              Make offer
            </button>
          </CardBody>
        </CardNftWrapper>
        : null
      }

      {
        itemData.auction.isListed
        ?
        <>
          <CardNftWrapper>
            <CardHeader endDate={itemData.auction.auctionEndDate} />
            <CardBody
              title={"Minimum bid"}
              price={itemData.auction.minimumBid}
              priceDollar={convertPriceToUSD(itemData.auction.minimumBid)}
            >
              <button id="placeBid" class="btn">
                Minimum bid
              </button>
            </CardBody>
          </CardNftWrapper>

          <CardNftWrapper>
            <CardBody
              title={"Best Offer"}
              price={itemData.auction.bestOffer}
              priceDollar={convertPriceToUSD(itemData.auction.bestOffer)}
            >
              <button id="makeOffer" class="btn">
                Make offer
              </button>
            </CardBody>
          </CardNftWrapper>
        </>
        : null
      }

      
      
    </div>
    : null
      }
    </>
  );
};

export default InfoNftDetails;
