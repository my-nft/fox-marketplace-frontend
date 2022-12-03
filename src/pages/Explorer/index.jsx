import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderInput from "../../components/marketplace/HeaderInput";
import { MARKET_PLACE_DEFAULT_ADDRESS } from "../../config/blockChainConfig";
import {
  selectIsLoadingMarketPlaceNfts,
  selectIsLoadingMspl,
  selectIsLoadingSearcheable,
  selectMarketPlaceNfts,
  selectMostPopularCollections,
  selectSearcheableCollection,
} from "../../redux/collectionReducer";
import {
  LOAD_MARKETPLACE_NFT,
  LOAD_MOST_POPULAR_COLLECTION,
  LOAD_SEARCHABLE_COLLECTION,
} from "../../saga/actions";
import AccordingCollection from "./AccordingCollection";
import AccordingStatus from "./AccordingStatus";
import AccordionPrice from "./AccordionPrice";
import Command from "./Command";
import MostPopular from "./MostPopular";
import MostPopularCollection from "./MostPopularCollection";

const Explorer = () => {
  const dispatch = useDispatch();

  const mostPopularCollections = useSelector(selectMostPopularCollections);
  const searcheableCollections = useSelector(selectSearcheableCollection);
  const marketPlaceNfts = useSelector(selectMarketPlaceNfts);
  const isLoadingMostPopular = useSelector(selectIsLoadingMspl);
  const isLoadingSearcheable = useSelector(selectIsLoadingSearcheable);
  const isLoadingMarketPlaceNfts = useSelector(selectIsLoadingMarketPlaceNfts);

  const loadMostPopularCollection = () => {
    dispatch({
      type: LOAD_MOST_POPULAR_COLLECTION,
      payload: {
        numberElements: 20,
        page: 1,
        filter: {
          tag: "MOST_POPULAR",
        },
      },
    });
  };

  const loadSearcheableCollections = () => {
    dispatch({
      type: LOAD_SEARCHABLE_COLLECTION,
      payload: {
        numberElements: 10,
        page: 1,
        filter: {
          tag: "MOST_POPULAR",
        },
      },
    });
  };

  const loadMarketPlaceNfts = () => {
    dispatch({
      type: LOAD_MARKETPLACE_NFT,
      payload: {
        numberElements: 10,
        page: 1,
        collectionAddress: MARKET_PLACE_DEFAULT_ADDRESS,
        filter: {
          tag: "MOST_POPULAR",
        },
      },
    });
  };

  useEffect(() => {
    loadMostPopularCollection();
    loadSearcheableCollections();
    loadMarketPlaceNfts();
  }, []);

  return (
    <>
      {isLoadingMostPopular ? (
        ""
      ) : (
        <MostPopularCollection collections={mostPopularCollections} />
      )}
      <section id="marketplace" class="container-fluid mb-5">
        <div class="row">
          <div id="sx" class="col-md-3">
            <Command />
            <AccordingStatus />
            <AccordionPrice />
            {isLoadingSearcheable ? (
              "loading..."
            ) : (
              <AccordingCollection
                listSearcheableCollections={searcheableCollections}
              />
            )}
          </div>
          <div id="dx" class="col-md-9">
            <HeaderInput />
            {isLoadingMarketPlaceNfts ? (
              "loading"
            ) : (
              <MostPopular nfts={marketPlaceNfts} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Explorer;
