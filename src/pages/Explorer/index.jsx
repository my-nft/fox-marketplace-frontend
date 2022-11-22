import HeaderInput from "../../components/marketplace/HeaderInput";
import AccordingCollection from "./AccordingCollection";
import AccordingStatus from "./AccordingStatus";
import AccordionPrice from "./AccordionPrice";
import Command from "./Command";
import MostPopular from "./MostPopular";
import MostPopularCollection from "./MostPopularCollection";

const Explorer = () => {
  return (
    <>
      <MostPopularCollection />
      <section id="marketplace" class="container-fluid mb-5">
        <div class="row">
          <div id="sx" class="col-md-3">
            <Command />
            <AccordingStatus />
            <AccordionPrice />
            <AccordingCollection />
          </div>
          <div id="dx" class="col-md-9">
            <HeaderInput />
            <MostPopular />
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Explorer;
