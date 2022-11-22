import AccordionAbout from "./AccordionAbout";
import AccordionDescription from "./AccordionDescription";
import AccordionDetails from "./AccordionDetails";
import AccordionProperties from "./AccordionProperties";

const NftImageDetails = () => {
  return (
    <div class="col-md-12  col-lg-5 order-2 order-lg-1 ">
      <div id="imgNft">
        <div class="icon">
          <img src="./assets/images/function-x-fx-logo.jpg" />
          <div>
            <span id="numLike">1</span>
            <img
              src="./assets/images/marketplace/Iconmonstr-favorite-2-16_orange.jpg"
              class="heart"
            />
          </div>
        </div>
        <img src="./assets/images/nft_test.jpg" id="NFT" />
        <AccordionDescription />
        <AccordionProperties />
        <AccordionAbout />
        <AccordionDetails />
      </div>
    </div>
  );
};

export default NftImageDetails;
