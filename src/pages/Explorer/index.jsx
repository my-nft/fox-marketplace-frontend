import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderInput from "../../components/marketplace/HeaderInput";
import Spinner from "../../components/Spinner";
import {
  selectMostPopularCollections,
  selectSearcheableCollection,
} from "../../redux/collectionReducer";

import {selectIsLoading, selectListedNfts} from '../../redux/nftReducer';

import {
  LOAD_MARKET_PLACE,
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
  const marketPlaceNfts = useSelector(selectListedNfts);
 
  const isLoadingApi = useSelector(selectIsLoading);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(isLoadingApi);
  }, [isLoadingApi])

  const loadMarketPlace = () => {
    dispatch({
      type: LOAD_MARKET_PLACE,
      payload: {
        numberElements: 10,
        page: 1,
      },
    });
  }

  useEffect(() => {
    loadMarketPlace();
  }, []);


  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <MostPopularCollection collections={mostPopularCollections} />
      <section id="marketplace" class="container-fluid mb-5">
        <div class="row">
          <div id="sx" class="col-md-3">
            <Command />
            <AccordingStatus />
            <AccordionPrice />

            <AccordingCollection
              listSearcheableCollections={searcheableCollections}
            />
          </div>
          <div id="dx" class="col-md-9">
            <HeaderInput />

            <MostPopular nfts={marketPlaceNfts} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Explorer;
