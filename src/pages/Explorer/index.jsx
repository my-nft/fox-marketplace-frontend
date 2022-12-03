import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderInput from "../../components/marketplace/HeaderInput";
import {
  selectIsLoadingMspl,
  selectMostPopularCollections,
} from "../../redux/collectionReducer";
import { LOAD_COLLECTION } from "../../saga/actions";
import AccordingCollection from "./AccordingCollection";
import AccordingStatus from "./AccordingStatus";
import AccordionPrice from "./AccordionPrice";
import Command from "./Command";
import MostPopular from "./MostPopular";
import MostPopularCollection from "./MostPopularCollection";

const Explorer = () => {
  const dispatch = useDispatch();

  const mostPopularCollections = useSelector(selectMostPopularCollections);
  const isLoading = useSelector(selectIsLoadingMspl);



  useEffect(() => {
    dispatch({
      type: LOAD_COLLECTION,
      payload: {
        numberElements: 20,
        page: 1,
        filter: {
          tag: "MOST_POPULAR",
        },
      },
    });
  }, []);

  return (
    <>
      {isLoading ? (
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
