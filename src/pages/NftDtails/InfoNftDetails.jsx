import CardBody from "../../components/nft/CardBody";
import CardHeader from "../../components/nft/CardHeader";
import CardNftWrapper from "../../components/nft/CardNftWrapper";

const InfoNftDetails = () => {
  return (
    <div class="col-md-12  col-lg-7 order-1 order-lg-2 ">
      <header id="infoNFT" class="mb-3">
        <h4>RoboNTF name</h4>
        <h2>RoboPunks number8 #1691</h2>
        <span id="owned">
          Owned by <strong>056500</strong>
        </span>
        <span id="view">15 views</span>
        <span id="fovaorite">1 favorite</span>

        <ul id="iconAction">
          <li class="contIcon withGlow">
            <div class=" withGlow">
              <img src="./assets/images/transfer_icon.png" class="withGlow" />
            </div>
          </li>
        </ul>
      </header>

      <CardNftWrapper>
        <CardHeader />
        <CardBody
          title={"Current price"}
          price={"0,0495"}
          priceDollar={"76,29"}
        >
          <button id="buyItem" class="btn">
            Buy item
          </button>
          <button id="makeOffer" class="btn" onclick="openFixed()">
            Make offer
          </button>
        </CardBody>
      </CardNftWrapper>

      <CardNftWrapper>
        <CardHeader />
        <CardBody
          title={"Minimum bid"}
          price={"0,0495"}
          priceDollar={"76,29"}
        >
          <button id="placeBid" class="btn">
            Minimum bid
          </button>
        </CardBody>
      </CardNftWrapper>

      <CardNftWrapper>
        <CardBody
          title={"Best Offer"}
          price={"0,0495"}
          priceDollar={"76,29"}
        >
          <button id="makeOffer" class="btn">
            Make offer
          </button>
        </CardBody>
      </CardNftWrapper>
      
    </div>
  );
};

export default InfoNftDetails;
