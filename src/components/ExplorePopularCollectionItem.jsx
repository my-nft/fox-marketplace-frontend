const ExplorePopularCollectionItem = (props) => {
    return (
        <div className="slide">
          <div className="listMostPopular">
            <div className="wrapContent">
              <div className="wrapImg">
                <img
                  src="./assets/images/marketplace/most1.jpg"
                  className="bigImage"
                  alt=""
                />
                <img
                  src="./assets/images/marketplace/most1_icon.jpg"
                  className="iconLogo"
                  alt=""
                />
              </div>
              <div className="wrapText">
                <p>
                  <label>Riffer</label>
                  <span>7777</span>
                </p>
                <p className="text-right">
                  <label>Total Volume</label>
                  <span>
                    <b>f(x)</b>42.68K
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
    )
};

export default ExplorePopularCollectionItem;