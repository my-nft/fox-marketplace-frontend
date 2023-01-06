import { useLayoutEffect, useRef, useState } from "react";
import RanksSelector from "./Ranks/Ranks-selector";
import { TOP, TERENDINGS } from "./Ranks/constantes";
import TopCollections from "./Ranks/Top-collection";
import TrendingCollection from "./Ranks/Trending-collection";
import { rankAnimation } from "./Utils";

const RanksSection = ({trendingCollections, topCollections}) => {
  const [selection, setSelection] = useState(TOP);

  const rank = useRef();

  useLayoutEffect(() => {
    const ctx = rankAnimation(rank);
    return () => ctx.revert();
  }, []);

  return (
    <section id="ranks" className="container-fluid" ref={rank}>
      <RanksSelector
        onChangeSelected={(selection) => setSelection(selection)}
      />
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-trending"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="containerTable">
            <table className="tbl">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" className="collection">
                    Collection
                  </th>
                  <th scope="col">Floor price</th>
                  <th scope="col">Volume</th>
                </tr>
              </thead>
              <tbody>
                {selection === TERENDINGS ? (
                  <TrendingCollection collections={trendingCollections}/>
                ) : (
                  <TopCollections collections={topCollections}/>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RanksSection;
