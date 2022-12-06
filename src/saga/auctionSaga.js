import { createAuction } from "../services/listingNft";
import { LOAD_CREATE_AUCTION } from "./actions";

function* loadCreateAuction(action) {
  const { collectionAddress, tokenID, initialPrice, endAuction } =
    action.payload;

    const tx = yield call(createAuction,
        nftDetails.collectionAddress,
        91,
        auctionPrice,
        endAuction
      );

    

}

function* loadSearcheableCollectionSaga() {
  yield takeLatest(LOAD_CREATE_AUCTION, loadCreateAuction);
}

export { loadSearcheableCollectionSaga };
