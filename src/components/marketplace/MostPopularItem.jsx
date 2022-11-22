import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MostPopularItem = ({viewType}) => {

  const navigate = useNavigate();

    let styleList = {};
    let styleWrappedText = {};

    if(viewType === "CHANGE_FOR_MIN") {
      console.log("CHANGE_FOR_MIN");
      styleList ={
        width : "calc(100% / 6)",
        minWidth : "230px"
      }
      styleWrappedText = {
        display : "block"
      }
    } else if(viewType === "CHANGE_FOR_MAX") {
      console.log("CHANGE_FOR_MAX");
      styleList  ={
        width : "calc(100% / 8)",
        minWidth : "170px"
      }
      styleWrappedText = {
        display : "block"
      }
    } else if(viewType === "CHANGE_FOR_IMAGE") {
      console.log("CHANGE_FOR_IMAGE");
      styleList = {
        width : "calc(100% / 4)"
      }

      styleWrappedText = {
        display : "none"
      }
    }

    

    console.log(styleWrappedText);
    console.log(styleList);

  

  return (
    <div className={!viewType ? "listMostPopular col-md-4 col-lg-3" : "listMostPopular"} onClick={() => navigate("/collection")} style={styleList}>
      <div className="wrapContent">
        <div className="wrapImg">
          <img
            src="./assets/images/marketplace/item1.jpg"
            className="bigImage"
            alt=""
          />
        </div>
        <div className="wrappedAllText" style={styleWrappedText}>
          <div className="wrapText bg">
            <div className="nameItem">
              <span className="name">BoredApeKennelClub</span>
              <span>
                193{" "}
                <img
                  src="./assets/images/marketplace/Iconmonstr-favorite-2-16_orange.jpg"
                  style={{width: '14px'}}
                  alt=""
                />
              </span>
            </div>
          </div>
          <p className="nItem">#66585</p>
          <div className="wrapText">
            <p>
              <label>Price</label>
              <span className="orange">
                <b>f(x)</b> 42.68K
              </span>
            </p>
            <p>
              <span>Ends in 29 days</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPopularItem;
