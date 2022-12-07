import AccordionAbout from "./AccordionAbout";
import AccordionDescription from "./AccordionDescription";
import AccordionDetails from "./AccordionDetails";
import AccordionProperties from "./AccordionProperties";

const NftMoreInfos = ({nftDetails}) => {
    <>
        <AccordionAbout nftDetails={nftDetails}/>
        <AccordionDescription nftDetails={nftDetails}/>
        <AccordionProperties nftDetails={nftDetails}/>
        <AccordionDetails nftDetails={nftDetails}/>
    </>
}

export default NftMoreInfos;