import InfoNftDetails from "./InfoNftDetails";
import NftImageDetails from "./NftImageDetails";

const NftDetails = () => {
  return (
    <div class="container my-5" id="nftPage">
      <img src="./assets/images/Background.jpg" id="layer" />
      <div class="row">
        <NftImageDetails />
        <InfoNftDetails />
      </div>
    </div>
  );
};

export default NftDetails;
