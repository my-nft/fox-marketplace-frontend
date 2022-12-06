import AccordionAbout from "./AccordionAbout";
import AccordionDescription from "./AccordionDescription";
import AccordionDetails from "./AccordionDetails";
import AccordionProperties from "./AccordionProperties";

const NftImageDetails = ({itemData}) => {

  console.log(itemData)

  return (
    <div class="col-md-12  col-lg-5 order-2 order-lg-1 ">
      <div id="imgNft">
        <div class="icon">
          <img src="./assets/images/function-x-fx-logo.jpg" />
          <div>
            <span id="numLike">{itemData.likes}</span>
            <img
              src="./assets/images/marketplace/Iconmonstr-favorite-2-16_orange.jpg"
              class="heart"
            />
          </div>
        </div>
        <img src={itemData.image} id="NFT" />
        <AccordionDescription itemData={itemData} />
        <AccordionProperties itemData={itemData} />
        <AccordionAbout itemData={itemData} />
        <AccordionDetails collectionData={itemData.collection} />
      </div>
    </div>
  );
};

export default NftImageDetails;
