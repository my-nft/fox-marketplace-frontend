import AccordionAbout from "./AccordionAbout";
import AccordionDescription from "./AccordionDescription";
import AccordionDetails from "./AccordionDetails";
import AccordionProperties from "./AccordionProperties";

const NftMoreInfos = ({ nftDetails, collectionDetails }) => {
  return (
    <>
      <AccordionAbout collectionDetails={collectionDetails} />
      <AccordionDescription nftDetails={nftDetails} />
      <AccordionProperties nftDetails={nftDetails} />
      <AccordionDetails
        nftDetails={nftDetails}
        collectionDetails={collectionDetails}
      />
    </>
  );
};

export default NftMoreInfos;
